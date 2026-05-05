Tahdiri Extension — Quick Smart Prep Implementation Plan

Read this entire document before writing any code.
This is a 3-phase plan: (1) Read & Understand, (2) Plan, (3) Implement.
Stop after each phase and wait for explicit user approval.


1. Project Context
This is a Chrome extension that automates lesson preparation on the Saudi
educational platform "Madrasati" (schools.madrasati.sa).
Files in this directory:

content.js — the bundled content script Chrome loads. THIS IS THE FILE YOU EDIT.
competitor.js — decompiled & obfuscated competitor extension. Reference only. DO NOT modify.
background.js — service worker
manifest.json — extension manifest
popup.html / popup.js — extension popup
options.html / options.js — extension options page

There is no build step. content.js is the file Chrome loads directly.

2. The Problem
The current AI flow uses an n8n webhook → OpenRouter → GPT-4o-mini to fill the
lesson plan form. The AI returns generic, repetitive text that does not mention
the actual lesson name. Same text often gets duplicated across multiple form
fields because fillLessonFields only alternates between goals and closure.

3. Critical Discovery
We confirmed via live testing in the Madrasati console that two internal APIs
on the platform return all the data we need without any AI:
API 1: Lesson Goals
POST /LearningResources/MangeResources/GetGoalLessonSubject
Headers:
  Content-Type: application/x-www-form-urlencoded
  requestverificationtoken: <CSRF token from [name="__RequestVerificationToken"]>
Body: subjectId=<SelectedUnitId.value>
Credentials: same-origin
Returns a JSON array of all goals for the subject. Filter by LessonId == SelectedTrees_4.value || SelectedTrees_3.value.
Each goal object has this shape:
json{
  "LessonId": 712,
  "LessonTitle": "المقارنة والتصنيف-التصنيف وفق خاصية واحدة",
  "TreeId": 278,
  "LessonIdCode": "L2",
  "GoalId": 4068,
  "GoalTitle": "تصنيف الأشياء وفق خاصية واحدة",
  "SelectedIndex": null
}
API 2: Student Books
GET /Teacher/Subjects/GetStudentBooks?Id=<SelectedUnitId.value>
Credentials: same-origin
Returns HTML. Parse it with DOMParser. Extract:

.project-title elements → book names
.project-actions a elements → book links

Important note about LessonId:

For lessons in deep curricula (e.g. high school): use SelectedTrees_4.value
For shallower curricula (e.g. early primary): use SelectedTrees_3.value (because SelectedTrees_4 may be undefined)
The right approach: SelectedTrees_4?.value || SelectedTrees_3?.value

Edge case: lessons with only ONE goal
Some lessons (especially in early grades) return only one goal. In that
case, we cannot use "first goal = preparation, last goal = closure" because
they are the same. We need fallback templated text for those cases.

4. The New Strategy
We are adding a third button to the existing UI panel called "تحضير سريع"
(Quick Smart Prep). It uses the internal Madrasati APIs above instead of AI.
The existing two buttons stay exactly as they are:

"تحضير الدرس تلقائياً" (the original automated flow)
"🤖 تحضير الدرس تلقائياً" (the AI flow via n8n webhook)
"إعداد المسار فقط" (Step 1 only)

The new button (third one):

"⚡ تحضير سريع" (uses internal APIs, no AI, no network call to n8n)


5. Detailed Behavior of the New Button
When the user clicks "⚡ تحضير سريع":
Step A: Run the existing Step 1 flow
Reuse runStep1Flow() (already in content.js). It selects the path
dropdowns, picks the right radio buttons, fills scheduling fields, and clicks
"التالي" to navigate to Page 2.
Step B: On Page 2, fetch goals + books from internal APIs
Add a new function fetchQuickPrepData(subjectId, lessonId) that:

POSTs to /LearningResources/MangeResources/GetGoalLessonSubject with subjectId
Filters goals by LessonId == lessonId
GETs /Teacher/Subjects/GetStudentBooks?Id=<subjectId>
Parses the books HTML
Returns { goals: [...], books: [{ name, link }, ...] }

This function must:

Use credentials: 'same-origin'
Read CSRF token from [name="__RequestVerificationToken"]
Wrap the whole thing in try/catch and return null on failure
Use the existing log() helper for diagnostics

Step C: Build a structured lesson plan from the API data
Add a function buildLessonPlanFromGoals(goals, books, lessonName, tree2Value) that returns:
js{
  // Each field gets a UNIQUE, lesson-specific text
  LectureClassPreparationText: "<text>",
  LessonVocabulary: "<text>",
  ThinkingSkills: "<text>",
  LectureClassCloseText: "<text>",
  TeacherNote: "<text>",
  goalIds: [4068, ...],  // GoalIds to check in the goals checkbox group
  einLink: "https://ibs.ien.edu.sa/#/planslessons/<tree2Value>",
  homework: "<text>",
}
Logic for each field:
LectureClassPreparationText (التمهيد):
نراجع مع الطلاب المعارف السابقة، ثم نمهد لدرس "<lessonName>" 
من خلال طرح موقف يومي مرتبط بـ <first goal title>.
LessonVocabulary (المفردات):
مفردات الدرس: راجع الكتاب الإلكتروني درس (<lessonName>).
تجد روابط الكتب الإلكترونية في قسم الإثراء.
Always this exact templated text.
ThinkingSkills (مهارات التفكير):
التركيز - التذكر - التحليل - التركيب - الربط - الملاحظة - الاستنتاج - التفكير الإبداعي - العصف الذهني
Always this exact fixed text. (This is what the competitor uses.)
LectureClassCloseText (الغلق):
نلخص مع الطلاب أهم ما تعلموه في درس "<lessonName>"، ونتأكد من تحقق الهدف:
<last goal title>.
TeacherNote (تعليمات المعلم):
بإمكانك الاطلاع على شرح هذا الدرس على منصة عين وحل بعض الأسئلة ومشاهدة المزيد من الإثراءات من خلال:
أولاً: تسجيل الدخول لمنصة عين بحسابك.
ثانياً: فتح رابط هذا الدرس وهو:
<einLink>
homework (الواجب):
حل تمارين درس "<lessonName>" في كتاب التمارين، ومراجعة هدف: <first goal title>.
Edge case: ONE goal only
If goals.length === 1:

Use the single goal text in BOTH LectureClassPreparationText AND LectureClassCloseText
BUT phrase them differently (preparation = "نمهد لـ X", closure = "تأكدنا من تحقق X")

Edge case: ZERO goals
If goals.length === 0:

Use lesson-name-only templates for all fields
Skip the goalIds array (return empty)
Continue with books and other fields normally

Step D: Apply the structured plan to the form
Reuse the existing setNativeValue() helper to fill each field by ID:

#LectureClassPreparationText
#LessonVocabulary
#ThinkingSkills
#LectureClassCloseText
#TeacherNote

For the goals checkboxes:

Find checkboxes with name="goals"
Match each checkbox by its value attribute against goalIds
Use ensureCheckboxChecked() (already exists in content.js)

For homework: find a homework field heuristically (look for input/textarea
with id/name/label containing "واجب" or "homework").
Step E: Reuse the existing enrichment flow
Call the existing ensureLessonRequirementSatisfied() function to add the
mandatory enrichment/assignment/exam (the platform requires at least one).
Step F: Save
Call the existing save flow (find the save button and click it). Reuse the
existing findFinalSaveButton2() and waitForSaveCompletion() functions.

6. UI Changes
In injectControlPanel(), add a third button between the AI button and the
"إعداد المسار فقط" button:
jsconst quickBtn = document.createElement("button");
quickBtn.id = UI_IDS.quickBtn;  // add UI_IDS.quickBtn = "tahdiri-quick-btn"
quickBtn.type = "button";
applyButtonStyle(quickBtn, "linear-gradient(135deg, #1a9448 0%, #0f7a36 100%)");
quickBtn.innerHTML = `<span class="tahdiri-btn-icon">⚡</span>
  <span class="tahdiri-btn-label">تحضير سريع</span>`;
quickBtn.addEventListener("click", async () => {
  await controlPanelHandlers.startQuick();
});
Add a tooltip below the button explaining: "أسرع تحضير ممكن - يستخدم بيانات منصة مدرستي مباشرة".
Don't forget to also update:

getQuickButton() getter
setButtonsDisabled() to also disable/enable the quick button
setControlPanelHandlers() to accept a startQuick handler
AutomationController.startQuick() method
The boot() function's resume logic if needed


7. AutomationController Changes
Add a new method AutomationController.startQuick() that:

Sets this.mode = "quick"
Sets state to STEP1
Disables buttons
Calls void this.run() (which already handles STEP1 → STEP2 transition)

In AutomationController.run(), when this.state === FLOW_STATES.STEP2 and
this.mode === "quick":

Skip the AI fetch
Skip the call to aiLessonData storage
Call the new runQuickPrepStep2Flow() instead of runStep2Flow()

runQuickPrepStep2Flow() is a NEW function that:

Waits for textareas to render (use existing waitForElement)
Calls fetchQuickPrepData(subjectId, lessonId)
Calls buildLessonPlanFromGoals(...)
Fills fields using setNativeValue directly (NOT via fillLessonFields because that has its own AI logic)
Checks goals checkboxes
Calls ensureLessonRequirementSatisfied()
Clicks save button


8. Hard Rules

DO NOT edit any file other than content.js unless explicitly asked
DO NOT delete or break the existing AI flow or the existing automated flow
DO NOT change manifest.json permissions without asking the user first
DO NOT rename existing functions or variables
DO preserve all existing code style (var/let/const, jQuery-style etc.)
DO add Arabic UI strings, keep code comments in English
DO use the existing helpers: log, getLocal, setLocal, setNativeValue, ensureCheckboxChecked, findPreferredElement, waitForElement, triggerEvents, sleep, buildResult
DO keep all fetch() calls with credentials: 'same-origin'
DO wrap every API call in try/catch — never let a network error crash the flow
DO test syntax after every change with node -c content.js (it's a regular JS file, Node can parse it)


9. Phase 1 — Read & Understand (DO THIS FIRST, NO CODE)

Read content.js end to end. It is a large IIFE-wrapped file (~3000 lines).
Identify and tell me:

Where injectControlPanel() is defined and where the buttons are added
Where AutomationController object is defined (its start, startAI, run methods)
Where runStep1Flow() and runStep2Flow() are defined
Where fillLessonFields() and markLessonCheckboxes() are defined
Where ensureLessonRequirementSatisfied() is defined
Where setNativeValue(), ensureCheckboxChecked(), findFinalSaveButton2() are defined
The current shape of aiLessonData stored in chrome.storage.local


Skim competitor.js ONLY to verify the strategy described in section 3.
Do not waste time fully deobfuscating.

Then STOP. Reply to me with:

A summary in Arabic explaining what you read
A list of the line ranges where each key function lives
Any concerns or questions before we plan the implementation

Wait for my "approved" or feedback before moving to Phase 2.

10. Phase 2 — Detailed Implementation Plan (AFTER Phase 1 approval)
When I approve Phase 1, propose a concrete implementation plan with:

New functions to add (signatures + 1-line description each):

fetchQuickPrepData(subjectId, lessonId)
buildLessonPlanFromGoals(goals, books, lessonName, tree2Value)
applyQuickPrepToForm(plan)
runQuickPrepStep2Flow()
getQuickButton() getter


Existing functions to modify (function name + what changes):

injectControlPanel() — add third button
setButtonsDisabled() — handle new button
setControlPanelHandlers() — accept startQuick handler
AutomationController.startQuick() — new method
AutomationController.run() — branch on mode === "quick"
boot() — handle resume for the new mode


Constants to add:

UI_IDS.quickBtn = "tahdiri-quick-btn"
FLOW_MODES enum (if not already there)


Approximate insertion points in content.js (after which existing function each new one goes)

Then STOP. Wait for my "approved" or feedback before moving to Phase 3.

11. Phase 3 — Implement Step by Step (AFTER Phase 2 approval)
Implement in this order. After EACH step:

Run node --check content.js to verify syntax
Show me a git diff summary
Tell me what I should manually test in Chrome
Wait for my approval before the next step

Step order:

Add new constants (UI_IDS.quickBtn)
Add fetchQuickPrepData() function
Add buildLessonPlanFromGoals() function (this is pure logic, easy to verify)
Add applyQuickPrepToForm() function
Add runQuickPrepStep2Flow() function
Modify injectControlPanel() to add the new button
Modify setButtonsDisabled(), setControlPanelHandlers(), getters
Add AutomationController.startQuick() method
Modify AutomationController.run() to branch on mode === "quick"
Modify boot() to handle resume for quick mode
Final review pass: re-read the diff and look for any unintended side effects


12. Acceptance Criteria

 Extension loads in Chrome with no console errors
 All 3 existing buttons still work exactly as before
 New "⚡ تحضير سريع" button appears in the control panel
 Clicking it: progresses through Step 1 → Step 2 automatically
 On Step 2, the form fields are filled with lesson-specific text containing the actual lesson name
 At least one enrichment/assignment is added so the platform accepts the save
 Save completes successfully, no validation errors
 No syntax errors anywhere in content.js
 No console.error lines added (use the existing log() helper)


13. Test Subject
When the user is ready to test, the test lesson is:

Subject: الرياضيات (Math), Grade 1
Subject ID: 277
Tree2 (Unit) ID: 278 → "المقارنة والتصنيف"
Tree3 (Lesson) ID: 712 → "التصنيف وفق خاصية واحدة"
Goal: GoalId 4068 → "تصنيف الأشياء وفق خاصية واحدة" (only 1 goal — edge case!)

This is a single-goal lesson, so it will exercise the edge case in
buildLessonPlanFromGoals. Make sure the preparation and closure texts
are different even when there is only one goal.

Now begin Phase 1. Read the files and report back to me.ShareContentScreen Recording 2026-05-04 at 4.51.27 PM.mp4mp4competitor.jsjs

const COMPETITOR_PREP_TEXTS = [
  "تحليل المعلومات المقدمة واستنتاج الافكار الرئيسية.",
  "تنمية القدرة على التواصل بفعالية حول موضوع الدرس.",
  "الربط بين المعرفة السابقة والمفاهيم الجديدة المكتسبة.",
  "التقييم الذاتي للفهم الشخصي لموضوع الدرس واكتشاف أي نقاط ضعف."
];

const COMPETITOR_STRATEGIEpasted