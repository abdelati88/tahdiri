# Plan: MlutiLessonPlan helper in `silentPrepareLesson` (content.js)

## Goal

Insert a `/Teacher/Lessons/MlutiLessonPlan` probe inside
`silentPrepareLesson` (after the Activity has been created), parse the
returned server-rendered form into a `FormData`, use that as the base
for `SaveLastLessonPlan`, and bypass the existing `looksLikeRealToken`
guard so the **numeric** `TimeTableId` (e.g. `"17886178"`, 8 chars)
isn't rejected and overwritten with the encrypted `data-data` blob.

## Verdict on the user's latest 3-edit prompt

**Semantically correct** — the three issues I previously flagged
(downstream `looksLikeRealToken` override, ordering vs. Activity
creation, length-threshold mismatch) are all addressed.

**Mechanically broken as written** — the `Edit` tool is byte-exact.
The user's three FIND blocks use **2-space** indentation, but every
line they target in the live file uses **6-space** (function body),
**8-space** (one nest deeper), or **10-space** (two nests deeper).
All three `Edit` calls will fail with `old_string not found` unless
the FIND blocks are re-indented to match the file exactly.

There is also a **pre-existing whitespace quirk** inside `console.error(`
at lines 1490-1497 of the live file that must be preserved verbatim in
EDIT 3's FIND (lines 1493-1495 are indented 8 spaces while the lines
immediately above and below use 10 spaces). If the agent
"normalizes" that, the match fails.

The corrected prompt below uses exact indentation and preserves the
internal quirk. The REPLACE blocks have been re-indented to keep the
output consistent with the rest of the file.

## Out-of-scope but noted (not a blocker)

EDIT 2's REPLACE copies all of `mlutiFormData` into `finalForm`, which
includes `ClassroomId` (capital C — what MlutiLessonPlan emits). The
downstream line 1503 (`if (classroomId) finalForm.set('classroomId', classroomId);`,
lowercase) will still overwrite the URL-derived `classroomId` if the
manual `scrapeUrl` carried one. Net result: the FormData will contain
both `ClassroomId` (numeric, from MlutiLessonPlan) and `classroomId`
(whatever the URL regex returned). If the server accepts either, fine.
If it accepts only one and is case-sensitive, this could need a
follow-up. Worth verifying once the save POST is observable end-to-end.

Also: `ARCHITECTURE.md §10` / `PLAN.md` say the active blocker is
`POST /Projects/Projects/Create` 302→`/Projects/Index`, which makes
`silentCreateActivityResource` return `false` at line ~1394 and
short-circuits `silentPrepareLesson` BEFORE the new MlutiLessonPlan
call (which sits at line ~3a, right after the early-return). If that
Activity-create blocker is still live, the verification log
"`[Tahdiri] MlutiLessonPlan OK — …`" will NOT appear at all, and the
"`[Tahdiri] Activity creation failed - aborting lesson save.`" line
will be visible above it. That's an acceptance criterion, not a
problem with this edit.

---

## Critical file (only file to modify)

- `/Users/abdelati88/Downloads/tahdiri-10.0.0/content.js`
  (function `silentPrepareLesson`, lines ≈1355–1561)

Confirmed live-file anchors:
- EDIT 1 FIND  → lines 1394-1399 (6-space outer indent)
- EDIT 2 FIND  → lines 1449-1460 (6-space outer indent)
- EDIT 3 FIND  → lines 1481-1499 (6-space outer indent, with internal
  8-vs-10 quirk on lines 1493-1495)

---

## Corrected copy-paste prompt (deliverable for the VS Code agent)

> Paste the block below verbatim. Indentation matters — the FIND blocks
> use the file's exact 6/8/10-space scheme. Do not "tidy" them.

````
Edit `content.js`. DO NOT rewrite the file. Make ONLY the three surgical changes below.
The `Edit` tool is byte-exact, so the FIND blocks below must match the file character-for-character.
Do NOT re-indent, collapse blank lines, or "normalize" any whitespace.

CONTEXT
=======
Add a MlutiLessonPlan probe after Activity creation in `silentPrepareLesson`.
Posting the card's `data-data` blob to `/Teacher/Lessons/MlutiLessonPlan`
returns a server-rendered form whose hidden inputs include NUMERIC
SchoolId (e.g. "162189"), TimeTableId (e.g. "17886178"), ClassroomId,
StartDate, EndDate, and EventsData. Those are the values that
SaveLastLessonPlan actually requires; the encrypted `data-data` blob is
not. Three coupled edits:

  - EDIT 1 adds the probe + declares `mlutiFormData` in function scope.
  - EDIT 2 uses `mlutiFormData` as the FormData base (with the
    ManageLecture scrape kept as a fallback).
  - EDIT 3 short-circuits the existing `looksLikeRealToken` guard at
    line ~1482, because the numeric TimeTableId is 8 digits and would
    otherwise fail the `length >= 16` check and be overwritten with
    the encrypted blob.

==========================================================================
EDIT 1 of 3 — Add MlutiLessonPlan call right after Activity creation.
==========================================================================
FIND this exact block (currently lines 1394-1399):

      if (!activityCreated) {
        console.error("[Tahdiri] Activity creation failed - aborting lesson save.");
        return false;
      }

      // 3. NOW fetch ManageLecture for the SaveLastLessonPlan CSRF (after Activity is safely created)

REPLACE WITH:

      if (!activityCreated) {
        console.error("[Tahdiri] Activity creation failed - aborting lesson save.");
        return false;
      }

      // 3a. Call MlutiLessonPlan to get NUMERIC SchoolId + TimeTableId for SaveLastLessonPlan.
      // The `token` is the card's `data-data` encrypted blob. Posting it to MlutiLessonPlan
      // returns a server-rendered form with all the numeric IDs SaveLastLessonPlan requires.
      let mlutiFormData = null;
      const looksLikeBlob = (v) => {
        if (!v) return false;
        const s = String(v).trim();
        if (/^\d{1,5}$/.test(s)) return false; // slot index, not a blob
        return s.length >= 16;
      };
      if (looksLikeBlob(token)) {
        try {
          const mlutiCsrf = getCsrfToken();
          const mlutiBody = new URLSearchParams();
          mlutiBody.append('Data', token);
          const mlutiRes = await fetch('/Teacher/Lessons/MlutiLessonPlan', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest',
              'requestverificationtoken': mlutiCsrf
            },
            body: mlutiBody.toString()
          });
          const mlutiHtml = await mlutiRes.text();
          const mlutiDoc = new DOMParser().parseFromString(mlutiHtml, 'text/html');
          const mlutiInputs = mlutiDoc.querySelectorAll('input[type="hidden"]');
          if (mlutiInputs.length > 3) {
            mlutiFormData = new FormData();
            mlutiInputs.forEach(inp => { if (inp.name) mlutiFormData.set(inp.name, inp.value); });
            console.log('[Tahdiri] MlutiLessonPlan OK — SchoolId:', mlutiFormData.get('SchoolId'), 'TimeTableId:', mlutiFormData.get('TimeTableId'), 'fields:', mlutiInputs.length);
          } else {
            console.warn('[Tahdiri] MlutiLessonPlan returned too few hidden inputs:', mlutiInputs.length, '— snippet:', mlutiHtml.slice(0, 200));
          }
        } catch (e) {
          console.warn('[Tahdiri] MlutiLessonPlan fetch failed:', e);
        }
      } else {
        console.warn('[Tahdiri] token is not a blob — skipping MlutiLessonPlan. token:', String(token || '').slice(0, 20));
      }

      // 3b. NOW fetch ManageLecture for the SaveLastLessonPlan CSRF (after Activity is safely created)

==========================================================================
EDIT 2 of 3 — Use mlutiFormData as the FormData base; fall back to scrape.
==========================================================================
FIND this exact block (currently lines 1449-1460):

      // 4. Build the SaveLastLessonPlan payload from the scraped hidden inputs
      const finalForm = new FormData();

      // 🔥 SCRAPE ALL HIDDEN INPUTS from every form on the fetched page (not just #CreateResourceForm)
      const hiddenInputs = doc.querySelectorAll('form input[type="hidden"]');
      let foundHidden = false;
      hiddenInputs.forEach(input => {
        if (input.name) {
          finalForm.set(input.name, input.value);
          foundHidden = true;
        }
      });

REPLACE WITH:

      // 4. Build the SaveLastLessonPlan payload.
      // Prefer mlutiFormData (has NUMERIC SchoolId + TimeTableId from server).
      // Fall back to ManageLecture hidden-input scrape if MlutiLessonPlan failed.
      const finalForm = new FormData();
      if (mlutiFormData) {
        for (const [k, v] of mlutiFormData.entries()) { finalForm.set(k, v); }
        console.log('[Tahdiri] Base FormData from MlutiLessonPlan. SchoolId:', finalForm.get('SchoolId'), 'TimeTableId:', finalForm.get('TimeTableId'));
      } else {
        console.warn('[Tahdiri] mlutiFormData null — falling back to ManageLecture scrape.');
        const hiddenInputs = doc.querySelectorAll('form input[type="hidden"]');
        hiddenInputs.forEach(input => { if (input.name) finalForm.set(input.name, input.value); });
      }

==========================================================================
EDIT 3 of 3 — Bypass `looksLikeRealToken` when mlutiFormData has a value.
==========================================================================
NOTE: The FIND block below contains a pre-existing whitespace quirk on
the three lines starting with `"  token (data-data) passed in:"`,
`"  scrapeUrl:"`, and `"This is a Blue card whose ManageLecture page redirected"`
— they are indented with 8 spaces while the two lines immediately above
them (and the `lessonCardDiv` line below) use 10 spaces. Keep that
mismatch exactly as-is. If you "fix" it, the match fails.

FIND this exact block (currently lines 1481-1499):

      let finalTimeTableId = "";
      if (looksLikeRealToken(scrapedTimeTableId)) {
        finalTimeTableId = scrapedTimeTableId;
        console.log("[Tahdiri] Using TimeTableId from ManageLecture hidden input:", finalTimeTableId.slice(0, 16) + "...");
      } else if (looksLikeRealToken(token)) {
        // token came from data-data on Green cards — that IS the encrypted hash.
        finalTimeTableId = token;
        console.log("[Tahdiri] Using TimeTableId from card data-data attr:", finalTimeTableId.slice(0, 16) + "...");
      } else {
        console.error(
          "[Tahdiri] Could NOT obtain a valid encrypted TimeTableId.\n" +
          "  scraped from ManageLecture hidden input:", scrapedTimeTableId, "\n" +
        "  token (data-data) passed in:", token, "\n" +
        "  scrapeUrl:", scrapeUrl, "\n" +
        "This is a Blue card whose ManageLecture page redirected (probably wrong SchoolId or wrong subjectId in the constructed URL). Aborting save to avoid /Errors/NotPermitted.",
          lessonCardDiv
        );
        return false;
      }

REPLACE WITH:

      let finalTimeTableId = "";
      if (mlutiFormData && mlutiFormData.get('TimeTableId')) {
        // MlutiLessonPlan returned a numeric TimeTableId (e.g. "17886178").
        // Do NOT run it through looksLikeRealToken — numeric IDs are short (≈8 digits)
        // and would fail the length >= 16 check.
        finalTimeTableId = String(mlutiFormData.get('TimeTableId')).trim();
        console.log('[Tahdiri] Using TimeTableId from MlutiLessonPlan:', finalTimeTableId);
      } else if (looksLikeRealToken(scrapedTimeTableId)) {
        finalTimeTableId = scrapedTimeTableId;
        console.log("[Tahdiri] Using TimeTableId from ManageLecture hidden input:", finalTimeTableId.slice(0, 16) + "...");
      } else if (looksLikeRealToken(token)) {
        // token came from data-data on Green cards — that IS the encrypted hash.
        finalTimeTableId = token;
        console.log("[Tahdiri] Using TimeTableId from card data-data attr:", finalTimeTableId.slice(0, 16) + "...");
      } else {
        console.error(
          "[Tahdiri] Could NOT obtain a valid TimeTableId.\n" +
          "  mlutiFormData TimeTableId:", mlutiFormData && mlutiFormData.get('TimeTableId'), "\n" +
          "  scraped from ManageLecture hidden input:", scrapedTimeTableId, "\n" +
          "  token (data-data) passed in:", token, "\n" +
          "  scrapeUrl:", scrapeUrl, "\n" +
          "This is a Blue card whose ManageLecture page redirected. Aborting.",
          lessonCardDiv
        );
        return false;
      }

==========================================================================
VERIFICATION (MANDATORY — run all, do not skip)
==========================================================================

1. node --check content.js              # must exit 0

2. Each grep below must return exactly 1 line. If any returns 0 or >1,
   STOP and report — do NOT silently continue.

   grep -n "MlutiLessonPlan OK"                       content.js
   grep -n "Base FormData from MlutiLessonPlan"       content.js
   grep -n "Using TimeTableId from MlutiLessonPlan"   content.js
   grep -n "mlutiFormData && mlutiFormData.get"       content.js

3. git diff content.js — confirm changes are ONLY inside
   `silentPrepareLesson` (≈lines 1355-1561). Do NOT touch
   `silentCreateActivityResource`, `handleDashboardSave`, the dropdown
   injection, the iframe path, or anything else.

==========================================================================
After verifications pass, ask the user to:
==========================================================================
a. Reload extension at chrome://extensions (Tahdiri → reload icon).
b. Hard-refresh the TeacherSchedule page (Cmd+Shift+R).
c. DevTools → Network → Preserve log → Fetch/XHR → clear log.
d. Click "حفظ وبدء التحضير".
e. In the console, confirm this sequence appears in order:
     1) "[Tahdiri] MlutiLessonPlan OK — SchoolId: <short numeric> TimeTableId: <short numeric> fields: <N>"
        SchoolId looks like "162189"; TimeTableId looks like "17886178".
     2) "[Tahdiri] Base FormData from MlutiLessonPlan. SchoolId: <num> TimeTableId: <num>"
     3) "[Tahdiri] Using TimeTableId from MlutiLessonPlan: <num>"
     4) "[Tahdiri] SaveLastLessonPlan — TimeTableId: <num> classroomId: <num> SchoolId(form): <num> ..."
        The TimeTableId on this FINAL log line MUST be the short numeric form,
        NOT the 32+ char encrypted blob. If it is the blob, EDIT 3 did not
        apply correctly.
f. From the Network panel, capture the SaveLastLessonPlan response:
   - HTTP status
   - Final URL (look for `Failure`, `ManageLecture`, `NotPermitted`, or
     `Error` substrings — any of those = silent server rejection that
     the existing code at line ~1551 already detects).

NOTE: per ARCHITECTURE.md §10 / PLAN.md, the previously-documented
blocker is `POST /Projects/Projects/Create` returning 302 → `/Projects/Index`.
If that blocker is still live, `silentCreateActivityResource` will
return false BEFORE the new MlutiLessonPlan code runs, the
"MlutiLessonPlan OK" log will NOT appear, and you will see
"[Tahdiri] Activity creation failed - aborting lesson save." instead.
That means this edit is correct but cannot itself be validated until
the upstream Activity-create blocker is resolved.
````

---

## Verification plan for the maintainer

1. **Static** — `node --check content.js` exits 0.
2. **Static** — the four greps in §VERIFICATION each return exactly 1 hit.
3. **Static** — `git diff content.js` touches only lines inside
   `silentPrepareLesson` (≈1355-1561).
4. **Runtime** — reload extension, hard-refresh TeacherSchedule,
   click "حفظ وبدء التحضير", and confirm the console-log sequence in
   the After-verifications block. The *final* `SaveLastLessonPlan —`
   log's `TimeTableId` field must be the short numeric value, not
   the 32+ char encrypted blob — that's the load-bearing assertion
   that EDIT 3 succeeded.
5. **Runtime** — capture `saveRes.status` and `saveRes.url` for the
   `SaveLastLessonPlan` request from the Network panel. A redirect URL
   containing `ManageLecture`, `NotPermitted`, or `Error` is still a
   silent server rejection (existing code at line ~1551 already logs it).

If step 4 shows `"[Tahdiri] Activity creation failed - aborting lesson save."`
without the `MlutiLessonPlan OK` line, the Activity-create blocker from
`ARCHITECTURE.md §10` is still active and this edit cannot itself be
validated until that upstream issue is fixed.
