# Tahdiri Chrome Extension — Architecture & Implementation Notes

> **Audience:** the next AI/maintenance engineer picking up this codebase.
> Read this whole document before changing `content.js` or `background.js`.
> It captures the contracts, the gotchas, and the reverse-engineered Madrasati
> backend rules that took many iterations to discover.

---

## 0. TL;DR

Tahdiri automates lesson preparation on `schools.madrasati.sa` (Saudi Arabia's
public-school LMS) for a teacher's weekly schedule.

The current architecture is the **Headless API Strategy**:

1. `background.js` loads two pre-cleansed local JSON databases into a
   memory cache at service-worker startup.
2. `content.js` queries that cache via `chrome.runtime.sendMessage`,
   builds a per-lesson dropdown directly in the dashboard, and on save
   issues **raw `fetch` POSTs** straight to Madrasati's backend — no
   form submission, no page navigation, no DOM-driven data flow.
3. Each "save" actually performs **two POSTs**: first a *silent
   Activity creation* (to satisfy a backend rule), then the real
   `SaveLastLessonPlan`.

The previous *Parasite Strategy* (DOM-scraping a competitor's encrypted
endpoints to fill the form, then clicking the native submit button) has
been removed entirely.

---

## 1. System Architecture (Headless API)

### 1.1 Background service worker = in-memory database cache

`background.js` runs as a Manifest V3 service worker. On startup
(`importScripts('shared/constants.js')` then bottom-of-file
`loadDatabases()`), it:

1. `fetch`es `madrasati_courses_clean.json` and stores it on `dbCache.courses`.
2. `fetch`es `ee10_lesson_templates.json` and stores it on `dbCache.templates`.
3. Builds two indexes:
   - `dbCache.bySubjectId: Map<stringSubjectId, courseObject>`
   - `dbCache.bySubjectName: Map<normalizedNameString, courseObject>`
4. Builds `dbCache.flatTemplates`, a flattened
   `{introduction:[…strings], strategies:[…], closure:[…], …}` map
   pre-computed from `templates.lesson_plan_sections.<key>.templates`.
   *(Currently unused by `silentPrepareLesson`, which sends static
   defaults — see §5.2 — but kept warm for future template-driven
   rotations.)*
5. Sets `dbCache.isLoaded = true`.

The cache is plain JS objects in the service worker's heap. There's no
IndexedDB, no `chrome.storage.local`. When the service worker is
suspended Chrome will re-run the top-level script and `loadDatabases()`
will rerun on first message.

### 1.2 Local JSON databases — shapes and quirks

#### `madrasati_courses_clean.json`
Top-level: array of 162 course objects.

```jsonc
{
  "subjectId": 86,
  "groups": [
    [
      { "id": 26143,
        "info": { "compositeId": "86,26087,26143",
                  "chapterId": 26087,
                  "name": "الحياة الاجتماعية -- مدخل الوحدة الرابعة" } },
      …more lessons in same chapter…
    ],
    …more chapters…
  ],
  "rawLessonsList": [
    { "id": "86,87,273", "name": "القيم الإسلامية -- مدخل وحدة (القيم الإسلامية)" },
    …
  ]
}
```

Critical quirks:

- **`groups` is an array of arrays.** `groups[chapter][lesson]` → `{id, info:{…}}`.
  Naive iteration with `subjectData.groups.forEach(g => g.info)` does **not**
  work — `g` is itself an array. Always flatten:
  `lessons = Array.isArray(group) ? group : [group];`
- **Only 39 of 162 subjects have any lessons in `groups`** — the rest have
  `groups[i] = []` for every chapter. **All 162** subjects have populated
  `rawLessonsList`. Therefore the lesson-tree builder in `content.js` uses
  groups when populated and falls through to `rawLessonsList` whenever
  groups produced zero options. (The naive `if/else if` pattern fails
  here because the truthy-but-empty `groups` would block the fallback.)
- **`compositeId`** is the canonical lesson key Madrasati expects. Format:
  `"<subjectId>,<chapterId>,<lessonId>"`. We `split(',')` to get the three
  IDs in `silentPrepareLesson`.
- `rawLessonsList[i].id` is already in `"subjectId,chapterId,lessonId"`
  string form (compatible with `selection.treeValue.split(',')`).
- The first segment of `info.name` / `rawLessonsList[i].name` (split on
  ` -- `) is the *curriculum-unit name*, not the umbrella subject. This
  matters for the name-based fallback in §1.4.

#### `ee10_lesson_templates.json`
Single root object with two interesting branches:

```jsonc
{
  "lesson_plan_sections": {
    "introduction":   { "label": "التمهيد",      "templates": ["…", "…", …] },
    "strategies":     { "label": "الاستراتيجيات", "templates": ["…", …] },
    "objectives":     { "label": "…", "templates": [...] },
    "activities":     { "label": "…", "templates": [...] },
    "evaluation":     { "label": "…", "templates": [...] },
    "closure":        { "label": "الإغلاق",      "templates": [...] },
    "homework":       { "label": "الواجب المنزلي", "templates": [...] },
    …14 sections total…
  },
  "ui_labels":  { … },
  "metadata":   { … }
}
```

Templates are arrays of Arabic strings. Fields the lesson-save endpoint
accepts (e.g. `LectureClassPreparationText`) currently use static
fallback strings; these template arrays exist for future rotation.

### 1.3 Message router (background ↔ content)

`background.js` has one async-aware listener:

```js
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.action === 'GET_LESSON_DATA' || msg?.action === 'GET_TEMPLATES') {
    if (!dbCache.isLoaded) {
      loadDatabases().then(() => handleDataRequest(msg, sendResponse));
    } else {
      handleDataRequest(msg, sendResponse);
    }
    return true; // keep port open for async sendResponse
  }
  // …state-management messages: START_ACTIVE_TAB, AUTOMATION_STATUS, STATUS, GET_RUNNING…
});
```

`handleDataRequest` resolves `GET_LESSON_DATA` like so:

```js
function handleDataRequest(msg, sendResponse) {
  if (msg.action === 'GET_LESSON_DATA') {
    let course = null;
    if (msg.subjectId && msg.subjectId !== "null") {
      course = dbCache.courses.find(c => String(c.subjectId) === String(msg.subjectId));
    }
    if (!course && msg.subjectName) {
      const searchName = normalizeSubjectName(msg.subjectName);
      course = dbCache.courses.find(c => {
        let cName = '';
        // groups[0] is itself an array; walk into the first lesson with info.name.
        if (Array.isArray(c.groups) && c.groups.length > 0) {
          const head = c.groups[0];
          let lesson = null;
          if (Array.isArray(head)) lesson = head.find(l => l && l.info && l.info.name);
          else if (head?.info)     lesson = head;
          if (lesson?.info?.name) cName = normalizeSubjectName(lesson.info.name.split('--')[0]);
        }
        if (!cName && c.rawLessonsList?.length > 0 && c.rawLessonsList[0].name) {
          cName = normalizeSubjectName(c.rawLessonsList[0].name.split('--')[0]);
        }
        return cName && (cName.includes(searchName) || searchName.includes(cName));
      });
    }
    sendResponse({ ok: true, data: course || null });
  } else if (msg.action === 'GET_TEMPLATES') {
    sendResponse({ ok: true, data: dbCache.templates });
  }
}
```

`normalizeSubjectName` strips Arabic diacritics + tatweel, normalises
`أإآا → ا`, `ى → ي`, `ة → ه`, collapses whitespace, and lowercases.

### 1.4 Content-script consumers of the cache

Two thin wrappers in `content.js`:

```js
async function getLocalSubjectData(subjectId, subjectName) {
  return new Promise(r => chrome.runtime.sendMessage(
    { action: 'GET_LESSON_DATA', subjectId: String(subjectId), subjectName },
    res => r(res?.ok ? res.data : null)
  ));
}
async function getLocalTemplates() {
  return new Promise(r => chrome.runtime.sendMessage(
    { action: 'GET_TEMPLATES' },
    res => r(res?.ok ? res.data : null)
  ));
}
```

> **Caveat about name-based fallback.** The H2 text on Madrasati cards is
> the *umbrella* subject (`الرياضيات`, `العلوم`), but the JSON's first-segment
> names are curriculum-unit-level (`العمليات على الكسور الاعتيادية`,
> `الجبر و الدوال`). Across all 162 subjects, **zero** of the 99 distinct
> first-segments contain `الرياضيات` or `العلوم`. So name-fallback alone
> rarely succeeds. The deterministic path is *always* the per-cell numeric
> `subjectId` (see §2).

### 1.5 Headless POSTs (no UI manipulation)

`content.js` never calls `form.submit()`, never navigates, never types into
inputs. It builds `FormData` / `URLSearchParams` and `fetch`es directly:

| Endpoint | Used by | Purpose |
|---|---|---|
| `GET  /Projects/Projects/Create?schoolId=…` | `silentCreateActivityResource` | Scrape `__RequestVerificationToken` + `HashKey` |
| `POST /Projects/Projects/Create` | `silentCreateActivityResource` | Create the silent gate-satisfying Activity |
| `POST https://schools.madrasati.sa/Teacher/Lessons/SaveLastLessonPlan` | `silentPrepareLesson` | The actual lesson-plan save |

All cookies are sent automatically by the browser. No `Authorization` header
is needed — Madrasati is cookie/forms-auth and CSRF-protected, not bearer-token.

The previous *Parasite Strategy* — which decrypted a competitor extension's
proprietary endpoints (`_decryptEndpoint1/2`, `fetchViaBackground`,
`buildLessonMap`, `applyParasitePlanToForm`, etc.) — has been deleted. Do
not reintroduce it; the local DB now serves the same data faster and
without the obfuscated chunk-reverse decryption pipeline.

---

## 2. Dashboard DOM Structure & Per-Cell Extraction

### 2.1 Lesson cards on the teacher's weekly schedule

Two visual variants:

#### Green / "Prepared" card

```html
<td class="day-cell">
  <div class="cs-lesson-card tahdiri-processed"
       data-data="522F31BA…3F3AA42"        <!-- encrypted TimeTableId token -->
       data-class-id="221058" data-day="0" data-lecture-id="1">
    <a href="/SchoolSchedule/Schedule/ManageLecture?SchoolId=E7F07D5A…&amp;lectureId=1&amp;dateTicks=…&amp;subjectId=528&amp;classroomId=221058">
      <div class="schedule-card done">
        <div class="title"><h2>الرياضيات</h2></div>
        <small>سادس</small>
      </div>
    </a>
    <select class="tahdiri-dashboard-select" data-lesson-token="522F31BA…">…</select>
  </div>
</td>
```

Key points:
- `div.cs-lesson-card[data-data="…"]` carries the encrypted TimeTableId token
  (Madrasati's internal lesson-cell ID, opaque to us).
- The `<a>` lives **inside** the card. Its href has the canonical
  `subjectId=NNN` and a 32-hex `SchoolId=…`.

#### Blue / "Unprepared" card

```html
<td class="day-cell">
  <div class="cs-lesson-card"
       data-data="…"
       data-subject-id="277">                 <!-- ← only blue cards have this -->
    <a href="javascript:void(false)">…</a>    <!-- ← has NO subjectId in href -->
    <h2>الرياضيات</h2>
  </div>
  <!-- The schoolId-bearing anchor is a SIBLING of div.cs-lesson-card,
       not a descendant — both are children of <td>. -->
</td>
```

Key differences:
- `data-subject-id="NNN"` is on the card itself (numeric, plain attribute).
- The card's own `<a>` is `javascript:void(false)` — no `subjectId=` query.
- The anchor that carries `schoolId=…` is a **sibling** of the card,
  living on the same `<td class="day-cell">`. So extraction must search
  `cell.querySelectorAll('a')`, not `div.querySelectorAll('a')`.

### 2.2 Per-cell extraction recipes (current `content.js`)

#### `subjectId` (numeric)

```js
var subjectId = div.getAttribute('data-subject-id');           // blue cards
if (!subjectId) {
  var cell = div.closest('td') || div.parentElement;
  var anchor = cell ? cell.querySelector('a') : null;          // green cards
  if (anchor && anchor.href) {
    var match = anchor.href.match(/subjectId=(\d+)/i);         // case-INsensitive
    if (match) subjectId = match[1];
  }
}
```

> `[href*="subjectid="]` CSS attribute selectors are **case-sensitive on the
> attribute value**. The real DOM uses `subjectId=` (capital I), so don't
> filter the anchor by that selector; just grab `cell.querySelector('a')`
> and let the regex (with the `i` flag) do the matching.

#### `subjectName` (Arabic, fallback)

```js
var subjectName = null;
var h2 = div.querySelector('h2');
if (h2) subjectName = h2.innerText.trim();
```

#### `realSchoolId` (32-hex, see §3)

```js
var realSchoolId = null;
if (cell) {
  var anchors = cell.querySelectorAll('a');
  for (var i = 0; i < anchors.length; i++) {
    var hrefMatch    = anchors[i].href.match(/schoolId=([a-f0-9]{32})/i);
    if (hrefMatch)    { realSchoolId = hrefMatch[1]; break; }
    var onclickMatch = (anchors[i].getAttribute('onclick') || "").match(/'([a-f0-9]{32})'/i);
    if (onclickMatch) { realSchoolId = onclickMatch[1]; break; }
  }
}
if (!realSchoolId) {
  var divOnclick = div.getAttribute('onclick') || "";
  var divMatch = divOnclick.match(/'([a-f0-9]{32})'/i);
  if (divMatch) realSchoolId = divMatch[1];
}
if (!realSchoolId) {
  var urlParams = new URLSearchParams(window.location.search);
  realSchoolId = urlParams.get("SchoolId") || urlParams.get("schoolId")
              || getSchoolIdValue() || '79427';
}
```

The same three-tier walk runs in `processDashboardQueue` (when
populating the dropdown) and in `handleDashboardSave` (when saving).
Always derive `realSchoolId` from the per-cell DOM first; only fall back
to URL/hidden-field values when nothing is found.

### 2.3 Dashboard queue mechanics

- `injectDashboardUI()` appends a fixed-position panel and starts a
  `setInterval(…, 1000)` poller.
- The poller selector matches **both** card variants:
  ```js
  document.querySelectorAll(
    'td.day-cell div[data-data]:not(.tahdiri-processed),' +
    'div.cs-lesson-card[data-data]:not(.tahdiri-processed)'
  );
  ```
- For each new card it adds `class="tahdiri-processed"` (so it's not
  re-queued), pushes `{div, token, num}` onto `dashboardQueue`, and
  kicks `processDashboardQueue()`.
- The queue is sequential — one `fetchLessonTreeOptions` call at a
  time — to avoid hammering background.js or the (no-longer-used)
  Madrasati endpoints.
- `fetchLessonTreeOptions(subjectId, subjectName)` returns at minimum
  `[{value:'AI_AUTO', text:'🤖 تحضير ذكي', level:'auto'}]`. Subsequent
  options come from `subjectData.groups` (flattened) or, when groups is
  empty, `subjectData.rawLessonsList`. Each option's `value` is the
  compositeId string `"subjectId,chapterId,lessonId"`.
- The dropdown is a `<select class="tahdiri-dashboard-select"
  data-lesson-token="<the data-data token>">` — **the
  `data-lesson-token` is what becomes `TimeTableId` on the save POST.**

---

## 3. The Multiple-Schools Context Bug *(critical)*

### 3.1 Symptom

`silentCreateActivityResource` returns 200 OK. `silentPrepareLesson`'s
`SaveLastLessonPlan` POST then returns **302** redirecting to a
`ManageLecture?SchoolId=…NotPermitted` URL, and nothing is written to
the DB.

### 3.2 Root cause

A teacher account can be associated with **multiple schools** simultaneously.
Madrasati renders the weekly schedule under one of those schools' contexts
(the "School A" `SchoolId=E7F07…` in the URL bar) but a specific lesson
on that schedule may actually belong to **School B** (`E1A910…`), as
encoded in that cell's anchor href.

If the silent Activity is created with School A's id, it gets saved against
School A. When `SaveLastLessonPlan` runs against the same `TimeTableId`
token, the backend resolves that token to **School B** and looks for an
Activity in School B — finds none — rejects the save and 302's to School B's
NotPermitted page.

### 3.3 Why URL-based extraction is not enough

`URLSearchParams(window.location.search).get("SchoolId")` returns School
A's id always; it is *the wrong school* for any lesson that happens to
belong to School B. Hidden inputs and `getSchoolIdValue()` derive from
the same URL/global page context, so they have the same flaw.

### 3.4 The fix: per-cell DOM extraction

The TRUE `SchoolId` for each lesson lives in the DOM of that lesson's
`<td class="day-cell">`. Specifically, in priority order:

1. `cell.querySelectorAll('a')` → any anchor whose `href` contains
   `schoolId=<32 hex chars>`.
2. Same anchors → `onclick` attribute containing `'<32 hex chars>'`.
3. The card's own `div.getAttribute('onclick')` → `'<32 hex chars>'`.
4. URL params / `getSchoolIdValue()` / `'79427'` *(last-resort, intentionally
   weak — only fires when the DOM gives us nothing)*.

This per-cell extraction must drive **both** the silent Activity creation
and the final SaveLastLessonPlan POST. They share one `realSchoolId` per
iteration of the `handleDashboardSave` loop.

The ID is **always 32 hex chars** in the URL/onclick form (it's a hashed
school identifier, not the numeric internal id). The regex
`/schoolId=([a-f0-9]{32})/i` is what we use.

---

## 4. The "Silent Activity" Resource Gate

### 4.1 The undocumented backend rule

> Madrasati will refuse to save a lesson plan unless **at least one
> resource** (Assignment / Enrichment / Activity-aka-نشاط) is already
> linked to the lesson tree node `(SubjectId, chapterId, lessonId)` in
> the database, scoped to the lesson's owning `SchoolId`.

If no resource exists, `SaveLastLessonPlan` returns 302 (silent
rejection — the teacher never sees an error). The backend never sends
4xx, never sends a JSON error body. It just redirects.

### 4.2 What didn't work (don't retry these)

- **Plain Assignment POST** to `/Teacher/Assignments/Manage?Length=11` —
  responded 200 OK but did not actually create the row. We suspect a
  silent server-side validation (perhaps a missing per-form HashKey
  similar to the Activity flow). Not worth re-investigating; the
  Activity path works.
- **Enrichment POST** to `/Teacher/Lessons/CreateResource` with a
  `txtFullPath` link — same silent rejection behavior. Likely the
  backend now requires fields we couldn't observe.

### 4.3 The working flow: silent **Activity** (نشاط) creation

Activities (Projects in the Madrasati URL space) are protected by a
**per-form HashKey** rendered server-side. Single POSTs always fail.
The competitor extension's network logs revealed the two-step flow:

#### Step 1 — Scrape tokens

```js
const getRes = await fetch(`/Projects/Projects/Create?schoolId=${schoolId}`);
const html   = await getRes.text();
const doc    = new DOMParser().parseFromString(html, "text/html");
const token   = doc.querySelector('[name="__RequestVerificationToken"]')?.value;
const hashKey = doc.querySelector('[name="HashKey"]')?.value;
```

The page renders both as hidden inputs. Without `HashKey` the POST fails
silently — abort early if it's empty.

> **Use the per-cell `realSchoolId`** in the GET URL, not the URL-bar
> SchoolId. Otherwise the Activity is created in the wrong school's
> context and the gate isn't satisfied for the lesson.

#### Step 2 — POST the activity payload

`POST /Projects/Projects/Create` with `Content-Type: application/x-www-form-urlencoded; charset=UTF-8`.

| Field | Value | Why |
|---|---|---|
| `TypeId` | `"1"` | Activity type |
| `__RequestVerificationToken` | scraped value | CSRF |
| `HashKey` | scraped value | per-form anti-replay |
| `Id` | `"0"` | **Must be `"0"` not `""`** — server rejects empty silently |
| `schoolId` | per-cell `realSchoolId` | TRUE school for this lesson |
| `SelectedUnitId` | `subjectId` | Lesson tree level 1 |
| `SelectedTrees_2` | `chapterId` | Lesson tree level 2 |
| `SelectedTrees_3` | `lessonId` | Lesson tree level 3 |
| `Name` | `` `نشاط (${lessonName})` `` | Display name |
| `CategoryId` | `"4"` | |
| `ClassificationLevel` | `"1"` | |
| `ProjectType` | `"2"` | **`"2"` = Link-based** (the simplest variant) |
| `Description` | `"نشاط تدريبي داعم لموضوع الدرس"` | Free text |
| `Link` | `"https://ien.edu.sa"` | **Required iff `ProjectType=2`** |
| `SolvingType` | `"3"` | |
| `AccessType` | `"True"` | **Capital T** — server is case-sensitive |
| `hfLevelsCount` | `"3"` | |
| `hfDrawTree` | `"/Projects/Projects/DrawTreeToClassLesson"` | |
| `TotalGrade` | `"1"` | **Required** — silent rejection if missing |

Fields that look obvious but **must NOT be present** for ProjectType=2:
- `PageNumber`, `QuestionsNumber`, `SaveButton`. Their presence in
  earlier attempts caused silent rejection.

After the POST, **wait 2 seconds** before the SaveLastLessonPlan call:

```js
await silentCreateActivityResource(finalSubjectId, chapterId, lessonId, lessonName, realSchoolId);
await new Promise(r => setTimeout(r, 2000)); // DB sync buffer
```

The Activity insert is asynchronous on the server side. SaveLastLessonPlan
queries the DB synchronously, so without the buffer it doesn't see the
fresh row and the gate appears unsatisfied → 302.

---

## 5. The Final Lesson Save

### 5.1 Endpoint

```
POST https://schools.madrasati.sa/Teacher/Lessons/SaveLastLessonPlan
Content-Type: multipart/form-data (FormData object — let the browser set the boundary)
```

Cookies + browser-managed CSRF; no extra headers needed.

### 5.2 Mandatory payload

```js
const finalForm = new FormData();
finalForm.append('SubjectId',                  finalSubjectId);  // ids[0] from compositeId
finalForm.append('TimeTableId',                token);           // data-data attr (encrypted)
finalForm.append('SchoolId',                   realSchoolId);    // per-cell, TRUE school
finalForm.append('__RequestVerificationToken', getCsrfToken());
finalForm.append('LessonIds[0].Id',            lessonId);        // ids[2]
finalForm.append('LessonIds[0].Name',          lessonName);      // selection.treeText, no leading colon
finalForm.append('SelectedTrees_2',            chapterId);       // ids[1]
finalForm.append('SelectedTrees_3',            lessonId);        // ids[2]

finalForm.append('strategies',                  '4');                                                  // numeric strategy id
finalForm.append('ThinkingSkills',              "التركيز والتحليل والملاحظة");
finalForm.append('LectureClassPreparationText', "تمهيد مناسب يربط الدرس بالخبرات السابقة.");
finalForm.append('LectureClassCloseText',       "ملخص شامل لأهم نقاط الدرس.");
finalForm.append('LessonVocabulary',            "المصطلحات والمفاهيم الأساسية الواردة.");
finalForm.append('TeacherNote',                 "متابعة أداء الطلاب وتقديم التغذية الراجعة.");
```

`finalSubjectId`, `chapterId`, and `lessonId` come from
`selection.treeValue.split(',')` — the compositeId on the chosen
dropdown option. `passedSubjectId` (4th arg to `silentPrepareLesson`)
takes precedence over `ids[0]` when present.

### 5.3 Failure modes (silent — server returns 200 or 302 either way)

If **any** of these conditions hold, the row is not inserted:

| Cause | Symptom |
|---|---|
| `SchoolId` is for the wrong school (URL-bar vs per-cell mismatch) | 302 → `…NotPermitted` |
| No Activity/Assignment/Enrichment exists yet for this `(SubjectId, chapterId, lessonId, SchoolId)` | 302 → `ManageLecture?…` |
| Sync buffer too short (Activity not yet committed) | Same as above |
| Any of the four mandatory text fields blank (`LectureClassPreparationText`, `LectureClassCloseText`, `LessonVocabulary`, `TeacherNote`) | 200 OK but no DB insert |
| `__RequestVerificationToken` stale (rare in practice — `getCsrfToken` reads it from the live page) | 302 to login |

The endpoint never returns a useful 4xx. Always assume *no error message =
silent failure*; verify by re-reading the dashboard or the lesson detail
page after a save.

---

## 6. End-to-End Save Flow

User action: clicks the "حفظ وبدء التحضير" panel button.

```
handleDashboardSave()                                    // bulk loop
  for each <select.tahdiri-dashboard-select>:
    skip if value empty or AI_AUTO
    extract:
      token         ← select[data-lesson-token]          // = data-data on the card
      div           ← select.closest('div[data-data]')
      cell          ← div.closest('td')
      subjectId     ← div.dataset.subjectId  // blue
                   || cell <a href subjectId=> // green
      subjectName   ← div h2.innerText
      realSchoolId  ← cell <a href schoolId=>  // 32 hex
                   || cell <a onclick '…'>
                   || div onclick '…'
                   || URL/getSchoolIdValue()/'79427'
      selection     ← {treeValue: select.value, treeText: option.text}

    silentPrepareLesson(token, selection, subjectId, realSchoolId)
      ids = treeValue.split(',')                         // [subj, chap, lesson]
      finalSubjectId = passedSubjectId || ids[0]
      lessonName     = treeText.trim().replace(':', '')

      ── Step A ─────────────────────────────────────────
      silentCreateActivityResource(finalSubjectId, chapterId, lessonId, lessonName, realSchoolId)
        GET /Projects/Projects/Create?schoolId=realSchoolId
          DOMParser → __RequestVerificationToken, HashKey
          abort if !HashKey
        POST /Projects/Projects/Create  (URLSearchParams body)
          TypeId=1, Id="0", schoolId, SelectedUnitId, SelectedTrees_2/3,
          Name, CategoryId=4, ClassificationLevel=1, ProjectType=2,
          Description, Link=https://ien.edu.sa, SolvingType=3,
          AccessType=True, hfLevelsCount=3, hfDrawTree, TotalGrade=1
      await sleep(2000)                                  // CRITICAL DB sync

      ── Step B ─────────────────────────────────────────
      POST https://schools.madrasati.sa/Teacher/Lessons/SaveLastLessonPlan
        FormData with all §5.2 fields
      return res.ok

  on success: select.style.borderColor = '#1a9448'
              successCount++

  updateDashboardStatus(`✅ تم تحضير ${successCount} حصة بنجاح!`)
```

---

## 7. Known Limitations & Open Questions

1. **Subject-name fallback in `getLocalSubjectData` is mostly cosmetic.**
   The H2 umbrella name (`الرياضيات`) almost never matches the JSON's
   curriculum-unit names. Blue-card fallback **must** rely on
   `data-subject-id` first; the name path is a last resort.
2. **`getLocalTemplates` is currently dead code.** `silentPrepareLesson`
   sends static defaults for the four mandatory text fields. The
   templates DB and `flatTemplates` index are loaded but unused —
   reserved for future per-lesson rotation logic.
3. **`subjectName` is captured-but-unused inside `handleDashboardSave`.**
   Linter Hint at the matching line is intentional: the same extraction
   block is mirrored in `processDashboardQueue` (which *does* use
   `subjectName` for the dropdown name fallback). Keeping the two
   blocks identical was an explicit user request.
4. **`strategies: '4'` is hard-coded** without DOM-driven mapping. If a
   teacher's school config defines a different valid strategy id set,
   `'4'` may not be present and the lesson save can succeed but render
   with no strategy selected. Future work: scrape the real options from
   `LessonDetailsNew` once and cache the legal IDs per-school.
5. **`'79427'` is the ultimate-fallback SchoolId** in two places. It
   was the test-tenant's id during development. Production should never
   reach this branch — but if it does (DOM walk + URL params + hidden
   field all empty), the save will go to a foreign school and fail.
   Consider replacing the fallback with an explicit error.
6. **No retry/backoff.** If the 2-second post-Activity sleep is
   occasionally not enough on slow tenants, the save will fail silently.
   No detection or retry currently — the user just sees the green
   border missing.
7. **The Madrasati backend rules above are reverse-engineered from
   competitor traces, not from documentation.** Madrasati has no
   public API. Field semantics (e.g., `CategoryId=4`,
   `ClassificationLevel=1`, `SolvingType=3`) are copied verbatim from
   the working capture. If they regress, re-record a save flow with
   Chrome DevTools' Network panel and diff against §4.3.

---

## 8. File-by-File Reference

### `background.js`
- **§1 Database manager** (lines ~10-100): `dbCache`, `loadDatabases`,
  `normalizeSubjectName`, `extractSubjectName`, `buildSubjectIndex`,
  `flattenTemplates`.
- **§2 State management** (lines ~105-180): tab states, badges, toggle.
- **§3 Message router** (lines ~185-235): listens for both data and
  state messages.
- **`handleDataRequest`** (bottom of file): the only function the
  next maintainer is likely to touch. Don't break the
  `subjectId → bySubjectId.get` → `subjectName → bySubjectName + containment`
  fallback chain.

### `content.js`
The relevant region for headless save flow:

> Line numbers are accurate as of the snapshot this doc was generated
> against; expect drift after edits. Always re-`grep` the function
> name before citing a line.

| ~Line | Symbol | Purpose |
|---|---|---|
| 164 | `getLocalSubjectData(subjectId, subjectName)` | thin wrapper around `chrome.runtime.sendMessage` |
| 172 | `getLocalTemplates()` | thin wrapper, currently unused by the save flow |
| 843 | `fetchLessonTreeOptions(subjectId, subjectName)` | builds dropdown options from local cache |
| 1080 | `injectDashboardUI` + queue/poller | mounts the panel and feeds `processDashboardQueue` |
| 1260 | `silentCreateActivityResource(subjectId, chapterId, lessonId, lessonName, realSchoolId)` | the §4 two-step Activity creator |
| 1314 | `silentPrepareLesson(token, selection, passedSubjectId, realSchoolId)` | calls Activity then `SaveLastLessonPlan` |
| 1362 | `handleDashboardSave()` | bulk loop with per-cell extraction |
| 1829 | `getCsrfToken()` | reads `#csrfid` or `input[name="__RequestVerificationToken"]` |
| 1832 | `getSchoolIdValue(root)` | hidden-field reader (only used as last fallback) |

### Local data files
- `madrasati_courses_clean.json` — pre-cleansed lesson catalogue (162 subjects).
- `ee10_lesson_templates.json` — Arabic plan section text (14 sections).

Both ship inside the extension and are loaded with `chrome.runtime.getURL`.

### Dead code already removed *(do not reintroduce)*
- `_tahdiriChunkReverse`, `_decryptEndpoint1`, `_decryptEndpoint2`
- `fetchViaBackground` (CORS proxy for k.tahdiri.com)
- `buildLessonMap`, `resolveGroupNames`, `buildPlanFromNamedSections`
- `applyParasitePlanToForm`, `applyQuickPrepToForm`
- `silentCreateAssignment`, `silentCreateEnrichment` (failed gate-bypass attempts)
- `deriveDashboardSubjectContext`, `_pickTemplate` helpers from earlier refactors

---

## 9. Quick checklist for the next change

Before touching `silentPrepareLesson` or `silentCreateActivityResource`:

- [ ] Have you re-read §3 (Multiple Schools) and §4 (Activity gate)?
- [ ] Are you preserving `realSchoolId` propagation end-to-end? It must
      appear in the GET URL, the Activity POST body's `schoolId`, **and**
      the SaveLastLessonPlan FormData's `SchoolId`.
- [ ] Are the four mandatory text fields still present and non-empty?
- [ ] Is the post-Activity sleep still ≥2000ms?
- [ ] Does `Id` stay `"0"` (string), `ProjectType` stay `"2"`,
      `AccessType` stay `"True"`, `TotalGrade` stay `"1"`?
- [ ] Does `groups`-iteration still flatten the inner array, with
      `rawLessonsList` fallback when groups produces zero options?
- [ ] Did you re-run `node --check content.js && node --check background.js`?

If you are introducing a new silent-save flow (e.g. Tahdiri's own
`Practice` resource), assume there is a HashKey / per-form anti-replay
mechanism. Always GET the Create page first, scrape, then POST.

## §10. Current Status & Known Issues (May 2026)

### Fixed:
- Blue card routing: all cards now go through `silentPrepareLesson` (removed `iframePrepareLesson` call site)
- `treeSubjectId` is always taken from `treeValue.split(',')[0]`, not from `data-subject-id`
- `TimeTableId` is extracted from `lectureId` query param in the ManageLecture URL
- `classroomId` is extracted from the ManageLecture URL and appended to SaveLastLessonPlan form
- `hfLevelsCount` is hardcoded to "3" (we always send 3 tree levels)
- Activity POST now executes BEFORE the ManageLecture fetch to preserve HashKey validity
- CSRF fallback: if ManageLecture redirects (Blue card), use dashboard `getCsrfToken()`
- HashKey and CSRF are always scraped from the same `/Projects/Projects/Create` page render

### Current Blocker:
- `POST /Projects/Projects/Create` still returns 302 redirect to `/Projects/Index`
- All fields verified correct: HashKey, CSRF, SelectedUnitId, SelectedTrees_2, SelectedTrees_3, hfLevelsCount=3
- `SaveLastLessonPlan` never executes because `activityCreated` returns false
- Root cause unknown: server silently rejects the Activity POST