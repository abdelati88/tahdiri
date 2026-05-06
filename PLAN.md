Tahdiri Extension — Smart Prep Implementation Plan (v2 — Parasite Strategy)

Read this entire document before writing any code.
This is a 3-phase plan: (1) Read & Understand, (2) Plan, (3) Implement.
Stop after each phase and wait for explicit user approval.

════════════════════════════════════════════════════════════
1. Project Context
════════════════════════════════════════════════════════════

This is a Chrome extension that automates lesson preparation on the Saudi
educational platform "Madrasati" (schools.madrasati.sa).

Files in this directory:

  content.js               — bundled content script Chrome loads. THIS IS THE FILE YOU EDIT.
  background.js            — service worker (handles CORS-blocked fetches as proxy)
  manifest.json            — extension manifest
  popup.html / popup.js    — extension popup
  options.html / options.js — extension options page
  competitor.js            — decompiled & obfuscated competitor extension. REFERENCE ONLY.
  decryptCompetitorPayload.js — standalone reverse-engineered decryption module (reference/test)
  testCompetitorApi.js     — two-endpoint chain test script (reference/test)

There is no build step. content.js is the file Chrome loads directly.

════════════════════════════════════════════════════════════
2. The Problem (Background)
════════════════════════════════════════════════════════════

The current AI flow uses n8n webhook → OpenRouter → GPT-4o-mini to fill the
lesson plan form. The AI returns generic, repetitive text that does not mention
the actual lesson name, and the same text is often duplicated across multiple
form fields.

An earlier approach (now DEPRECATED — see §3 below) attempted to use the
internal Madrasati API GetGoalLessonSubject to retrieve lesson goals. While
technically functional, the lesson content it returned was limited to bare goal
titles and could not produce the rich, structured Arabic text that the
competitor extension produces.

════════════════════════════════════════════════════════════
3. ❌ DEPRECATED — Old Data Source (DO NOT USE)
════════════════════════════════════════════════════════════

The following approach has been REPLACED by the Parasite Strategy in §4.
It is documented here only for historical reference. Do not implement it.

  POST /LearningResources/MangeResources/GetGoalLessonSubject
  GET  /Teacher/Subjects/GetStudentBooks?Id=<subjectId>

These endpoints returned bare goal titles and book links. The template builder
(buildLessonPlanFromGoals) that consumed them is DEPRECATED. All hardcoded
Arabic template strings in COMPETITOR_PREP_TEXTS / COMPETITOR_STRATEGIES
arrays are also deprecated and should not be referenced.

════════════════════════════════════════════════════════════
4. ✅ NEW STRATEGY — The Parasite Strategy
════════════════════════════════════════════════════════════

Through reverse-engineering of competitor.js, we identified two external API
endpoints hosted by the competitor (k.tahdiri.com). These endpoints return
the full, rich Arabic lesson-plan text that the competitor's extension renders
directly into Madrasati forms — exactly the data we need.

Both responses are encrypted using a custom string-scrambling algorithm.
The decryption pipelines have been fully reverse-engineered and verified.

────────────────────────────────────────────────────────────
4.1 Endpoint 1 — Lesson ID Groups
────────────────────────────────────────────────────────────

  URL:     https://k.tahdiri.com/t/getlessonq.php?p_subj=<subjectId>
  Method:  GET
  Auth:    None required (public endpoint)
  Params:  p_subj — the Madrasati subject/lesson ID (integer)

  Encrypted response (example first 60 chars):
    =0jLVIxX3MVN3MDWy0sNSYTNjIzgSOyOyNzUCw1w1OyYyszwyNTdz...

  Decrypted result — an Array of lesson-ID groups:
    [
      [55822, 27497, 27506],   ← group 0
      [27510, 27508, 27507],   ← group 1
      ...17 groups total
    ]

  Each group is an ordered array of content-block IDs belonging to one
  section of the lesson. The group index maps to form sections
  (التهيئة, شرح الدرس, الواجب, etc.) once cross-referenced with Endpoint 2.

  Decryption Pipeline A (window['decodeResponse'] from competitor.js):
    Step  1: chunkReverse(s, 7)
    Step  2: chunkReverse(s, 2)
    Step  3: chunkReverse(s, 5)
    Step  4: chunkReverse(s, 4)
    Step  5: fullReverse(s)              ← entire string reversed
    Step  6: chunkReverse(s, 9)
    Step  7: chunkReverse(s, 8)
    Step  8: chunkReverse(s, 7)
    Step  9: chunkReverse(s, 6)
    Step 10: chunkReverse(s, 5)
    Step 11: atob() via charCode mapping → decodeURIComponent → JSON.parse

  Where chunkReverse(str, n) = walk str in n-char windows, reverse
  characters inside each window (chunk order unchanged). Self-inverse.

────────────────────────────────────────────────────────────
4.2 Endpoint 2 — Lesson Name Catalogue
────────────────────────────────────────────────────────────

  URL:     https://k.tahdiri.com/public/gets2/lessonsofsubject2.php
  Method:  POST
  Headers: Content-Type: application/x-www-form-urlencoded
  Body:    scid=<subjectId>   ← SAME integer as p_subj above
  Auth:    None required

  Encrypted response: similar scrambled base64 string

  Decrypted result — flat Array of lesson objects:
    [
      { "id": "277,4689,27497", "name": "الطرح -- قصص الطرح" },
      { "id": "277,4689,27506", "name": "الطرح -- تمثيل الطرح" },
      { "id": "277,30434,27632", "name": "النقود -- استعمال النقود" },
      ...
    ]

  The id field is a comma-separated composite: "subjectId,chapterId,lessonId"
  The 3rd token (lessonId) cross-references the numeric IDs in Endpoint 1 groups.
  The name field contains the full Arabic section label, e.g.:
    "الطرح -- التهيئة"
    "الطرح -- قصص الطرح"
    "طرائق الجمع والطرح -- أحل المسألة: أكتب جملة عددية"

  Decryption Pipeline B (_0x2c9b5b / _0x26a59e from competitor.js):
    Step  1: chunkReverse(s, 11)         ← differs from Pipeline A (11 vs 7)
    Step  2: chunkReverse(s, 2)
    Step  3: chunkReverse(s, 3)          ← differs from Pipeline A (3 vs 5)
    Step  4: chunkReverse(s, 4)
    Step  5: fullReverse(s)
    Step  6: chunkReverse(s, 9)
    Step  7: chunkReverse(s, 8)
    Step  8: chunkReverse(s, 7)
    Step  9: chunkReverse(s, 6)
    Step 10: chunkReverse(s, 5)
    Step 11: atob() → TextDecoder('utf-8').decode(Uint8Array) → JSON.parse

  Key difference from Pipeline A: steps 1 and 3 use different chunk sizes,
  and the final decode uses raw UTF-8 (not decodeURIComponent).

────────────────────────────────────────────────────────────
4.3 ID Cross-Reference (Joining the Two Responses)
────────────────────────────────────────────────────────────

  After fetching both endpoints with the same subjectId:

  1. Build a Map from Endpoint 2:
       key   = parseInt(id.split(',')[2])   ← the lessonId token
       value = { name, chapterId, compositeId }

  2. For each group in the Endpoint 1 array:
       forEach id in group → look up in the Map → get Arabic name

  3. The group with a name ending in "-- التهيئة" = التمهيد section
     The group with a name ending in names like "قصص الطرح" etc. = main lesson
     Groups containing "أحل المسألة" = problem-solving section
     Groups containing "الواجب" or last group = homework section

  Because the subject has many lessons, filter Endpoint 2 results by the
  chapterId or by matching the specific lessonIds present in the Endpoint 1
  groups. Only groups whose IDs all appear in the Endpoint 2 map belong to
  the currently selected lesson.

════════════════════════════════════════════════════════════
5. Architecture — CORS Proxy via background.js
════════════════════════════════════════════════════════════

The competitor's endpoints are cross-origin from schools.madrasati.sa.
Direct fetch() calls from content.js will be blocked by CORS.

Solution: background.js acts as a transparent fetch proxy.

  ┌─────────────────┐   chrome.runtime.sendMessage   ┌─────────────────┐
  │   content.js    │ ──────────────────────────────▶ │  background.js  │
  │ (Madrasati DOM) │                                  │ (service worker)│
  │                 │ ◀────────────────────── response │                 │
  └─────────────────┘                                  └────────┬────────┘
                                                                │ fetch()
                                                                ▼
                                              https://k.tahdiri.com/...

  Message protocol (content.js → background.js):
    {
      action:  "COMPETITOR_FETCH",
      url:     "https://k.tahdiri.com/...",
      method:  "GET" | "POST",
      body:    "scid=277"           // optional, for POST
    }

  background.js listener returns:
    { ok: true,  text: "<encrypted string>" }   on success
    { ok: false, error: "<message>" }            on failure

  content.js wraps the message call in a helper:
    async function fetchViaBackground(url, method = "GET", body = null)
    Returns the raw encrypted text string or throws on error.

════════════════════════════════════════════════════════════
6. Decryption — content.js Responsibility
════════════════════════════════════════════════════════════

Decryption runs entirely inside content.js. No external libraries needed.
The two pipeline functions are pure JavaScript:

  function chunkReverse(str, n) {
    let r = '';
    for (let i = 0; i < str.length; i += n)
      r += str.slice(i, i + n).split('').reverse().join('');
    return r;
  }

  // Pipeline A — used for getlessonq.php response
  function decryptEndpoint1(raw) {
    let t = raw.trim();
    t = chunkReverse(t,7); t = chunkReverse(t,2); t = chunkReverse(t,5);
    t = chunkReverse(t,4); t = t.split('').reverse().join('');
    t = chunkReverse(t,9); t = chunkReverse(t,8); t = chunkReverse(t,7);
    t = chunkReverse(t,6); t = chunkReverse(t,5);
    const bin = atob(t);
    const uri = bin.split('').map(c => '%' + ('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('');
    return JSON.parse(decodeURIComponent(uri));
  }

  // Pipeline B — used for lessonsofsubject2.php response
  function decryptEndpoint2(raw) {
    let t = raw.trim();
    t = chunkReverse(t,11); t = chunkReverse(t,2); t = chunkReverse(t,3);
    t = chunkReverse(t,4);  t = t.split('').reverse().join('');
    t = chunkReverse(t,9);  t = chunkReverse(t,8); t = chunkReverse(t,7);
    t = chunkReverse(t,6);  t = chunkReverse(t,5);
    const bytes = Uint8Array.from(atob(t), c => c.charCodeAt(0));
    return JSON.parse(new TextDecoder('utf-8').decode(bytes));
  }

Both functions must be placed near the top of content.js alongside the
other utility helpers (after the log() and sleep() definitions).

════════════════════════════════════════════════════════════
7. New Data Flow — Step 2 of "⚡ تحضير سريع"
════════════════════════════════════════════════════════════

When the user clicks "⚡ تحضير سريع" and Step 1 completes:

  Step A — Identify current lesson
    Read the subjectId from the DOM (same as current approach —
    SelectedUnitId.value or equivalent selector on Page 2).

  Step B — Parallel fetch (via background.js proxy)
    const [raw1, raw2] = await Promise.all([
      fetchViaBackground(
        `https://k.tahdiri.com/t/getlessonq.php?p_subj=${subjectId}`
      ),
      fetchViaBackground(
        'https://k.tahdiri.com/public/gets2/lessonsofsubject2.php',
        'POST',
        `scid=${subjectId}`
      )
    ]);

  Step C — Decrypt both responses
    const groups   = decryptEndpoint1(raw1);   // [[id,id,...], ...]
    const catalogue = decryptEndpoint2(raw2);   // [{id, name}, ...]

  Step D — Build lesson map
    const lessonMap = buildLessonMap(catalogue);
    // lessonMap: Map<lessonId:number, {name:string, chapterId:number}>

  Step E — Resolve current lesson's named sections
    const named = resolveGroupNames(groups, lessonMap);
    // named: [{groupIndex, ids, sectionName}, ...]
    // Only keeps groups whose IDs are all found in the lessonMap.

  Step F — Build form field values from named sections
    const plan = buildPlanFromNamedSections(named, subjectId);
    Returns:
    {
      LectureClassPreparationText:  "<التهيئة Arabic text>",
      LessonVocabulary:             "<المفردات Arabic text>",
      ThinkingSkills:               "<مهارات التفكير>",
      LectureClassCloseText:        "<الغلق Arabic text>",
      TeacherNote:                  "<تعليمات المعلم>",
      homework:                     "<الواجب Arabic text>",
      compositeId:                  "277,4689,27497"  // for enrichment link
    }

  Step G — DOM injection
    Call applyParasitePlanToForm(plan) which uses setNativeValue() to
    write each value into the correct Madrasati form field by ID.
    ❌ DO NOT use fillLessonFields() — it has AI-specific logic.
    ✅ Use setNativeValue() directly on each field.

  Step H — Enrichment & Save
    Reuse ensureLessonRequirementSatisfied() then findFinalSaveButton2() + click.

════════════════════════════════════════════════════════════
8. Form Field Mapping (Arabic Section → Form Field ID)
════════════════════════════════════════════════════════════

  The section name from Endpoint 2 contains the Arabic label after " -- ".
  Map as follows:

  Section keyword(s)          → Form field ID
  ─────────────────────────────────────────────────────────
  "التهيئة"                   → #LectureClassPreparationText   (التمهيد)
  "قصص" / "مفردات" / "تمثيل" → #LessonVocabulary              (المفردات)
  "مهارات" / "التفكير"        → #ThinkingSkills
  "أحل المسألة" / الغلق        → #LectureClassCloseText         (الغلق)
  teacher note                → #TeacherNote
  last group / "واجب"         → homework field

  ThinkingSkills is always the fixed competitor string:
    "التركيز - التذكر - التحليل - التركيب - الربط - الملاحظة - الاستنتاج - التفكير الإبداعي - العصف الذهني"

  For the remaining fields, the text is constructed from the section name:

  التمهيد (LectureClassPreparationText):
    "نستعرض مع الطلاب درس: <sectionName>"
    e.g.  "نستعرض مع الطلاب درس: الطرح -- التهيئة"

  المفردات (LessonVocabulary):
    List of the section names in the group, newline-separated.
    e.g.  "الطرح -- قصص الطرح\nالطرح -- تمثيل الطرح\nالطرح -- جُمل الطرح"

  الغلق (LectureClassCloseText):
    "نختتم الدرس بمراجعة: <last group section names, comma-separated>"

  TeacherNote — fixed text (same as before):
    "بإمكانك الاطلاع على شرح هذا الدرس على منصة عين من خلال رابط الدرس."

  homework:
    "حل تمارين الدرس في كتاب التمارين."

  These strings are intentionally simple — they encode the REAL lesson names
  from the competitor API, giving the platform lesson-specific content without
  any AI involvement.

════════════════════════════════════════════════════════════
9. background.js Changes
════════════════════════════════════════════════════════════

Add a message listener for action: "COMPETITOR_FETCH":

  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action !== 'COMPETITOR_FETCH') return;
    const { url, method = 'GET', body = null } = msg;
    fetch(url, {
      method,
      headers: body ? { 'Content-Type': 'application/x-www-form-urlencoded' } : {},
      body: body || undefined,
    })
      .then(r => r.text())
      .then(text => sendResponse({ ok: true, text }))
      .catch(err => sendResponse({ ok: false, error: err.message }));
    return true; // keep message channel open for async response
  });

No manifest.json permission changes are needed — the service worker can
fetch any URL without the host_permissions restriction that content scripts have.
Verify this assumption before implementing; if a host_permissions entry for
"https://k.tahdiri.com/*" is required, ask the user before adding it.

════════════════════════════════════════════════════════════
10. New Functions to Add (Signatures)
════════════════════════════════════════════════════════════

  In content.js (near the top, with other utilities):
  ───────────────────────────────────────────────────
  chunkReverse(str, n)
    Core primitive used by both decrypt functions.

  decryptEndpoint1(rawText)
    Pipeline A. Returns parsed JSON (Array of groups).

  decryptEndpoint2(rawText)
    Pipeline B. Returns parsed JSON (Array of {id, name}).

  async fetchViaBackground(url, method, body)
    Sends COMPETITOR_FETCH message to background.js, awaits response,
    returns raw text string or throws.

  buildLessonMap(catalogue)
    catalogue = decryptEndpoint2 output.
    Returns Map<lessonId:number, {name, chapterId, compositeId}>.

  resolveGroupNames(groups, lessonMap)
    groups = decryptEndpoint1 output.
    Returns array of {groupIndex, ids, sectionName} for groups whose IDs
    are all found in the lessonMap.

  buildPlanFromNamedSections(named, subjectId)
    named = resolveGroupNames output.
    Returns the plan object (see §7 Step F).

  applyParasitePlanToForm(plan)
    Uses setNativeValue() to write each field. Does NOT call fillLessonFields().

  async runParasiteStep2Flow()
    Orchestrates steps B–H from §7. Called by AutomationController.run()
    when mode === "parasite".

  In background.js:
  ─────────────────
  COMPETITOR_FETCH message listener (see §9).

════════════════════════════════════════════════════════════
11. Existing Functions to Modify
════════════════════════════════════════════════════════════

  injectControlPanel()
    Add "⚡ تحضير سريع" button between AI button and "إعداد المسار فقط".
    Button ID: UI_IDS.quickBtn = "tahdiri-quick-btn"
    Gradient: linear-gradient(135deg, #1a9448 0%, #0f7a36 100%)

  setButtonsDisabled()
    Also disable / enable the new quick button.

  setControlPanelHandlers()
    Accept a startQuick handler in the handlers object.

  AutomationController
    Add: this.mode property ("ai" | "normal" | "parasite")
    Add: startQuick() method — sets mode = "parasite", state = STEP1,
         disables buttons, calls void this.run().
    Modify: run() — when state === STEP2 && mode === "parasite",
         call runParasiteStep2Flow() instead of runStep2Flow().

  boot()
    Handle resume for mode === "parasite" if needed.

════════════════════════════════════════════════════════════
12. UI Changes
════════════════════════════════════════════════════════════

  New button in injectControlPanel():

    const quickBtn = document.createElement("button");
    quickBtn.id   = UI_IDS.quickBtn;
    quickBtn.type = "button";
    applyButtonStyle(quickBtn, "linear-gradient(135deg, #1a9448 0%, #0f7a36 100%)");
    quickBtn.innerHTML = `<span class="tahdiri-btn-icon">⚡</span>
      <span class="tahdiri-btn-label">تحضير سريع</span>`;
    quickBtn.addEventListener("click", async () => {
      await controlPanelHandlers.startQuick();
    });

  Tooltip below the button:
    "أسرع تحضير ممكن — يستخدم بيانات المنصة مباشرة بدون ذكاء اصطناعي"

════════════════════════════════════════════════════════════
13. Hard Rules (Unchanged)
════════════════════════════════════════════════════════════

  DO NOT edit any file other than content.js and background.js unless asked.
  DO NOT delete or break the existing AI flow or the existing automated flow.
  DO NOT change manifest.json permissions without asking the user first.
  DO NOT rename existing functions or variables.
  DO preserve all existing code style (var/let/const, jQuery-style, etc.).
  DO add Arabic UI strings; keep code comments in English.
  DO use existing helpers: log, getLocal, setLocal, setNativeValue,
     ensureCheckboxChecked, findPreferredElement, waitForElement,
     triggerEvents, sleep, buildResult.
  DO wrap every API call in try/catch — never let a network error crash the flow.
  DO test syntax after every change with: node -c content.js

════════════════════════════════════════════════════════════
14. Phase 1 — Read & Understand (DO THIS FIRST, NO CODE)
════════════════════════════════════════════════════════════

  Read content.js end to end. Identify and report:

  - Where injectControlPanel() is defined and where buttons are added
  - Where AutomationController is defined (start, startAI, run methods)
  - Where runStep1Flow() and runStep2Flow() are defined
  - Where fillLessonFields() and markLessonCheckboxes() are defined
  - Where ensureLessonRequirementSatisfied() is defined
  - Where setNativeValue(), ensureCheckboxChecked(), findFinalSaveButton2() live
  - The current shape of aiLessonData in chrome.storage.local
  - The current mode / FLOW_MODES enum (if it exists)

  Then STOP. Reply with:
  - A summary in Arabic of what you read
  - Line ranges for each key function
  - Any concerns before Phase 2

  Wait for explicit "approved" before Phase 2.

════════════════════════════════════════════════════════════
15. Phase 2 — Detailed Implementation Plan (AFTER Phase 1 approval)
════════════════════════════════════════════════════════════

  Propose concrete insertion points for every new function and every
  modification, with the name of the existing function each change follows.
  Then STOP and wait for approval.

════════════════════════════════════════════════════════════
16. Phase 3 — Implement Step by Step (AFTER Phase 2 approval)
════════════════════════════════════════════════════════════

  Implement in this order. After EACH step:
    1. Run: node --check content.js
    2. Show a diff summary
    3. State what to manually test in Chrome
    4. Wait for approval before next step

  Order:
    1. Add new constants (UI_IDS.quickBtn)
    2. Add chunkReverse(), decryptEndpoint1(), decryptEndpoint2()
    3. Add fetchViaBackground()
    4. Add buildLessonMap(), resolveGroupNames(), buildPlanFromNamedSections()
    5. Add applyParasitePlanToForm()
    6. Add runParasiteStep2Flow()
    7. Modify injectControlPanel() — new button
    8. Modify setButtonsDisabled(), setControlPanelHandlers(), getters
    9. Add AutomationController.startQuick(); modify .run() to branch
   10. Modify boot() for resume
   11. Add COMPETITOR_FETCH listener to background.js
   12. Final review pass

════════════════════════════════════════════════════════════
17. Acceptance Criteria
════════════════════════════════════════════════════════════

  ✅ Extension loads in Chrome with no console errors
  ✅ All existing buttons ("تحضير الدرس", "AI تحضير", "إعداد المسار") still work
  ✅ New "⚡ تحضير سريع" button appears in the control panel
  ✅ Click → Step 1 runs automatically → arrives at Page 2
  ✅ Page 2 form fields filled with REAL Arabic lesson names from competitor API
  ✅ At least one enrichment added so platform accepts the save
  ✅ Save completes successfully with no validation errors
  ✅ No syntax errors in content.js or background.js
  ✅ No console.error calls — only the existing log() helper

════════════════════════════════════════════════════════════
18. Test Subject
════════════════════════════════════════════════════════════

  Subject:     الرياضيات (Math), Grade 1
  Subject ID:  277
  Chapter ID:  4689 → "الطرح"
  Lesson ID:   27497 → "الطرح -- قصص الطرح"

  Expected Endpoint 1 group containing 27497: [55822, 27497, 27506]
  Expected Endpoint 2 entries for this group:
    { id: "277,4689,55822", name: "الطرح -- التهيئة" }
    { id: "277,4689,27497", name: "الطرح -- قصص الطرح" }
    { id: "277,4689,27506", name: "الطرح -- تمثيل الطرح" }

  Run the chain test anytime with:
    node testCompetitorApi.js 277

════════════════════════════════════════════════════════════
19. Decryption Reference (Verified & Working)
════════════════════════════════════════════════════════════

  Source of truth:  testCompetitorApi.js  (run with node to verify live)
  Reference module: decryptCompetitorPayload.js (Pipeline A, standalone)

  Pipeline A verified: ✅ returns Array[17] of ID groups for subjectId=277
  Pipeline B verified: ✅ returns Array[71] of {id, name} for scid=277

  Both pipelines were confirmed by:
  1. Resolving the competitor's obfuscated string table (rotation offset 126)
  2. Identifying window['decodeResponse'] and _0x2c9b5b as the active functions
  3. Live HTTP fetch + decode producing valid Arabic JSON output