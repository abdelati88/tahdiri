# Tahdiri Extension — Headless API-Driven Strategy (v3)

## 1. Project Context & Evolution
We have moved away from the "Parasite Strategy" (fetching from competitor APIs on the fly) and the "UI Automation" (filling DOM elements). 
We are now building a **Headless API-Driven Extension** using our own scraped and cleansed databases.

## 2. Core Databases (Phase 1 - DONE)
* `madrasati_courses_clean.json`: Contains 162 active subjects and their full lesson trees (SubjectId, ChapterId, LessonId).
* `ee10_lesson_templates.json`: Contains 87 AI-cleansed, professional Arabic lesson prep templates (Strategies, Activities, Objectives, etc.).
* `save_lesson_payload.md`: Documented the hidden `SaveLastLessonPlan` API request.

## 3. Implementation Plan

### Phase 2: Extension Architecture & State Management (Current)
* Setup `background.js` to load the JSON databases into memory efficiently.
* Establish message passing between `content.js` and `background.js` for rapid data retrieval.

### Phase 3: Dashboard UI Integration
* **Keep:** The beautiful UI from the old `content.js` (`injectDashboardPanel`, `createDashboardSelectDropdown`).
* **Replace:** The old HTML-scraping logic (`fetchLessonTreeOptions`). The dropdowns will now populate instantly from our local `madrasati_courses_clean.json`.

### Phase 4: Headless API Execution (The Magic)
* Intercept the "حفظ وبدء التحضير" button click.
* For each selected lesson, dynamically construct the `FormData` using:
  - Security Tokens (`__RequestVerificationToken`, `Data`).
  - Lesson IDs from our UI selection.
  - Random educational templates from `ee10_lesson_templates.json`.
* Execute silent `fetch` POST requests to `/Teacher/Lessons/SaveLastLessonPlan`.
* Display success UI alerts without leaving the timetable page.

## Completed Changes (May 9-10, 2026)

1. Removed `hasAnchor` branch — all cards route to `silentPrepareLesson`
2. `treeSubjectId = frozenIds[0]` from `treeValue` used for Activity POST
3. `TimeTableId` = numeric `lectureId` extracted from ManageLecture URL regex
4. `classroomId` extracted from ManageLecture URL and set on SaveLastLessonPlan form
5. `hfLevelsCount` hardcoded to "3"
6. Activity POST executes before ManageLecture fetch (to avoid HashKey invalidation)
7. Dashboard CSRF fallback when ManageLecture redirects
8. HashKey + CSRF always from same `/Projects/Projects/Create` page render
9. `SelectedSubjectId` removed from Activity POST payload
10. `iframePrepareLesson` call site removed from `handleDashboardSave`

## Current Blocker:
- Activity POST to `/Projects/Projects/Create` returns 302 → `/Projects/Index`
- All fields confirmed correct via Network tab inspection
- Server silently rejects — root cause not yet identified