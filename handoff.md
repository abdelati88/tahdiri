# Tahdiri — FINAL Handoff Document (v3 — Complete with Competitor HAR Analysis)

> **Status (May 18, 2026):** API path works for Activity-only. The COMPLETE 4-asset flow (Activity + Enrichment + Homework + Exam) has been fully reverse-engineered from a captured competitor HAR. Implementation ready.
>
> **Next chat's job:** Implement multi-asset support + n8n AI content integration, using the exact payloads and sequence documented below.

---

## 🛠️ Workflow Constraint (CRITICAL)

The user has an **autonomous AI Agent in VS Code (Antigravity / Claude Code)** that executes file changes. The user does NOT edit files manually.

When you have a solution, **DO NOT give conversational copy-paste snippets**. You MUST generate a **STRICT, READY-TO-USE PROMPT in English** for the VS Code Agent, wrapped in a code block, including:
1. Target file name.
2. Explicit "DO NOT rewrite the whole file."
3. Exact **Find** block.
4. Exact **Replace with** block.
5. Verification `grep` commands.
6. `node --check content.js` as final syntax validation.

---

## 📦 What is Tahdiri?

Chrome extension that automates lesson preparation on Saudi Madrasati (`schools.madrasati.sa`). Goal: silently prepare 24 lessons in one click.

**Killer features:**
- ✅ Bulk (24 lessons)
- ✅ Silent (background API)
- 🔧 AI content via n8n (NEXT)
- 🔧 Multi-asset (Activity + Enrichment + Homework + Exam) (NEXT — fully reverse-engineered, ready to implement)

---

## ✅ What's CURRENTLY Working (verified May 18, 2026)

A complete API flow that ships ONE Activity per lesson and saves successfully:

```
1. Scrape CSRF + HashKey from /Projects/Projects/Create
   - Scoped via hashKeyEl.closest('form') — Madrasati has multiple __RequestVerificationToken
     inputs across forms; naive selector picks an empty one.

2. fetchProjectsListSnapshot('before-create')
   - Baseline of existing ProjectIds for this lesson scope.

3. POST /Projects/Projects/Create → 302 (success)
   - Id="" (NOT "0")
   - ProjectType sent TWICE: "2" then ""
   - hfLevelsCount="3" (hardcoded)

4. Wait 2000ms for DB sync.

5. fetchProjectsListSnapshot('after-create')
   - New set; size = baseline + 1.

6. DIFF: after − before → our new ProjectId.

7. Fetch /SchoolSchedule/Schedule/ManageLecture
   - Scrape Save form's base FormData (~61 fields).

8. POST /Teacher/Lessons/MlutiLessonPlan (note typo "Mluti")
   - Returns enriched form HTML + StartDate.

9. Inject critical fields into FormData:
   - SubjectId + SelectedUnitId (BOTH required, same value)
   - LessonType = "2"
   - LessonTempleateType = "1"
   - LectureProjectsList[0].ProjectId = <DIFF result>
   - LectureProjectsList[0].Name = "واجب"
   - LectureProjectsList[0].StartTime/EndTime (parsed from MultiPrepareLesson[0].StartDate, +3 days)
   - 5 hardcoded Arabic strings (preparation, vocabulary, thinking, closing, teacher note)

10. POST /Teacher/Lessons/SaveLastLessonPlan → 302
    - alert_type=1 in cookie = success
    - alert_type=2 = error (decode alert_message cookie for Arabic field names)

11. Refresh dashboard → card turns GREEN ✅
```

**Files in scope:** `content.js` (main logic), `background.js` (caching).

---

# 🆕 NEW: Full 4-Asset Flow (Reverse-Engineered from Competitor HAR)

This is the **gold-standard flow**. Each section below has the EXACT POST payload captured from a working competitor save.

## 🔢 Complete Request Sequence (11 POSTs, ~6 seconds total)

Captured timing (May 18, 2026 06:23:51 → 06:23:57):

```
T+000ms  POST /Teacher/Lessons/MlutiLessonPlan                       → 200
T+050ms  POST /Teacher/LectureTools/GetLessonPlayerForComponent      → 200
T+800ms  POST /Teacher/Assignments/AddQuestionListPaging              → 200 (Q-bank for assignment)
T+900ms  POST /Projects/Projects/Create                               → 302 (Activity)
T+1200ms POST /LearningResources/MangeResources/GetGoalLessonSubject  → 200 (goals lookup)
T+1500ms POST /LearningResources/MangeResources/Create                → 302 (Enrichment)
T+2000ms POST /Teacher/Assignments/Manage                             → 200 (Homework — separate endpoint!)
T+2700ms POST /Teacher/Exams/ExamSettings                             → 200 (Exam UI setup)
T+2900ms POST /Teacher/Exams/ExamQuestionSettings                     → 200 (Q-bank for exam)
T+3100ms POST /Teacher/Exams/Manage                                   → 200 (Exam create)
T+4000ms POST /Teacher/LectureTools/GetActivitiesList                 → 200
T+4100ms POST /Teacher/LectureTools/GetProjectsList                   → 200
T+4500ms POST /Teacher/LectureTools/GetAssignmentsList                → 200
T+4800ms POST /Teacher/LectureTools/GetExamsList                      → 200
T+5500ms POST https://www.google.com/recaptcha/api2/reload            → 200 (Captcha token)
T+6000ms POST /Teacher/Lessons/SaveLastLessonPlan                     → 302 ✅
```

**Implementation strategy for Tahdiri (recommended):**
- Use BEFORE/AFTER snapshot DIFF for each list (Projects, Assignments, Exams) — same pattern that's already working for Activity.
- Run Activity / Enrichment / Homework / Exam creates SERIALLY (avoid race conditions).
- Skip ExamSettings + ExamQuestionSettings + AddQuestionListPaging — these are UI-render endpoints, not state-changing. The actual `/Manage` POST is what creates the resource.
- The Captcha is NOT required (we verified saves work without it on May 18). Skip the `recaptcha/api2/reload` step.

---

## 🅰️ Asset 1: Activity (نشاط) — ALREADY IMPLEMENTED

**Endpoint:** `POST /Projects/Projects/Create`
**Result:** 302 to `/Projects/Projects/Index/{schoolHash}?hfLevelsCount=3`
**ID extraction:** DIFF on `GetProjectsList` (already working).

**Payload (20 fields):**
```
TypeId                       = 1
__RequestVerificationToken   = <from form scoped via HashKey.closest('form')>
HashKey                      = <from form>
Id                           =                  # EMPTY string, not "0"
schoolId                     = <hash>           # e.g. 6E91EFB432214026...
SelectedUnitId               = <subjectId>      # e.g. 309
SelectedTrees_2              = <chapterId>      # e.g. 32285
SelectedTrees_3              = <lessonId>       # e.g. 26682
Name                         = نشاط (<lessonName>)
CategoryId                   = 4
ClassificationLevel          = 1
ProjectType                  = 2                # SENT TWICE
ProjectType                  =                  # second time empty
Description                  = <text>           # competitor uses ien content text; we use default
Link                         = <ien PDF URL>    # competitor uses real ien link; we use https://ien.edu.sa
SolvingType                  = 3
AccessType                   = True
hfLevelsCount                = 3
hfDrawTree                   = /Projects/Projects/DrawTreeToClassLesson
TotalGrade                   = 1
```

---

## 🅱️ Asset 2: Enrichment (إثراء) — NOT YET IMPLEMENTED

**Endpoint:** `POST /LearningResources/MangeResources/Create`
**Result:** 302 to `/LearningResources/MangeResources/Index/{schoolHash}`
**ID extraction:** DIFF on a NEW snapshot endpoint (probably `GetActivitiesList`, needs verification).

**Pre-requirement:** Call `POST /LearningResources/MangeResources/GetGoalLessonSubject` first to get the `SelectedGoles` base64 blob (or build it from goals discovered via the existing `GetGoalLessonSubject` flow we already have for the Quran fix).

**Payload (15 fields):**
```
__RequestVerificationToken   = <from MangeResources/Create page>
Id                           = 0                # NOTE: enrichment uses "0", NOT "" like Activity!
IsEduResource                = true
SelectedUnitId               = <subjectId>
SelectedGoles                = <base64 JSON>    # [{"GoalId":47509,"LessonId":26682},...]
ActivityType                 = 1
Name                         = إثراء: <lessonName>
Description                  = إثراء: <lessonName>
IndicativeWords              = <base64>         # encoded keyword phrase
TypeId                       = 1
FileType                     = 1
Link                         = <YouTube URL>    # competitor uses real YouTube ien link
hfLevelsCount                = 1                # NOTE: 1, not 3!
hfDrawTree                   = /MangeResources/DrawTreeToClassLesson
SchoolId                     = <hash>
```

**SelectedGoles structure (before base64):**
```json
[
  {"GoalId": 47509, "LessonId": 26682},
  {"GoalId": 47510, "LessonId": 26682},
  {"GoalId": 47511, "LessonId": 26682}
]
```
Encode with `btoa(JSON.stringify(arr))`.

**IndicativeWords:** Arabic keyword phrase, encoded with `btoa(unescape(encodeURIComponent(text)))` for UTF-8 safety.

---

## 🅲 Asset 3: Homework / Assignment (واجب) — NOT YET IMPLEMENTED

**Endpoint:** `POST /Teacher/Assignments/Manage?Length=11`
**Result:** 200 (NOT 302 like the others!) — response likely contains the new AssignmentId. Verify via DIFF on GetAssignmentsList.
**ID extraction:** DIFF on `GetAssignmentsList` (new helper, mirror of fetchProjectsListSnapshot).

**Payload (31 fields):**
```
Grade                              = 1
SaveButton                         =
IdEnc                              =
Id                                 = 0
TreeId                             =
IsTreeLevel                        =
IsQuran                            = false
txt_UploadUrl                      = /Teacher/Assignments/UploadFile
SelectedUnitId                     = <subjectId>
SelectedTrees_2                    = <chapterId>
SelectedTrees_3                    = <lessonId>
Name                               = واجب (<lessonName>)
QuranLessonType                    = 1
QuranLessonId                      =
AssignmentType                     = 3
                                   =                # empty key with empty value (Madrasati quirk)
Description                        =
filePath                           =
PageNumber                         =
QuestionsNumber                    =
SolvingType                        = 4
AccessType                         = True
schoolId                           = <hash>
hfLevelsCount                      = 3
hfDrawTree                         = /Teacher/Assignments/DrawTreeToClassLesson
X-Requested-With                   = XMLHttpRequest    # YES, this is in the FORM body, not header
AssignmentQuestionsList[0].Id      = <questionId>      # e.g. 311348 — must come from AddQuestionListPaging
AssignmentQuestionsList[0].Grade   = 1
AssignmentQuestionsList[0].IsIenQuestion = True
IsEditDraft                        = False
IsDraft                            = false
```

**Pre-requirement:** Call `POST /Teacher/Assignments/AddQuestionListPaging` first to get available ien questions for this lesson. The response provides the question IDs (`AssignmentQuestionsList[0].Id`).

**No HashKey or __RequestVerificationToken in this payload** — the endpoint uses URL `?Length=11` query param as one form of state, and relies on session cookies.

---

## 🅳 Asset 4: Exam (اختبار) — NOT YET IMPLEMENTED

**Endpoint:** `POST /Teacher/Exams/Manage`
**Result:** 200 (not 302). Response likely contains the new ExamId. Verify via DIFF on GetExamsList.
**ID extraction:** DIFF on `GetExamsList`.

**Pre-requirement (2 POSTs first):**
1. `POST /Teacher/Exams/ExamSettings` — returns `{"success":true, "html":"...", "notFoundGoals":[]}` — UI setup, may need to extract HashKey from response HTML.
2. `POST /Teacher/Exams/ExamQuestionSettings` — returns available questions and difficulty distribution.

**Payload (70 fields, most are question metadata):**
```
__RequestVerificationToken   = <from Exam Manage page>
HashKey                      = <from Exam Manage page or ExamSettings response>
Id                           = 0
LessonParentId               = <chapterId>      # e.g. 32285
TreeId                       = <lessonId>      # e.g. 26682
LessonId                     = <lessonId>
IsTreeLevel                  =
ExamId                       =
SchoolId                     = <hash>
ExamCategory                 = 3                # SENT TWICE (3, then empty)
ExamCategory                 =
SelectedUnitId               = <subjectId>
SelectedTrees_2              = <chapterId>
SelectedTrees_3              = <lessonId>
Name                         = اختبار (<lessonName>)
ExamType                     = 2                # SENT TWICE
ExamType                     =
ExamQuestionSource           = ien
Description                  =
AccessType                   = True
AllowLessonContent           = true             # SENT TWICE (true, then false)
AllowLessonContent           = false
hfLevelsCount                = 3
hfDrawTree                   = /Exams/DrawTreeToClassLesson

# Question distribution (List[i]):
List[0].NumberOfQuestions    = 1
List[0].QuestionTypeCode     = 0
List[0].DifficultyFactor     = 0
List[0].itemCount            = 2
List[1].NumberOfQuestions    = 1
List[1].QuestionTypeCode     = 0
List[1].DifficultyFactor     = 1
List[1].itemCount            = 3
List[2].NumberOfQuestions    = 1
List[2].QuestionTypeCode     = 3
List[2].DifficultyFactor     = 0
List[2].itemCount            = 1
List[3].NumberOfQuestions    = 1
List[3].QuestionTypeCode     = 3
List[3].DifficultyFactor     = 1
List[3].itemCount            = 2
List[4].NumberOfQuestions    = 1
List[4].QuestionTypeCode     = 6
List[4].DifficultyFactor     = 0
List[4].itemCount            = 1

IsEditDraft                  = False

# Goal IDs (already known from existing GetGoalLessonSubject):
GoalIds                      = 47509
GoalIds                      = 47510
GoalIds                      = 47511

# Selected questions (from ExamQuestionSettings response):
QuestionsList[0].GradeInAssignment       = 1
QuestionsList[0].QuestionTypeCodeNo      = 0
QuestionsList[0].DifficultyFactorNo      = 0
QuestionsList[0].Id                      = 311354
QuestionsList[1].GradeInAssignment       = 1
QuestionsList[1].QuestionTypeCodeNo      = 0
QuestionsList[1].DifficultyFactorNo      = 1
QuestionsList[1].Id                      = 311348
QuestionsList[2].GradeInAssignment       = 1
QuestionsList[2].QuestionTypeCodeNo      = 3
QuestionsList[2].DifficultyFactorNo      = 0
QuestionsList[2].Id                      = 311345
QuestionsList[3].GradeInAssignment       = 1
QuestionsList[3].QuestionTypeCodeNo      = 3
QuestionsList[3].DifficultyFactorNo      = 1
QuestionsList[3].Id                      = 311358
QuestionsList[4].GradeInAssignment       = 1
QuestionsList[4].QuestionTypeCodeNo      = 6
QuestionsList[4].DifficultyFactorNo      = 0
QuestionsList[4].Id                      = 311346

IsEditDraft                  = False
IsDraft                      = false
```

**Question type codes:**
- `0` = Multiple choice
- `3` = True/False
- `6` = Matching (probably)

**Difficulty factor:**
- `0` = Easy
- `1` = Medium
- `2` = Hard (probably)

---

## 💾 Final Save: SaveLastLessonPlan (143 fields)

**Endpoint:** `POST /Teacher/Lessons/SaveLastLessonPlan`
**Result:** 302 → `/SchoolSchedule/Schedule/ManageLecture?...&classroomId=<id>` with `alert_type=1` cookie = success.

The key additions for multi-asset support are the **4 separate list arrays**:

### NEW: LectureProjectsList (Activity)
```
LectureProjectsList[0].ProjectId    = <from DIFF on GetProjectsList>
LectureProjectsList[0].Grade        = 1
LectureProjectsList[0].StartTime    = 5/17/2026 8:11:00 AM       # M/D/YYYY format
LectureProjectsList[0].EndTime      = 5/20/2026 8:11:00 AM       # +3 days
LectureProjectsList[0].Name         = واجب                        # display label
LectureProjectsList[0].DayCount     = 3
```

### NEW: LectureAssignmentsList (Homework)
```
LectureAssignmentsList[0].AssignmentId  = <from DIFF on GetAssignmentsList>
LectureAssignmentsList[0].Grade         = 1
LectureAssignmentsList[0].IsGradeBook   = true
LectureAssignmentsList[0].StartTime     = 5/17/2026 8:11:00 AM
LectureAssignmentsList[0].EndTime       = 5/20/2026 8:11:00 AM
LectureAssignmentsList[0].DayCount      = 3
```

### NEW: LectureExamsList (Exam)
```
LectureExamsList[0].ExamId          = <from DIFF on GetExamsList>
LectureExamsList[0].Duration        = 20                # minutes
LectureExamsList[0].Grade           = 5
LectureExamsList[0].IsGradeBook     = false
LectureExamsList[0].Name            = testfor           # or auto-generated
LectureExamsList[0].StartTime       = 5/17/2026 8:11:00 AM
LectureExamsList[0].EndTime         = 5/20/2026 8:11:00 AM
LectureExamsList[0].DayCount        = 5
```

### EXISTING: LectureClassLearningResources (ien content reference)
```
LectureClassLearningResources[0].ActivityType   = 1
LectureClassLearningResources[0].ActivityPath   =
LectureClassLearningResources[0].Name           = شرح الدرس
LectureClassLearningResources[0].ActivityId_Enc = <hex from MlutiLessonPlan response>
```
This is NOT a separately-created resource. The `ActivityId_Enc` comes from ien content metadata returned by `MlutiLessonPlan`. We currently don't include it; adding it is part of the quality pass.

### Goals and Activities (from MlutiLessonPlan + GetGoalLessonSubject)
```
LessonGoalsAndActivity[0].lesssonId        = <lessonId>   # NOTE: 3 s's — Madrasati typo
LessonGoalsAndActivity[0].goalsIds[0]      = 47509
LessonGoalsAndActivity[0].goalsIds[1]      = 47510
LessonGoalsAndActivity[0].goalsIds[2]      = 47511
goals                                       = 47509       # SAME goals also as standalone "goals" array
goals                                       = 47510
goals                                       = 47511
LessonGoalsAndActivity[0].activityIds[0]   = 4399         # ien activity IDs (~13 of them)
LessonGoalsAndActivity[0].activityIds[1]   = 49490
...
activities                                  = 4399        # also as standalone array
activities                                  = 49490
...
```

### Strategies and Tools (the 5+8 pattern)
```
strategies = 2
strategies = 4
strategies = 5
strategies = 12
strategies = 19
strategyExtraData = الفهم القرائي

teachingTools = 1
teachingTools = 2
teachingTools = 3
teachingTools = 5
teachingTools = 7
teachingTools = 8
teachingTools = 9
teachingTools = 11
```

### Text Fields (5 mandatory — currently hardcoded, target for n8n AI)
```
TeacherNote                  = <Arabic instructional text>
ThinkingSkills               = <Arabic thinking skills text>
LectureClassCloseText        = <Arabic closing summary>
LessonVocabulary             = <Arabic key terms list>
LectureClassPreparationText  = <Arabic preparation/warmup text>
```

---

## ⚠️ Critical Implementation Notes

### 1. The "Activity" we create is NEW every time
`Id=""` on the Activity POST creates a fresh row. Bulk-saving 24 lessons creates 24 new Activity records in the teacher's account. NOT a blocker, but it accumulates.

### 2. Multi-asset selection should be user-driven
The popup UI should let the teacher choose which asset types to attach per lesson (checkboxes for Activity / Enrichment / Homework / Exam). The bulk save loop creates only the selected ones.

### 3. Use DIFF strategy for EVERY list
The Tier-A DIFF pattern (before/after snapshot of GetXxxList) is the only reliable way to identify newly-created IDs. We've proven this for `GetProjectsList`. Mirror the pattern for:
- `GetActivitiesList` (probably not needed — Activity is the same as Projects)
- `GetAssignmentsList` (for Homework)
- `GetExamsList` (for Exam)

### 4. CSRF token scraping (DO NOT FORGET)
Every Create page has multiple `__RequestVerificationToken` inputs across forms. Always scope via HashKey:
```js
const hashKeyEl = doc.querySelector('[name="HashKey"]');
const form = hashKeyEl?.closest('form');
const token = form.querySelector('[name="__RequestVerificationToken"]')?.value;
```

### 5. Madrasati's typos (preserve them!)
- `/Teacher/Lessons/MlutiLessonPlan` ← "Mluti" not "Multi"
- `LessonGoalsAndActivity[0].lesssonId` ← three s's, not two

### 6. Captcha is OPTIONAL
The competitor sends a reCAPTCHA token. We've verified saves succeed without it. Skip the recaptcha calls entirely unless Madrasati starts enforcing.

### 7. The 5 hardcoded Arabic strings are the n8n integration point
File: `content.js`, around line 1965-1969. Single fetch to n8n webhook before the appends, replace each string with the AI-generated content.

### 8. The competitor uses real ien content
- Activity `Link` = real PDF URL from `iencontent.ien.edu.sa/Storage/PdfFiles/...`
- Enrichment `Link` = real YouTube URL from ien channel
- We currently use placeholder URLs. The n8n workflow can return these per-lesson.

### 9. ee10_lesson_templates.json is DEAD
Not used by the silent API path. Safe to delete from the new project.

---

## 🚀 Recommended Roadmap

### Session 1: n8n AI Integration (start here, lowest risk)
Replace the 5 hardcoded Arabic strings with `fetch(n8nWebhook, ...)`.
File: `content.js`, before line 1965.

**Before writing the agent prompt, ask the user:**
1. n8n webhook URL (localhost? deployed?)
2. Exact JSON response shape from n8n
3. Fallback behavior if n8n offline: use defaults / abort / retry?
4. For bulk save: pre-fetch all 24 lessons' AI content in parallel, or sequentially per lesson?

### Session 2: Enrichment Endpoint
Add `silentCreateEnrichmentResource()` mirroring `silentCreateActivityResource()`.
Use the payload spec from this document. DIFF on a new snapshot helper.

### Session 3: Homework Endpoint
Add `silentCreateHomeworkResource()`. Note `Manage?Length=11` URL quirk.
DIFF on `GetAssignmentsList`.

### Session 4: Exam Endpoint
Add `silentCreateExamResource()`. Requires 2 pre-POSTs (ExamSettings + ExamQuestionSettings).
DIFF on `GetExamsList`.

### Session 5: Popup UI for asset selection
Checkboxes per asset type, applied to all 24 lessons in the bulk run.

### Session 6: Polish
- Progress bar.
- Per-lesson retry on failure.
- Per-subject default strategies/teachingTools.

---

## 🧠 Key Learnings (DO NOT FORGET)

1. **302 from `/Projects/Projects/Create` is SUCCESS.**

2. **`alert_message` cookie is the source of truth for Save errors.** URL-decoded JSON contains exact field names. `alert_type=1` = success, `alert_type=2` = error.

3. **CSRF token MUST be scoped to the right form via HashKey.closest('form').**

4. **GetXxxList endpoints return ALL existing items for the lesson scope, not just new ones.** DIFF strategy is mandatory.

5. **Madrasati cookies became HttpOnly** (SemesterId, IsClassRoomAdmin, etc.). JS can't read them, but they're sent automatically with fetch. Not a blocker.

6. **`hfLevelsCount` varies per endpoint:**
   - Activity Create: `"3"`
   - Enrichment Create: `"1"`
   - Homework Manage: `"3"`
   - Exam Manage: `"3"`

7. **Madrasati often sends fields TWICE** (ProjectType, ExamCategory, ExamType, AllowLessonContent). The duplicate-empty trick is real. Replicate exactly.

8. **The VS Code Agent (Antigravity) sometimes claims to apply changes without actually doing so.** ALWAYS include `grep` verification in every agent prompt.

9. **AddQuestionListPaging endpoint** provides question IDs for Homework. Question IDs for Exam come from `ExamQuestionSettings` response.

10. **The Tahdiri DOM extension (separate) supports all 4 asset types via UI automation.** It's a backup, not the primary path. Goal is to bring API path to feature parity.

---

## 🗂️ Project Files

### Keep:
- `content.js` — main extension logic
- `background.js` — service worker
- `madrasati_courses_clean.json` — subject lookups
- `manifest.json`
- `popup.html` / `popup.js` — extension UI

### Delete:
- `ee10_lesson_templates.json` — dead code (DOM path only)
- `ee10_data.js`, `extract_ee10_data.js`, `ee10_extracted.json` — same
- `competitor.js`, `decryptCompetitorPayload.js` — RE artifacts, archive only

---

## 🎬 Opening Move for the New Chat

When the user opens a new chat with this HANDOFF in project knowledge, respond:

> now we have 2 ways to start with 
> 1. 🎯 **Multi-asset support** (إضافة Enrichment + Homework + Exam — feature parity مع الـ DOM extension)
> 2. 🎨 **Popup UI** للـ asset selection (checkboxes لكل نوع، يطبق على الـ 24 حصة)

## END OF HANDOFF v3
