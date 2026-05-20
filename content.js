
(() => {
  // --- حماية: منع الإضافة من العمل داخل إطارات عشوائية ---
  if (window !== window.top) {
    if (!window.location.search.includes('tahdiri_iframe') && !window.name.includes('tahdiri_iframe')) {
      return; // not our subframe — get out
    }
  }





  function getSubjectIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('courseId')) return urlParams.get('courseId');
    if (urlParams.has('CourseId')) return urlParams.get('CourseId');
    return null;
  }
  // --------------------------------------------------------
  const COMPETITOR_PREP_TEXTS = [
    "تحليل المعلومات المقدمة واستنتاج الافكار الرئيسية.",
    "تنمية القدرة على التواصل بفعالية حول موضوع الدرس.",
    "الربط بين المعرفة السابقة والمفاهيم الجديدة المكتسبة.",
    "التقييم الذاتي للفهم الشخصي لموضوع الدرس واكتشاف أي نقاط ضعف."
  ];

  const COMPETITOR_STRATEGIES_TEXTS = [
    "مناقشة الافكار الرئيسية المتعلقة بـ (اسم الدرس هنا).",
    "تطبيق الامثلة العملية المرتبطة بـ (اسم الدرس هنا).",
    "توجيه الاسئلة للحصول على توضيحات حول (اسم الدرس هنا).",
    "تحفيز التفكير النقدي عبر تحليل جوانب مختلفة من (اسم الدرس هنا).",
    "توجيه الطالب لاستكشاف الفيديوهات التعليمية المتعلقة بـ (اسم الدرس هنا)."
  ];

  // دالة المحاكاة لاختيار نص عشوائي زي المنافس
  function getCompetitorText(type, lessonName) {
    let arrayToUse = type === 'strategies' ? COMPETITOR_STRATEGIES_TEXTS : COMPETITOR_PREP_TEXTS;
    let randomIndex = Math.floor(Math.random() * arrayToUse.length);
    let selectedText = arrayToUse[randomIndex];

    // استبدال القالب باسم الدرس الحقيقي زي ما بيعملوا
    return selectedText.replace(/\(اسم الدرس هنا\)/g, lessonName || "الدرس الحالي");
  }
  /*
  
   * content.js is generated from src/content/.
   * Run npm run build before loading or packaging the extension.
   * * * */
  (() => {
    // src/content/constants.js
    var CONFIG = globalThis.TAHDIRI_CONFIG || {};
    var STORAGE_KEYS = CONFIG.STORAGE_KEYS || {};
    var SETTINGS_DEFAULTS = CONFIG.SETTINGS_DEFAULTS || {};
    var AUTOMATION_STATE_KEY = STORAGE_KEYS.AUTOMATION_STATE || "automationState";
    var SAVE_SUBMITTED_AT_KEY = "automationSaveSubmittedAt";
    var AI_LESSON_DATA_KEY = "aiLessonData";
    var AUTOMATION_MODE_KEY = "automationMode";
    var N8N_AI_WEBHOOK_URL = "https://n8n.qraura.shop/webhook/mo3een-ai-generator2";
    var N8N_AI_API_KEY = "sk-mo3een-super-secret-2026";
    var ACTION_LOCK_PREFIX = "tahdiriActionLock";
    var STEP1_NEXT_LOCK_TTL_MS = 9e4;
    var FINAL_SAVE_LOCK_TTL_MS = 12e4;
    var DEFAULT_LESSON_TEXT = "\u062A\u0645 \u0627\u0644\u0625\u0639\u062F\u0627\u062F \u0648\u0641\u0642 \u0645\u0646\u0627\u0647\u062C \u0648\u0632\u0627\u0631\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645";
    var UI_IDS = Object.freeze({
      container: "tahdiri-container",
      primary: "tahdiri-primary-btn",
      aiBtn: "tahdiri-ai-btn",
      quickBtn: "tahdiri-quick-btn",
      advanced: "tahdiri-advanced-btn",
      status: "tahdiri-status"
    });
    var FLOW_STATES = Object.freeze({
      IDLE: "IDLE",
      STEP1: "STEP1",
      STEP2: "STEP2",
      DONE: "DONE",
      ERROR: "ERROR",
      DASHBOARD: "DASHBOARD"
    });
    var STEP1_SELECT_IDS = [
      "SelectedUnitId",
      "SelectedTrees_2",
      "SelectedTrees_3",
      "SelectedTrees_4",
      "SelectedTrees_5",
      "SelectedTrees_6"
    ];
    var DASHBOARD_SELECTIONS_KEY = STORAGE_KEYS.DASHBOARD_SELECTIONS || "dashboardSelections";
    var TARGET_RADIOS = ["\u062F\u0631\u0633", "\u0625\u0646\u0634\u0627\u0621 \u062C\u062F\u064A\u062F"];
    var SAVE_LATER_PATTERN = /IsSaveLater|save later/i;
    var LESSON_FORM_SELECTOR = 'textarea, [contenteditable="true"], .submit-form-btn, #sub, a[href="#finish"]';
    var REQUIRED_LESSON_CHECKBOX_GROUPS = [
      'input[name="goals"]',
      'input[name="activities"]',
      'input[name="strategies"]',
      'input[name="teachingTools"]'
    ];
    var EXPLICIT_LESSON_FIELD_VALUES = Object.freeze({
      LectureClassPreparationText: "\u062A\u0645\u0647\u064A\u062F \u0645\u0646\u0627\u0633\u0628 \u0644\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062F\u0631\u0633 \u0648\u0631\u0628\u0637\u0647 \u0628\u0627\u0644\u062E\u0628\u0631\u0627\u062A \u0627\u0644\u0633\u0627\u0628\u0642\u0629.",
      LessonVocabulary: "\u0627\u0644\u0645\u0641\u0631\u062F\u0627\u062A \u0627\u0644\u0631\u0626\u064A\u0633\u0629 \u0627\u0644\u0645\u0631\u062A\u0628\u0637\u0629 \u0628\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062F\u0631\u0633.",
      ThinkingSkills: "\u0627\u0644\u0645\u0642\u0627\u0631\u0646\u0629 \u0648\u0627\u0644\u0645\u0644\u0627\u062D\u0638\u0629 \u0648\u062A\u0646\u0638\u064A\u0645 \u0627\u0644\u0645\u0639\u0644\u0648\u0645\u0627\u062A \u0648\u062D\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0627\u062A.",
      LectureClassCloseText: "\u062A\u0644\u062E\u064A\u0635 \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645 \u0627\u0644\u0631\u0626\u064A\u0633\u0629 \u0648\u0645\u0631\u0627\u062C\u0639\u0629 \u0633\u0631\u064A\u0639\u0629 \u0644\u0645\u0627 \u062A\u0645 \u062A\u0639\u0644\u0645\u0647.",
      TeacherNote: "\u0642\u0631\u0627\u0621\u0629 \u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0628\u0639\u0646\u0627\u064A\u0629 \u0648\u0627\u0644\u0627\u0644\u062A\u0632\u0627\u0645 \u0628\u062A\u0646\u0641\u064A\u0630 \u0627\u0644\u0645\u0637\u0644\u0648\u0628 \u062F\u0627\u062E\u0644 \u0627\u0644\u062D\u0635\u0629."
    });
    var LESSON_RESOURCE_ERROR_PATTERNS = [
      "\u0644\u0645 \u064A\u0643\u062A\u0645\u0644 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062F\u0631\u0633",
      "\u064A\u062A\u0639\u064A\u0646 \u0639\u0644\u064A\u0643 \u0625\u0636\u0627\u0641\u0629 \u0627\u062B\u0631\u0627\u0621 \u0623\u0648 \u0648\u0627\u062C\u0628 \u0623\u0648 \u0627\u062E\u062A\u0628\u0627\u0631 \u0623\u0648 \u0646\u0634\u0627\u0637 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644",
      "\u064A\u062A\u0639\u064A\u0646 \u0639\u0644\u064A\u0643 \u0625\u0636\u0627\u0641\u0629 \u0625\u062B\u0631\u0627\u0621 \u0623\u0648 \u0648\u0627\u062C\u0628 \u0623\u0648 \u0627\u062E\u062A\u0628\u0627\u0631 \u0623\u0648 \u0646\u0634\u0627\u0637 \u0648\u0627\u062D\u062F \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644"
    ];
    var SAVE_VALIDATION_ERROR_PATTERNS = [
      "\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u062D\u0641\u0638",
      "7 \u0623\u064A\u0627\u0645 \u0645\u0633\u062A\u0642\u0628\u0644\u064A\u0629",
      "\u0633\u0628\u0639\u0629 \u0623\u064A\u0627\u0645 \u0645\u0633\u062A\u0642\u0628\u0644\u064A\u0629",
      "\u064A\u0645\u0643\u0646\u0643 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062D\u0635\u0635 \u0625\u0644\u0649 7 \u0623\u064A\u0627\u0645",
      "\u064A\u0645\u0643\u0646\u0643 \u0625\u0639\u062F\u062F \u0627\u0644\u062D\u0635\u0635 \u0625\u0644\u0649 7 \u0623\u064A\u0627\u0645"
    ];
    var DUPLICATE_LESSON_ERROR_PATTERNS = [
      "\u064A\u0648\u062C\u062F \u0644\u062F\u064A\u0643 \u062F\u0631\u0633 \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627",
      "\u064A\u0648\u062C\u062F \u0644\u062F\u064A\u0643 \u062F\u0631\u0633 \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627\u064B",
      "\u0646\u0641\u0633 \u0627\u0644\u0648\u0642\u062A \u062F\u0627\u062E\u0644 \u0627\u0644\u062C\u062F\u0648\u0644 \u0627\u0644\u062F\u0631\u0627\u0633\u064A",
      "\u062F\u0631\u0633 \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627",
      "\u062F\u0631\u0633 \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u0627\u064B"
    ];
    var DEFAULT_SAVE_SELECTOR = '.submit-form-btn, #sub, a[href="#finish"]';

    // src/content/logger.js
    var DEBUG = false;
    function log(...args) {
      if (DEBUG) {
        console.debug("[\u062A\u062D\u0636\u064A\u0631\u064A]", ...args);
      }
    }

    // src/content/runtime-storage.js
    function isContextAlive() {
      try {
        return Boolean(chrome.runtime?.id);
      } catch {
        return false;
      }
    }
    function getLocal(keys) {
      if (!isContextAlive()) return Promise.resolve({});
      return new Promise((resolve) => chrome.storage.local.get(keys, resolve));
    }
    function setLocal(data) {
      if (!isContextAlive()) return Promise.resolve();
      return new Promise((resolve) => chrome.storage.local.set(data, resolve));
    }
    function removeLocal(keys) {
      if (!isContextAlive()) return Promise.resolve();
      return new Promise((resolve) => chrome.storage.local.remove(keys, resolve));
    }
    function getSync(keys) {
      if (!isContextAlive()) return Promise.resolve({});
      return new Promise((resolve) => chrome.storage.sync.get(keys, resolve));
    }
    function sendRuntimeMessage(message) {
      return new Promise((resolve) => {
        if (!isContextAlive()) {
          resolve(null);
          return;
        }
        try {
          chrome.runtime.sendMessage(message, (response) => {
            void chrome.runtime.lastError;
            resolve(response);
          });
        } catch (error) {
          log("sendRuntimeMessage error:", error);
          resolve(null);
        }
      });
    }
    async function sendAutomationStatus(status, extra) {
      await sendRuntimeMessage({
        type: "AUTOMATION_STATUS",
        status,
        ...extra || {}
      });
    }

    // ── Headless API: local data fetchers (Background memory cache) ─────────────
    async function getLocalSubjectData(subjectId, subjectName) {
      return new Promise((resolve) => {
        chrome.runtime.sendMessage(
          { action: 'GET_LESSON_DATA', subjectId: String(subjectId), subjectName: subjectName },
          (response) => { resolve(response && response.ok ? response.data : null); }
        );
      });
    }

    // ── Live fallback: fetch lessons directly from Madrasati's GetGoalLessonSubject endpoint
    // when the local JSON cache has no entry for this subjectId (e.g., Quran subjects).
    // Endpoint confirmed via network capture (POST, x-www-form-urlencoded, single field subjectId).
    // Returns an array shaped like local data items: [{ id, info: { compositeId, chapterId, name } }, ...]
    // or null on failure.
    async function fetchGoalLessonSubjectLive(subjectId) {
      if (!subjectId) return null;
      try {
        const url = window.location.origin + '/LearningResources/MangeResources/GetGoalLessonSubject';
        const body = 'subjectId=' + encodeURIComponent(String(subjectId));
        const res = await fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: body
        });
        if (!res.ok) {
          console.warn('[TAHDIRI LIVE] GetGoalLessonSubject HTTP', res.status, 'for subjectId=', subjectId);
          return null;
        }
        const data = await res.json();
        if (!Array.isArray(data) || data.length === 0) {
          console.warn('[TAHDIRI LIVE] GetGoalLessonSubject returned empty/non-array for subjectId=', subjectId);
          return null;
        }
        const lessons = [];
        for (const row of data) {
          if (!row || row.LessonId == null || !row.LessonTitle) continue;
          const treeId = (row.TreeId != null ? row.TreeId : '');
          lessons.push({
            id: row.LessonId,
            info: {
              compositeId: String(subjectId) + ',' + String(treeId) + ',' + String(row.LessonId),
              chapterId: treeId,
              name: row.LessonTitle
            }
          });
        }
        console.log('[TAHDIRI LIVE] GetGoalLessonSubject OK for subjectId=', subjectId, 'lessons=', lessons.length);
        return lessons;
      } catch (e) {
        console.warn('[TAHDIRI LIVE] GetGoalLessonSubject fetch error for subjectId=', subjectId, e);
        return null;
      }
    }
    async function getLocalTemplates() {
      return new Promise((resolve) => {
        chrome.runtime.sendMessage({ action: 'GET_TEMPLATES' }, (response) => {
          resolve(response && response.ok ? response.data : null);
        });
      });
    }
    async function markFinalSaveSubmitted() {
      await setLocal({
        [AUTOMATION_STATE_KEY]: FLOW_STATES.DONE,
        [SAVE_SUBMITTED_AT_KEY]: Date.now()
      });
    }
    async function reopenAfterSaveValidationError() {
      await setLocal({
        [AUTOMATION_STATE_KEY]: FLOW_STATES.STEP2,
        [SAVE_SUBMITTED_AT_KEY]: 0
      });
    }
    async function clearSaveSubmittedMarker() {
      await removeLocal(SAVE_SUBMITTED_AT_KEY);
    }

    // src/content/dom-actions.js
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    function isTrulyVisible(element) {
      if (!element) return false;
      try {
        const style = window.getComputedStyle(element);
        if (style.display === "none" || style.visibility === "hidden" || parseFloat(style.opacity) === 0) {
          return false;
        }
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      } catch {
        return false;
      }
    }
    function triggerEvents(element, eventTypes) {
      if (!element) return;
      const types = eventTypes || ["input", "change", "click", "blur"];
      for (const type of types) {
        try {
          element.dispatchEvent(new Event(type, { bubbles: true }));
        } catch {
        }
      }
    }
    function simulateHumanClick(element) {
      if (!element) return;
      const options = { view: window, bubbles: true, cancelable: true, buttons: 1 };
      try {
        element.dispatchEvent(new MouseEvent("mousedown", options));
        element.dispatchEvent(new MouseEvent("mouseup", options));
        element.dispatchEvent(new MouseEvent("click", options));
      } catch {
      }
    }
    function activateElementOnce(element) {
      if (!element || element.dataset?.tahdiriClicked === "true") return;
      try {
        element.dataset.tahdiriClicked = "true";
        setTimeout(() => {
          if (element && element.dataset) delete element.dataset.tahdiriClicked;
        }, 1e4);
      } catch {
      }
      try {
        if (typeof element.click === "function") {
          element.click();
          return;
        }
      } catch {
      }
      try {
        element.dispatchEvent(new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1
        }));
      } catch {
      }
    }
    function lockActionElement(element) {
      if (!element || element.dataset?.tahdiriLocked === "true") return;
      try {
        element.dataset.tahdiriLocked = "true";
      } catch {
      }
      if ("disabled" in element) {
        try {
          element.disabled = true;
        } catch {
        }
      }
      try {
        element.setAttribute("aria-disabled", "true");
        element.style.pointerEvents = "none";
      } catch {
      }
    }
    function unlockActionElement(element) {
      if (!element) return;
      try {
        delete element.dataset.tahdiriLocked;
      } catch {
      }
      if ("disabled" in element) {
        try {
          element.disabled = false;
        } catch {
        }
      }
      try {
        element.removeAttribute("aria-disabled");
        element.style.pointerEvents = "";
      } catch {
      }
    }
    function getAutomationActionKey(action) {
      const lessonPath = STEP1_SELECT_IDS.map((id) => getFieldValue(`#${id}`)).filter(Boolean).join("|");
      const pageKey = window.location.origin;
      return `${ACTION_LOCK_PREFIX}:${action}:${pageKey}:${lessonPath || "no-path"}`;
    }
    function tryAcquireActionLock(action, ttlMs) {
      const key = getAutomationActionKey(action);
      const now = Date.now();
      try {
        const previous = JSON.parse(window.sessionStorage.getItem(key) || "null");
        if (previous?.at && now - previous.at < ttlMs) {
          return false;
        }
        window.sessionStorage.setItem(key, JSON.stringify({ at: now }));
      } catch {
        return true;
      }
      return true;
    }
    function releaseActionLock(action) {
      try {
        window.sessionStorage.removeItem(getAutomationActionKey(action));
      } catch {
      }
    }
    function setNativeValue(element, value) {
      if (!element) return;
      try {
        // Use the HTMLTextAreaElement prototype setter directly so React's synthetic
        // event system sees the change as a genuine user input (prevents ghost-save).
        // For non-textarea elements we fall back to the generic HTMLInputElement setter.
        const proto = element instanceof HTMLTextAreaElement
          ? window.HTMLTextAreaElement.prototype
          : window.HTMLInputElement.prototype;
        const nativeSetter = Object.getOwnPropertyDescriptor(proto, 'value')?.set;
        if (nativeSetter) {
          nativeSetter.call(element, value);
        } else {
          element.value = value;
        }
      } catch {
        element.value = value;
      }
      // Dispatch native events so React's internal state is updated
      try { element.dispatchEvent(new Event('input', { bubbles: true })); } catch { }
      try { element.dispatchEvent(new Event('change', { bubbles: true })); } catch { }
    }
    function waitForElement(selector, timeoutMs = 6e3, root) {
      return new Promise((resolve, reject) => {
        const deadline = Date.now() + timeoutMs;
        const scope = root || document;
        function check() {
          const element = scope.querySelector(selector);
          if (element) {
            resolve(element);
            return;
          }
          if (Date.now() >= deadline) {
            reject(new Error(`Element not found: ${selector}`));
            return;
          }
          setTimeout(check, 100);
        }
        check();
      });
    }
    function waitForOptions(selectId, timeoutMs = 7e3) {
      return new Promise((resolve) => {
        const deadline = Date.now() + timeoutMs;
        function check() {
          const element = document.getElementById(selectId);
          if (element && element.options && element.options.length > 1) {
            resolve(element);
            return;
          }
          if (Date.now() >= deadline) {
            resolve(element || null);
            return;
          }
          setTimeout(check, 120);
        }
        check();
      });
    }
    function getVisibleElements(selector, root) {
      const scope = root || document;
      return Array.from(scope.querySelectorAll(selector)).filter(isTrulyVisible);
    }
    function getFieldValue(selector, root) {
      const scope = root || document;
      const element = scope.querySelector(selector);
      if (!element) return "";
      return typeof element.value === "string" ? element.value.trim() : "";
    }
    function getLessonFormRoot() {
      const prioritizedSelectors = [
        "#divSecondLessonDetailsPage",
        "#mainPage",
        "#divLessonDetailsPages form",
        "#divLessonDetailsPages",
        "form"
      ];
      for (const selector of prioritizedSelectors) {
        const candidates = Array.from(document.querySelectorAll(selector));
        const visibleCandidate = candidates.find(isTrulyVisible);
        if (visibleCandidate) return visibleCandidate;
      }
      return document;
    }
    function getElementLabel(element) {
      if (!element) return "";
      return [
        element.innerText,
        element.textContent,
        element.value,
        element.getAttribute && element.getAttribute("aria-label"),
        element.getAttribute && element.getAttribute("title")
      ].filter(Boolean).join(" ").trim();
    }
    function findElementByText(selector, text, root) {
      const elements = getVisibleElements(selector, root);
      return elements.find((element) => getElementLabel(element).includes(text)) || null;
    }
    function findPreferredElement(strategy) {
      const root = strategy.root || document;
      const textSelector = strategy.textSelector || 'button, a, .btn, [role="button"], input[type="button"], input[type="submit"]';
      for (const id of strategy.ids || []) {
        const element = root.getElementById ? root.getElementById(id) : document.getElementById(id);
        if (isTrulyVisible(element)) return element;
      }
      for (const selector of strategy.attributes || []) {
        const element = root.querySelector(selector);
        if (isTrulyVisible(element)) return element;
      }
      for (const selector of strategy.classes || []) {
        const element = root.querySelector(selector);
        if (isTrulyVisible(element)) return element;
      }
      for (const text of strategy.texts || []) {
        const element = findElementByText(textSelector, text, root);
        if (element) return element;
      }
      return null;
    }
    function ensureCheckboxChecked(checkbox) {
      if (!checkbox || checkbox.disabled) return false;
      if (checkbox.checked) return true;
      const clickTarget = getCheckboxActionElement(checkbox);
      try {
        checkbox.focus();
      } catch {
      }
      if (clickTarget) simulateHumanClick(clickTarget);
      if (clickTarget !== checkbox) simulateHumanClick(checkbox);
      checkbox.checked = true;
      triggerEvents(checkbox, ["input", "change", "click", "blur"]);
      return checkbox.checked;
    }
    function getCheckboxActionElement(checkbox) {
      if (!checkbox) return null;
      if (isTrulyVisible(checkbox)) return checkbox;
      if (checkbox.id) {
        const linkedLabel = document.querySelector(`label[for="${CSS.escape(checkbox.id)}"]`);
        if (isTrulyVisible(linkedLabel)) return linkedLabel;
      }
      const parentLabel = checkbox.closest("label");
      if (isTrulyVisible(parentLabel)) return parentLabel;
      const clickableWrapper = checkbox.closest(".form-check, .checkbox, .radio, .card, .list-group-item, li, div");
      if (isTrulyVisible(clickableWrapper)) return clickableWrapper;
      return checkbox;
    }
    function isCheckboxUsable(checkbox) {
      if (!checkbox || checkbox.disabled) return false;
      if (checkbox.closest(".modal")) return false;
      if (SAVE_LATER_PATTERN.test(checkbox.id || "") || SAVE_LATER_PATTERN.test(checkbox.name || "")) return false;
      const clickTarget = getCheckboxActionElement(checkbox);
      return Boolean(clickTarget && isTrulyVisible(clickTarget));
    }
    function ensureCheckboxGroupSelection(selector, root) {
      const scope = root || document;
      const checkboxes = Array.from(scope.querySelectorAll(selector)).filter(isCheckboxUsable);
      if (!checkboxes.length) return false;
      if (checkboxes.some((checkbox) => checkbox.checked)) return true;
      return ensureCheckboxChecked(checkboxes[0]);
    }
    async function selectLastOption(selectElement) {
      if (!selectElement || !selectElement.options || selectElement.options.length <= 1) return false;

      // Use the native HTMLSelectElement prototype setter so React's internal fiber
      // state sees this as a genuine user-driven change (prevents ghost-reset on
      // the Next button click).
      const nativeSetter = Object.getOwnPropertyDescriptor(
        window.HTMLSelectElement.prototype, 'value'
      )?.set;
      const targetValue = selectElement.options[selectElement.options.length - 1].value;
      if (nativeSetter) {
        nativeSetter.call(selectElement, targetValue);
      } else {
        selectElement.selectedIndex = selectElement.options.length - 1;
      }

      // Dispatch bubbling events so React's synthetic system re-reads the value.
      try { selectElement.dispatchEvent(new Event('input', { bubbles: true })); } catch { }
      try { selectElement.dispatchEvent(new Event('change', { bubbles: true })); } catch { }
      try { selectElement.dispatchEvent(new Event('blur', { bubbles: true })); } catch { }

      // Also call the onchange handler if the page assigned one directly.
      if (typeof selectElement.onchange === 'function') {
        try { selectElement.onchange(); } catch { }
      }
      return true;
    }
    function isMultiLessonMode(scope = document) {
      const isMulti = scope.querySelector("#IsMultiLectuer");
      if (isMulti && isMulti.value === "true") return true;
      return scope.querySelectorAll(".lesson-info-card").length > 1;
    }
    function buildResult(ok, message, extra) {
      return { ok, message, ...extra || {} };
    }
    async function waitForValue(getValue, timeoutMs = 6e3, intervalMs = 150) {
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        const value = getValue();
        if (value) return value;
        await sleep(intervalMs);
      }
      return null;
    }

    // src/content/ui-panel.js
    var controlPanelHandlers = {
      start: async () => {
      },
      startAI: async () => {
      },
      startQuick: async () => {
      }
    };
    var removeUiTimer = null;
    function setControlPanelHandlers(handlers) {
      controlPanelHandlers = { ...controlPanelHandlers, ...handlers || {} };
    }
    function clearUiRemoval() {
      if (removeUiTimer) {
        clearTimeout(removeUiTimer);
        removeUiTimer = null;
      }
    }
    function removeControlPanel(delayMs = 0) {
      clearUiRemoval();
      const removeNow = () => {
        const container = document.getElementById(UI_IDS.container);
        if (container) container.remove();
      };
      if (delayMs > 0) {
        removeUiTimer = setTimeout(removeNow, delayMs);
        return;
      }
      removeNow();
    }
    function getControlPanel() {
      return document.getElementById(UI_IDS.container);
    }
    function getPrimaryButton() {
      return document.getElementById(UI_IDS.primary);
    }
    function getAdvancedButton() {
      return document.getElementById(UI_IDS.advanced);
    }
    function updateControlStatus(message, tone) {
      const status = document.getElementById(UI_IDS.status);
      if (!status) return;
      const dot = status.querySelector(".tahdiri-status-dot");
      const text = status.querySelector(".tahdiri-status-text");
      if (text) text.textContent = message;
      const toneMap = {
        error: { dot: "#c0392b", bg: "rgba(192,57,43,0.08)", border: "rgba(192,57,43,0.22)", color: "#7a1a10" },
        success: { dot: "#1a9448", bg: "rgba(26,148,72,0.08)", border: "rgba(26,148,72,0.22)", color: "#0e5c2e" },
        warning: { dot: "#c87f0a", bg: "rgba(200,127,10,0.08)", border: "rgba(200,127,10,0.22)", color: "#7a4d05" },
        info: { dot: "#1a6fd4", bg: "rgba(26,111,212,0.08)", border: "rgba(26,111,212,0.22)", color: "#0f4b99" },
        default: { dot: "#8a8a8a", bg: "rgba(0,0,0,0.04)", border: "rgba(0,0,0,0.1)", color: "#555" }
      };
      const t = toneMap[tone] || toneMap.default;
      if (dot) dot.style.background = t.dot;
      status.style.background = t.bg;
      status.style.borderColor = t.border;
      status.style.color = t.color;
      status.dataset.tone = tone || "info";
    }
    function getAIButton() {
      return document.getElementById(UI_IDS.aiBtn);
    }
    function getQuickButton() {
      return document.getElementById(UI_IDS.quickBtn);
    }
    function setButtonsDisabled(disabled) {
      const primary = getPrimaryButton();
      const advanced = getAdvancedButton();
      const aiBtnEl = getAIButton();
      if (primary) {
        primary.disabled = disabled;
        primary.style.opacity = disabled ? "0.6" : "1";
        primary.style.cursor = disabled ? "not-allowed" : "pointer";
      }
      if (aiBtnEl) {
        aiBtnEl.disabled = disabled;
        aiBtnEl.style.opacity = disabled ? "0.6" : "1";
        aiBtnEl.style.cursor = disabled ? "not-allowed" : "pointer";
      }
      const quickBtnEl = getQuickButton();
      if (quickBtnEl) {
        quickBtnEl.disabled = disabled;
        quickBtnEl.style.opacity = disabled ? "0.6" : "1";
        quickBtnEl.style.cursor = disabled ? "not-allowed" : "pointer";
      }
      if (advanced) {
        advanced.disabled = disabled;
        advanced.style.opacity = disabled ? "0.45" : "1";
        advanced.style.cursor = disabled ? "not-allowed" : "pointer";
      }
    }
    function updatePrimaryButton(label, tone) {
      const primary = getPrimaryButton();
      const iconEl = primary && primary.querySelector(".tahdiri-btn-icon");
      if (!primary) return;
      const toneMap = {
        error: { bg: "#c0392b", icon: errorIconSVG() },
        success: { bg: "#1a9448", icon: checkIconSVG() },
        warning: { bg: "#c87f0a", icon: warningIconSVG() },
        loading: { bg: "#1a6fd4", icon: clockIconSVG() },
        default: { bg: "#1a6fd4", icon: playIconSVG() }
      };
      const t = toneMap[tone] || toneMap.default;
      primary.style.background = t.bg;
      if (iconEl) iconEl.innerHTML = t.icon;
      const labelEl = primary.querySelector(".tahdiri-btn-label");
      if (labelEl) labelEl.textContent = label;
    }
    var SVG = (d, opts = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0" ${opts}>${d}</svg>`;
    var playIconSVG = () => SVG('<polygon points="5 3 19 12 5 21 5 3"/>');
    var checkIconSVG = () => SVG('<polyline points="20 6 9 17 4 12"/>');
    var clockIconSVG = () => SVG('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>');
    var errorIconSVG = () => SVG('<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>');
    var warningIconSVG = () => SVG('<path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>');
    var aiIconSVG = () => `<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0"><path d="M12 2a4 4 0 014 4v1a1 1 0 01-1 1H9a1 1 0 01-1-1V6a4 4 0 014-4z"/><path d="M9 8v1a3 3 0 006 0V8"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="18" x2="9" y2="22"/><line x1="15" y1="18" x2="15" y2="22"/><line x1="12" y1="16" x2="12" y2="22"/></svg>`;
    var gearIconSVG = () => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="width:15px;height:15px;flex-shrink:0"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>`;
    function injectControlPanel() {
      if (getControlPanel()) return;
      if (!document.getElementById("tahdiri-font")) {
        const link = document.createElement("link");
        link.id = "tahdiri-font";
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap";
        document.head.appendChild(link);
      }
      const container = document.createElement("div");
      container.id = UI_IDS.container;
      container.style.cssText = [
        "position:fixed",
        "bottom:24px",
        "left:24px",
        "z-index:999999",
        "width:296px",
        "background:#ffffff",
        "border:0.5px solid rgba(0,0,0,0.14)",
        "border-radius:18px",
        "box-shadow:0 12px 36px rgba(15,23,42,0.15)",
        "padding:16px",
        "font-family:Cairo,Segoe UI,Tahoma,sans-serif",
        "direction:rtl",
        "display:flex",
        "flex-direction:column",
        "gap:10px"
      ].join(";");
      const header = document.createElement("div");
      header.style.cssText = "display:flex;align-items:center;gap:10px";
      const iconWrap = document.createElement("div");
      iconWrap.style.cssText = [
        "width:36px;height:36px;border-radius:10px",
        "background:rgba(26,111,212,0.1)",
        "display:flex;align-items:center;justify-content:center;flex-shrink:0"
      ].join(";");
      iconWrap.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="#1a6fd4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px">
      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
      <path d="M2 17l10 5 10-5"/>
      <path d="M2 12l10 5 10-5"/>
    </svg>`;
      const titleGroup = document.createElement("div");
      const title = document.createElement("div");
      title.textContent = "\u062A\u062D\u0636\u064A\u0631\u064A";
      title.style.cssText = "font-size:15px;font-weight:700;color:#16324f;line-height:1.2";
      const subtitle = document.createElement("div");
      subtitle.textContent = "\u0623\u062A\u0645\u062A\u0629 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062F\u0631\u0648\u0633";
      subtitle.style.cssText = "font-size:11px;color:#6b7c93;margin-top:1px";
      titleGroup.append(title, subtitle);
      header.append(iconWrap, titleGroup);
      const divider = document.createElement("div");
      divider.style.cssText = "height:0.5px;background:rgba(0,0,0,0.08);margin:0 -2px";
      const primary = document.createElement("button");
      primary.id = UI_IDS.primary;
      primary.type = "button";
      applyButtonStyle(primary, "#1a6fd4");
      primary.innerHTML = `<span class="tahdiri-btn-icon">${playIconSVG()}</span>
     <span class="tahdiri-btn-label">\u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062F\u0631\u0633 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</span>`;
      const aiBtn = document.createElement("button");
      aiBtn.id = UI_IDS.aiBtn;
      aiBtn.type = "button";
      applyButtonStyle(aiBtn, "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)");
      aiBtn.innerHTML = `<span class="tahdiri-btn-icon">${aiIconSVG()}</span>
     <span class="tahdiri-btn-label">\u{1F916} \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062F\u0631\u0633 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B</span>`;
      const quickBtn = document.createElement("button");
      quickBtn.id = UI_IDS.quickBtn;
      quickBtn.type = "button";
      applyButtonStyle(quickBtn, "linear-gradient(135deg, #1a9448 0%, #0f7a36 100%)");
      quickBtn.innerHTML = `<span class="tahdiri-btn-icon">\u26A1</span>
     <span class="tahdiri-btn-label">\u062A\u062D\u0636\u064A\u0631 \u0633\u0631\u064A\u0639</span>`;
      const quickTooltip = document.createElement("div");
      quickTooltip.style.cssText = "font-size:10px;color:#6b7c93;text-align:center;margin-top:-4px";
      quickTooltip.textContent = "\u0623\u0633\u0631\u0639 \u062A\u062D\u0636\u064A\u0631 \u0645\u0645\u0643\u0646 - \u064A\u0633\u062A\u062E\u062F\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0645\u0646\u0635\u0629 \u0645\u062F\u0631\u0633\u062A\u064A \u0645\u0628\u0627\u0634\u0631\u0629";
      const advanced = document.createElement("button");
      advanced.id = UI_IDS.advanced;
      advanced.type = "button";
      applySecondaryButtonStyle(advanced);
      advanced.innerHTML = `<span style="display:flex;align-items:center;gap:8px;justify-content:center">
      ${gearIconSVG()}
      <span>\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u0627\u0631 \u0641\u0642\u0637</span>
    </span>`;
      const stepBar = document.createElement("div");
      stepBar.id = UI_IDS.container + "-steps";
      stepBar.style.cssText = "display:none";
      stepBar.innerHTML = `
    <div style="display:flex;gap:6px;margin-bottom:4px">
      <div class="tahdiri-step" style="flex:1;height:4px;border-radius:2px;background:rgba(0,0,0,0.12);transition:background .3s"></div>
      <div class="tahdiri-step" style="flex:1;height:4px;border-radius:2px;background:rgba(0,0,0,0.12);transition:background .3s"></div>
    </div>
    <div style="display:flex;gap:6px">
      <div class="tahdiri-step-label" style="flex:1;font-size:10px;color:#aaa;text-align:center;transition:color .3s">\u0627\u0644\u062E\u0637\u0648\u0629 \u0661</div>
      <div class="tahdiri-step-label" style="flex:1;font-size:10px;color:#aaa;text-align:center;transition:color .3s">\u0627\u0644\u062E\u0637\u0648\u0629 \u0662</div>
    </div>`;
      const status = document.createElement("div");
      status.id = UI_IDS.status;
      status.style.cssText = [
        "font-size:12px;line-height:1.7",
        "min-height:40px",
        "border-radius:9px",
        "border:0.5px solid rgba(0,0,0,0.1)",
        "background:rgba(0,0,0,0.04)",
        "padding:8px 11px",
        "display:flex;align-items:flex-start;gap:8px",
        "color:#555",
        "transition:background .25s,border-color .25s,color .25s"
      ].join(";");
      status.innerHTML = `<span class="tahdiri-status-dot" style="width:7px;height:7px;border-radius:50%;flex-shrink:0;margin-top:5px;background:#8a8a8a;transition:background .25s"></span>
     <span class="tahdiri-status-text">\u062C\u0627\u0647\u0632 \u0644\u0625\u0639\u062F\u0627\u062F \u0627\u0644\u062F\u0631\u0633.</span>`;
      primary.addEventListener("click", async () => {
        await controlPanelHandlers.start("auto");
      });
      aiBtn.addEventListener("click", async () => {
        await controlPanelHandlers.startAI();
      });
      quickBtn.addEventListener("click", async () => {
        await controlPanelHandlers.startQuick();
      });
      advanced.addEventListener("click", async () => {
        await controlPanelHandlers.start("step1Only");
      });
      container.append(header, divider, primary, aiBtn, quickBtn, quickTooltip, advanced, stepBar, status);
      document.documentElement.appendChild(container);
    }
    function applyButtonStyle(button, background) {
      button.style.cssText = [
        `background:${background}`,
        "color:#fff",
        "border:none",
        "border-radius:10px",
        "padding:11px 14px",
        "font-size:14px",
        "font-weight:700",
        "width:100%",
        "display:flex",
        "align-items:center",
        "justify-content:center",
        "gap:8px",
        "cursor:pointer",
        "font-family:Cairo,Segoe UI,Tahoma,sans-serif",
        "transition:opacity .15s,transform .1s"
      ].join(";");
      button.onmousedown = () => {
        button.style.transform = "scale(0.98)";
      };
      button.onmouseup = () => {
        button.style.transform = "";
      };
      button.onmouseleave = () => {
        button.style.transform = "";
      };
    }
    function applySecondaryButtonStyle(button) {
      button.style.cssText = [
        "background:rgba(0,0,0,0.04)",
        "color:#374151",
        "border:0.5px solid rgba(0,0,0,0.14)",
        "border-radius:10px",
        "padding:10px 14px",
        "font-size:13px",
        "font-weight:600",
        "width:100%",
        "cursor:pointer",
        "font-family:Cairo,Segoe UI,Tahoma,sans-serif",
        "transition:background .15s,transform .1s"
      ].join(";");
      button.onmouseenter = () => {
        button.style.background = "rgba(0,0,0,0.07)";
      };
      button.onmouseleave = () => {
        button.style.background = "rgba(0,0,0,0.04)";
        button.style.transform = "";
      };
      button.onmousedown = () => {
        button.style.transform = "scale(0.98)";
      };
      button.onmouseup = () => {
        button.style.transform = "";
      };
    }

    // src/content/page-state.js
    var findFinalSaveButton = () => null;
    function setFinalSaveButtonDetector(detector) {
      findFinalSaveButton = typeof detector === "function" ? detector : () => null;
    }
    function detectPageState() {
      var isScheduleUrl = /\/SchoolSchedule\/Schedule/i.test(window.location.pathname);
      var hasTimeTable = Boolean(
        document.querySelector('.calendar-table, .table-schedule, .schedule-table, .fc-view, .timetable, .scheduler-table')
      );
      if (isScheduleUrl || hasTimeTable) return FLOW_STATES.DASHBOARD;
      const setupVisible = STEP1_SELECT_IDS.some((id) => isTrulyVisible(document.getElementById(id)));
      if (setupVisible) return FLOW_STATES.STEP1;
      const hasLessonForm = getVisibleElements("textarea").length > 0 || getVisibleElements('[contenteditable="true"]').length > 0 || Boolean(findFinalSaveButton());
      if (hasLessonForm) return FLOW_STATES.STEP2;
      return FLOW_STATES.IDLE;
    }

    // src/content/dashboard-ui.js
    var dashboardInjected = false;
    var dashboardLessonCount = 0;

    async function fetchLessonTreeOptions(subjectId, subjectName) {
      var optionsArray = [{ value: 'AI_AUTO', text: '🤖 تحضير ذكي (AI Auto-Pilot)', level: 'auto' }];
      const subjectData = await getLocalSubjectData(subjectId, subjectName);
      if (subjectData) {
        // groups هي array of arrays: groups[chapter][lesson] = {id, info:{compositeId,name,...}}
        // نعمل flatten عشان نمشي على كل درس لوحده بغض النظر عن العمق.
        var pushedFromGroups = 0;
        if (subjectData.groups && Array.isArray(subjectData.groups)) {
          subjectData.groups.forEach(group => {
            var lessons = Array.isArray(group) ? group : [group];
            lessons.forEach(lesson => {
              if (lesson && lesson.info && lesson.info.compositeId && lesson.info.name) {
                optionsArray.push({
                  value: lesson.info.compositeId,
                  text: lesson.info.name,
                  level: '1'
                });
                pushedFromGroups++;
              }
            });
          });
        }
        // لو الـ groups فاضية (76% من الـ courses كده) نوقع على rawLessonsList كـ fallback.
        if (pushedFromGroups === 0 && Array.isArray(subjectData.rawLessonsList)) {
          subjectData.rawLessonsList.forEach(lesson => {
            if (lesson && lesson.id && lesson.name) {
              optionsArray.push({ value: lesson.id, text: lesson.name, level: '1' });
            }
          });
        }
      }
      // [TAHDIRI HYBRID] Live fallback: when local JSON yielded no real lessons (only AI_AUTO),
      // call the Madrasati GetGoalLessonSubject endpoint directly. Confirmed via network capture.
      if (optionsArray.length <= 1 && subjectId) {
        console.log('[TAHDIRI HYBRID] Local cache miss for subjectId=', subjectId, '→ trying live GetGoalLessonSubject');
        const liveLessons = await fetchGoalLessonSubjectLive(subjectId);
        if (Array.isArray(liveLessons) && liveLessons.length > 0) {
          for (const lesson of liveLessons) {
            if (lesson && lesson.info && lesson.info.compositeId && lesson.info.name) {
              optionsArray.push({
                value: lesson.info.compositeId,
                text: lesson.info.name,
                level: '1'
              });
            }
          }
        }
      }
      // Diagnostic log: if STILL no real lessons after both local + live attempts,
      // print the offending subjectId + subjectName for further investigation.
      if (optionsArray.length <= 1) {
        console.warn('[Tahdiri] EMPTY LESSON LIST for card (after local + live) →', {
          subjectId: subjectId,
          subjectName: subjectName,
          subjectDataFound: !!subjectData,
          subjectDataHasGroups: !!(subjectData && subjectData.groups && subjectData.groups.length),
          subjectDataHasRaw: !!(subjectData && subjectData.rawLessonsList && subjectData.rawLessonsList.length)
        });
      }
      return optionsArray;
    }

    function createDashboardSelectDropdown(lessonId, options) {
      var select = document.createElement("select");
      select.className = "tahdiri-dashboard-select";
      select.dataset.lessonId = lessonId;
      select.style.cssText = [
        "display:block",
        "width:90%",
        "margin:8px auto",
        "padding:5px 8px",
        "font-size:12px",
        "font-family:Cairo,Segoe UI,Tahoma,sans-serif",
        "border:1.5px solid rgba(26,111,212,0.35)",
        "border-radius:4px",
        "background:#fff",
        "color:#16324f",
        "cursor:pointer",
        "direction:rtl",
        "outline:none",
        "transition:border-color .2s,box-shadow .2s"
      ].join(";");

      var defaultOpt = document.createElement("option");
      defaultOpt.value = "";
      defaultOpt.textContent = "\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0631\u0633..."; // اختر الدرس...
      select.appendChild(defaultOpt);

      for (var opt of options) {
        var optEl = document.createElement("option");
        optEl.value = opt.value;
        optEl.textContent = opt.text;
        if (opt.level) optEl.dataset.level = opt.level;
        select.appendChild(optEl);
      }

      select.addEventListener("focus", function () {
        select.style.borderColor = "#1a6fd4";
        select.style.boxShadow = "0 0 0 3px rgba(26,111,212,0.12)";
      });
      select.addEventListener("blur", function () {
        select.style.borderColor = "rgba(26,111,212,0.35)";
        select.style.boxShadow = "none";
      });
      select.addEventListener("change", function () {
        updateDashboardCounter();
        if (select.value) {
          select.style.borderColor = "#1a9448";
          select.style.background = "rgba(26,148,72,0.04)";
        } else {
          select.style.borderColor = "rgba(26,111,212,0.35)";
          select.style.background = "#fff";
        }
      });

      return select;
    }

    function updateDashboardCounter() {
      var allSelects = document.querySelectorAll(".tahdiri-dashboard-select");
      var selected = 0;
      for (var s of allSelects) {
        if (s.value) selected++;
      }
      var counter = document.getElementById("tahdiri-dashboard-counter");
      if (counter) {
        counter.textContent = selected + " \u0645\u0646 " + allSelects.length; // X من Y
      }
      var saveBtn = document.getElementById("tahdiri-dashboard-save");
      if (saveBtn) {
        saveBtn.disabled = selected === 0;
        saveBtn.style.opacity = selected === 0 ? "0.55" : "1";
        saveBtn.style.cursor = selected === 0 ? "not-allowed" : "pointer";
      }
    }

    function injectDashboardPanel() {
      if (document.getElementById("tahdiri-dashboard-panel")) return;

      // Inject font
      if (!document.getElementById("tahdiri-font")) {
        var link = document.createElement("link");
        link.id = "tahdiri-font";
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap";
        document.head.appendChild(link);
      }

      var panel = document.createElement("div");
      panel.id = "tahdiri-dashboard-panel";
      panel.style.cssText = [
        "position:fixed",
        "bottom:0",
        "left:0",
        "right:0",
        "z-index:999999",
        "background:linear-gradient(135deg, #ffffff 0%, #f8faff 100%)",
        "border-top:1px solid rgba(26,111,212,0.18)",
        "box-shadow:0 -8px 32px rgba(15,23,42,0.12)",
        "padding:14px 24px",
        "font-family:Cairo,Segoe UI,Tahoma,sans-serif",
        "direction:rtl",
        "display:flex",
        "align-items:center",
        "gap:16px",
        "justify-content:center",
        "flex-wrap:wrap",
        "animation:tahdiriSlideUp 0.4s cubic-bezier(0.16,1,0.3,1)"
      ].join(";");

      // Inject keyframes
      if (!document.getElementById("tahdiri-dashboard-styles")) {
        var style = document.createElement("style");
        style.id = "tahdiri-dashboard-styles";
        style.textContent = [
          "@keyframes tahdiriSlideUp { from { transform:translateY(100%);opacity:0 } to { transform:translateY(0);opacity:1 } }",
          "@keyframes tahdiriPulse { 0%,100% { box-shadow:0 0 0 0 rgba(26,111,212,0.3) } 50% { box-shadow:0 0 0 8px rgba(26,111,212,0) } }",
          ".tahdiri-dashboard-select:hover { border-color:#1a6fd4 !important; }",
          ".tahdiri-dashboard-badge { display:inline-flex;align-items:center;gap:4px;background:rgba(26,111,212,0.08);color:#1a6fd4;padding:4px 12px;border-radius:20px;font-size:13px;font-weight:600; }",
          ".tahdiri-dashboard-badge svg { width:16px;height:16px; }"
        ].join("\n");
        document.head.appendChild(style);
      }

      // Logo + branding
      var branding = document.createElement("div");
      branding.style.cssText = "display:flex;align-items:center;gap:10px;flex-shrink:0";
      var iconWrap = document.createElement("div");
      iconWrap.style.cssText = "width:36px;height:36px;border-radius:10px;background:rgba(26,111,212,0.1);display:flex;align-items:center;justify-content:center;flex-shrink:0";
      iconWrap.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="#1a6fd4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:18px;height:18px"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>';
      var titleGroup = document.createElement("div");
      var title = document.createElement("div");
      title.textContent = "\u062A\u062D\u0636\u064A\u0631\u064A"; // تحضيري
      title.style.cssText = "font-size:15px;font-weight:700;color:#16324f;line-height:1.2";
      var subtitle = document.createElement("div");
      subtitle.textContent = "\u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062C\u0645\u0627\u0639\u064A"; // لوحة التحضير الجماعي
      subtitle.style.cssText = "font-size:11px;color:#6b7c93;margin-top:1px";
      titleGroup.append(title, subtitle);
      branding.append(iconWrap, titleGroup);

      // Counter badge
      var badge = document.createElement("div");
      badge.className = "tahdiri-dashboard-badge";
      badge.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>';
      var counter = document.createElement("span");
      counter.id = "tahdiri-dashboard-counter";
      counter.textContent = "0 \u0645\u0646 0"; // 0 من 0
      badge.appendChild(counter);

      // Status text
      var status = document.createElement("div");
      status.id = "tahdiri-dashboard-status";
      status.style.cssText = "font-size:12px;color:#6b7c93;min-width:120px;text-align:center";
      status.textContent = "\u062C\u0627\u0631\u064A \u0641\u062D\u0635 \u0627\u0644\u062C\u062F\u0648\u0644..."; // جاري فحص الجدول...

      // Save button
      var saveBtn = document.createElement("button");
      saveBtn.id = "tahdiri-dashboard-save";
      saveBtn.type = "button";
      saveBtn.disabled = true;
      saveBtn.style.cssText = [
        "background:linear-gradient(135deg, #1a6fd4 0%, #1557a7 100%)",
        "color:#fff",
        "border:none",
        "border-radius:12px",
        "padding:12px 28px",
        "font-size:15px",
        "font-weight:700",
        "cursor:not-allowed",
        "font-family:Cairo,Segoe UI,Tahoma,sans-serif",
        "transition:opacity .15s,transform .1s,box-shadow .2s",
        "opacity:0.55",
        "white-space:nowrap",
        "display:flex",
        "align-items:center",
        "gap:8px",
        "box-shadow:0 4px 14px rgba(26,111,212,0.25)"
      ].join(";");
      saveBtn.innerHTML = '<span>\u26A1</span><span>\u062D\u0641\u0638 \u0648\u0628\u062F\u0621 \u0627\u0644\u062A\u062D\u0636\u064A\u0631</span>'; // ⚡ حفظ وبدء التحضير
      saveBtn.addEventListener("mousedown", function () { saveBtn.style.transform = "scale(0.97)"; });
      saveBtn.addEventListener("mouseup", function () { saveBtn.style.transform = ""; });
      saveBtn.addEventListener("mouseleave", function () { saveBtn.style.transform = ""; });
      saveBtn.addEventListener("click", function () { handleDashboardSave(); });

      panel.append(branding, badge, status, saveBtn);
      document.documentElement.appendChild(panel);

      // Push body content up so panel doesn't overlap
      document.body.style.paddingBottom = "80px";
    }

    function updateDashboardStatus(message, tone) {
      var status = document.getElementById("tahdiri-dashboard-status");
      if (!status) return;
      status.textContent = message;
      var toneColors = {
        info: "#6b7c93",
        success: "#1a9448",
        error: "#c0392b",
        warning: "#c87f0a",
        loading: "#1a6fd4"
      };
      status.style.color = toneColors[tone] || toneColors.info;
    }

    async function injectDashboardUI() {
      if (dashboardInjected) return;
      dashboardInjected = true;

      injectDashboardPanel();
      updateDashboardStatus("\u062C\u0627\u0631\u064A \u0627\u0646\u062A\u0638\u0627\u0631 \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u062C\u062F\u0648\u0644...", "loading"); // جاري انتظار تحميل الجدول...

      // Infinite poll: never clears. Survives AJAX re-renders.
      // Uses a sequential queue to avoid rate-limiting.
      var dashboardQueue = [];
      var dashboardProcessing = false;

      async function processDashboardQueue() {
        if (dashboardProcessing) return;
        dashboardProcessing = true;

        while (dashboardQueue.length > 0) {
          var item = dashboardQueue.shift();
          var div = item.div;
          var tok = item.token;
          var num = item.num;

          // Progressive status update
          var remaining = dashboardQueue.length;
          updateDashboardStatus(
            '\u062C\u0627\u0631\u064A \u062A\u062D\u0645\u064A\u0644 ' + num + ' \u0645\u0646 ' + dashboardLessonCount + '...', // جاري تحميل X من Y...
            'loading'
          );

          var subjectId = div.getAttribute('data-subject-id');
          if (!subjectId) {
            var cell = div.closest('td') || div.parentElement;
            var anchor = cell ? cell.querySelector('a') : null;
            if (anchor && anchor.href) {
              var match = anchor.href.match(/subjectId=(\d+)/i);
              if (match) subjectId = match[1];
            }
          }
          var subjectName = null;
          var h2 = div.querySelector('h2');
          if (h2) subjectName = h2.innerText.trim();

          try {
            var options = await fetchLessonTreeOptions(subjectId, subjectName);

            // Check the div still exists in DOM (might be re-rendered)
            if (!document.contains(div)) {
              log('Dashboard: lesson #' + num + ' div removed from DOM, skipping');
              await sleep(100);
              continue;
            }

            // Options always contain at least AI_AUTO — always create dropdown
            if (options.length > 0) {
              var select = document.createElement('select');
              select.className = 'tahdiri-dashboard-select';
              select.setAttribute('data-lesson-token', tok);
              select.style.cssText = 'width:95%;margin-top:8px;padding:4px;font-size:12px;font-family:Cairo,Segoe UI,Tahoma,sans-serif;border:1.5px solid rgba(26,111,212,0.35);border-radius:4px;background:#fff;color:#16324f;cursor:pointer;direction:rtl;outline:none;display:block';

              var defaultOpt = document.createElement('option');
              defaultOpt.value = '';
              defaultOpt.textContent = '\u0627\u062E\u062A\u0631 \u0627\u0644\u062F\u0631\u0633...'; // اختر الدرس...
              select.appendChild(defaultOpt);

              for (var opt of options) {
                var optEl = document.createElement('option');
                optEl.value = opt.value;
                optEl.textContent = opt.text;
                select.appendChild(optEl);
              }

              select.addEventListener('change', function () {
                var changedSelect = this;
                var newValue = changedSelect.value;
                var myToken = changedSelect.getAttribute('data-lesson-token');

                updateDashboardCounter();

                // Style the changed select
                if (newValue) {
                  changedSelect.style.borderColor = '#1a9448';
                  changedSelect.style.background = 'rgba(26,148,72,0.04)';
                } else {
                  changedSelect.style.borderColor = 'rgba(26,111,212,0.35)';
                  changedSelect.style.background = '#fff';
                }

                // Sync all sibling selects with the same token (combined/merged lessons)
                if (myToken) {
                  var siblings = document.querySelectorAll('select.tahdiri-dashboard-select[data-lesson-token="' + myToken + '"]');
                  for (var sib of siblings) {
                    if (sib === changedSelect) continue; // skip self
                    sib.value = newValue;

                    // Style synced sibling
                    if (newValue) {
                      sib.style.borderColor = '#1a9448';
                      sib.style.background = 'rgba(26,148,72,0.04)';
                    } else {
                      sib.style.borderColor = 'rgba(26,111,212,0.35)';
                      sib.style.background = '#fff';
                    }

                    // Brief green highlight to show sync visually
                    sib.style.background = '#e8f5e9';
                    (function (el, val) {
                      setTimeout(function () {
                        el.style.background = val ? 'rgba(26,148,72,0.04)' : '#fff';
                      }, 500);
                    })(sib, newValue);
                  }
                  if (siblings.length > 1) {
                    log('Dashboard: synced ' + (siblings.length - 1) + ' sibling dropdown(s) for token ' + myToken.substring(0, 20) + '...');
                  }
                }
              });

              if (!div.querySelector('.tahdiri-dashboard-select')) {
                div.appendChild(select);
              }
            }
          } catch (err) {
            log('Dashboard: error processing lesson #' + num, err);
          }

          // Update global counter
          updateDashboardCounter();

          // Throttle: wait 300ms between fetches to avoid rate-limiting
          await sleep(300);
        }

        // All done processing current batch
        var totalSelects = document.querySelectorAll('.tahdiri-dashboard-select').length;
        if (totalSelects > 0) {
          updateDashboardStatus(
            '\u062C\u0627\u0647\u0632 \u2014 ' + totalSelects + ' \u062D\u0635\u0629 \u0645\u062A\u0627\u062D\u0629 \u0644\u0644\u062A\u062D\u0636\u064A\u0631', // جاهز — X حصة متاحة للتحضير
            'success'
          );
        } else if (dashboardLessonCount > 0) {
          updateDashboardStatus(
            '\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u0645\u064A\u0644 \u0623\u064A \u062E\u064A\u0627\u0631\u0627\u062A. \u062A\u0623\u0643\u062F \u0645\u0646 \u062A\u0633\u062C\u064A\u0644 \u0627\u0644\u062F\u062E\u0648\u0644.', // لم يتم تحميل أي خيارات. تأكد من تسجيل الدخول.
            'warning'
          );
        }

        dashboardProcessing = false;
      }

      setInterval(function () {
        var lessons = document.querySelectorAll(
          'td.day-cell div[data-data]:not(.tahdiri-processed),' +
          'div.cs-lesson-card[data-data]:not(.tahdiri-processed)'
        );
        if (lessons.length === 0) return;

        for (var lessonDiv of lessons) {
          lessonDiv.classList.add('tahdiri-processed');

          var token = lessonDiv.getAttribute('data-data');
          if (!token || token.length < 20) continue;

          dashboardLessonCount++;
          log('Dashboard: queued lesson #' + dashboardLessonCount + ' token=' + token.substring(0, 30) + '...');

          dashboardQueue.push({ div: lessonDiv, token: token, num: dashboardLessonCount });
        }

        // Kick off sequential processing if not already running
        processDashboardQueue();
      }, 1000);
    }

    // ── Step 3: Silent (headless) lesson-plan saver ─────────────────────────────
    // Madrasati requires at least one Assignment/Activity/Enrichment resource bound
    // to the lesson tree before it will accept a SaveLastLessonPlan POST.
    //
    // Projects/Activities are protected by a per-form HashKey rendered server-side,
    // so we mimic the competitor's two-step flow: GET the Create page, scrape the
    // CSRF token + HashKey, then POST the activity payload using both.
    // ── Step 3: Silent (headless) lesson-plan saver ─────────────────────────────

    async function silentCreateActivityResource(subjectId, chapterId, lessonId, lessonName, realSchoolId, csrfToken) {
      const schoolId = String(realSchoolId).trim();

      // Use the lesson-context CSRF passed in by silentPrepareLesson; fetch the
      // Create page only to grab the per-page HashKey. The page may also expose
      // a fresher token — prefer it when present.
      let token = "";
      let hashKey = "";
      let doc = null;
      try {
        const getRes = await fetch(`/Projects/Projects/Create?schoolId=${schoolId}`, {
          credentials: "same-origin"
        });
        const html = await getRes.text();
        const parser = new DOMParser();
        doc = parser.parseFromString(html, "text/html");
        // CRITICAL: Madrasati's Create page contains MULTIPLE forms, each with its own
        // __RequestVerificationToken (logout form, header search, Create form, etc.).
        // querySelector('[name="__RequestVerificationToken"]') returns the FIRST one,
        // which is typically empty (belongs to a layout form), causing token="" and
        // the "Could not scrape CSRF token" error.
        //
        // Strategy: HashKey is UNIQUE to the Create form. Find it first, walk up to
        // its enclosing <form>, and extract the token from THAT form.
        hashKey = doc.querySelector('[name="HashKey"]')?.value || "";

        const hashKeyEl = doc.querySelector('[name="HashKey"]');
        const createForm = hashKeyEl?.closest('form');
        if (createForm) {
          token = createForm.querySelector('[name="__RequestVerificationToken"]')?.value || "";
        }

        // Fallback: if scoping failed, scan ALL __RequestVerificationToken inputs and
        // pick the first NON-EMPTY one (usually the Create form's token).
        if (!token) {
          const allTokens = doc.querySelectorAll('[name="__RequestVerificationToken"]');
          for (const el of allTokens) {
            if (el.value && el.value.length > 20) {
              token = el.value;
              console.log('[Tahdiri] CSRF token resolved via fallback scan (token #' +
                Array.from(allTokens).indexOf(el) + ' of ' + allTokens.length + ')');
              break;
            }
          }
        }

        console.log('[Tahdiri] Create page scrape →',
          'tokens found:', doc.querySelectorAll('[name="__RequestVerificationToken"]').length,
          '| token resolved:', token ? token.slice(0, 30) + '...' : 'EMPTY',
          '| hashKey:', hashKey ? hashKey.slice(0, 30) + '...' : 'EMPTY',
          '| createForm found:', !!createForm);
      } catch (e) {
        console.error("[Tahdiri] Failed to fetch Create page for tokens", e);
        return false;
      }

      if (!token) {
        console.error("[Tahdiri] Could not scrape CSRF token from /Projects/Projects/Create page. Aborting Activity creation.");
        return false;
      }

      if (!hashKey) return false;

      // hfDrawTree from page, but hfLevelsCount MUST match the number of tree levels we send (always 3)
      const hfDrawTree = doc.querySelector('[name="hfDrawTree"]')?.value || "/Projects/Projects/DrawTreeToClassLesson";
      const hfLevelsCount = "3"; // Always 3: we always send SelectedUnitId + SelectedTrees_2 + SelectedTrees_3

      console.log("[Tahdiri] Activity POST params — HashKey:", hashKey, "hfLevelsCount:", hfLevelsCount, "token:", token.slice(0, 20) + "...");

      const payload = new URLSearchParams();
      payload.append("TypeId", "1");
      payload.append("__RequestVerificationToken", token);
      payload.append("HashKey", hashKey);
      // Verified from competitor's working trace: Id is sent as EMPTY STRING.
      // ARCHITECTURE.md §4.3 incorrectly says "0" — that value is silently rejected.
      payload.append("Id", "");
      payload.append("schoolId", schoolId);
      payload.append("SelectedUnitId", subjectId);
      payload.append("SelectedTrees_2", chapterId);
      payload.append("SelectedTrees_3", lessonId);
      payload.append("Name", `نشاط (${lessonName})`);
      payload.append("CategoryId", "4");
      payload.append("ClassificationLevel", "1");
      // Verified from competitor's working trace: ProjectType is sent TWICE —
      // first as "2", then as empty string. Single occurrence may be silently rejected.
      payload.append("ProjectType", "2");
      payload.append("ProjectType", "");
      payload.append("Description", "نشاط تدريبي داعم لموضوع الدرس");
      payload.append("Link", "https://ien.edu.sa");
      payload.append("SolvingType", "3");
      payload.append("AccessType", "True");
      payload.append("hfLevelsCount", hfLevelsCount);
      payload.append("hfDrawTree", hfDrawTree);
      payload.append("TotalGrade", "1");

      console.log("[Tahdiri] Activity POST full payload:", payload.toString());
      try {
        // Use redirect:'manual' so we can read the Location header.
        // The server typically 302-redirects to /Projects/Projects/Edit/{newId} or similar.
        const saveRes = await fetch("/Projects/Projects/Create", {
          method: "POST",
          credentials: "same-origin",
          redirect: "manual",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "requestverificationtoken": token
          },
          body: payload.toString()
        });
        console.log("[Tahdiri] Activity POST response — status:", saveRes.status, "type:", saveRes.type, "url:", saveRes.url);
        // Status 0 + type 'opaqueredirect' means the redirect happened — treat as success.
        if (saveRes.type === 'opaqueredirect' || saveRes.status === 0) {
          console.log("[Tahdiri] Activity POST → opaque redirect (treated as success)");
          return true;
        }
        if (!saveRes.ok) return false;
        return true;
      } catch (e) {
        console.error("[Tahdiri] Failed to POST silent Activity", e);
        return false;
      }
    }

    // ── Session 2: Enrichment (إثراء) silent API creation ──────────────────────
    // Mirrors silentCreateActivityResource but targets LearningResources/MangeResources/Create.
    // Key differences from Activity:  Id="0" (not ""),  hfLevelsCount="1" (not "3"),
    // requires SelectedGoles (base64 JSON of goal IDs) and IndicativeWords (UTF-8 base64).
    // Enrichment does NOT add fields to SaveLastLessonPlan — it's a standalone resource.
    async function silentCreateEnrichmentResource(subjectId, chapterId, lessonId, lessonName, realSchoolId) {
      const schoolId = String(realSchoolId).trim();

      // 1. Scrape CSRF + HashKey from the MangeResources/Create page
      let token = '';
      let hashKey = '';
      let hfDrawTree = '/MangeResources/DrawTreeToClassLesson';
      try {
        const getRes = await fetch(`/LearningResources/MangeResources/Create?schoolId=${encodeURIComponent(schoolId)}`, {
          credentials: 'same-origin'
        });
        const html = await getRes.text();
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const hashKeyEl = doc.querySelector('[name="HashKey"]');
        hashKey = hashKeyEl?.value || '';
        const createForm = hashKeyEl?.closest('form');
        if (createForm) {
          token = createForm.querySelector('[name="__RequestVerificationToken"]')?.value || '';
        }
        if (!token) {
          const allTokens = doc.querySelectorAll('[name="__RequestVerificationToken"]');
          for (const el of allTokens) {
            if (el.value && el.value.length > 20) { token = el.value; break; }
          }
        }
        hfDrawTree = doc.querySelector('[name="hfDrawTree"]')?.value || hfDrawTree;
        console.log('[Tahdiri] Enrichment Create page scraped → token:', token ? token.slice(0, 20) + '...' : 'EMPTY', '| hashKey:', hashKey ? hashKey.slice(0, 20) + '...' : 'EMPTY');
      } catch (e) {
        console.error('[Tahdiri] Enrichment: failed to fetch Create page', e);
        return false;
      }

      if (!token) {
        console.error('[Tahdiri] Enrichment: no CSRF token found — aborting');
        return false;
      }

      // 2. Fetch goals for SelectedGoles (base64 JSON of [{GoalId, LessonId},...])
      //    GetGoalLessonSubject returns an array where each row is a goal-lesson mapping.
      //    We filter for our specific lessonId and encode with btoa(JSON.stringify(...)).
      let selectedGolesB64 = btoa('[]'); // fallback: empty array
      try {
        const goalsRes = await fetch('/LearningResources/MangeResources/GetGoalLessonSubject', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'requestverificationtoken': token
          },
          body: 'subjectId=' + encodeURIComponent(String(subjectId))
        });
        const goalsData = await goalsRes.json();
        if (Array.isArray(goalsData)) {
          const lessonIdNum = parseInt(lessonId, 10);
          const goalEntries = goalsData
            .filter(function (row) { return row && row.GoalId && Number(row.LessonId) === lessonIdNum; })
            .map(function (row) { return { GoalId: row.GoalId, LessonId: lessonIdNum }; });
          if (goalEntries.length > 0) {
            selectedGolesB64 = btoa(JSON.stringify(goalEntries));
            console.log('[Tahdiri] Enrichment: SelectedGoles built with', goalEntries.length, 'goal(s)');
          } else {
            console.warn('[Tahdiri] Enrichment: no goals found for lessonId', lessonId, '— using empty array');
          }
        }
      } catch (e) {
        console.warn('[Tahdiri] Enrichment: failed to fetch goals, using empty array', e);
      }

      // 3. IndicativeWords = UTF-8-safe base64 of an Arabic keyword phrase
      let indicativeWords = '';
      try {
        indicativeWords = btoa(unescape(encodeURIComponent('إثراء: ' + lessonName)));
      } catch (e) {
        indicativeWords = btoa('enrichment');
      }

      // 4. Build and POST the Enrichment payload
      const payload = new URLSearchParams();
      payload.append('__RequestVerificationToken', token);
      payload.append('Id', '0');            // NOTE: Enrichment uses "0", NOT "" like Activity
      payload.append('IsEduResource', 'true');
      payload.append('SelectedUnitId', String(subjectId));
      payload.append('SelectedGoles', selectedGolesB64);
      payload.append('ActivityType', '1');
      payload.append('Name', 'إثراء: ' + lessonName);
      payload.append('Description', 'إثراء: ' + lessonName);
      payload.append('IndicativeWords', indicativeWords);
      payload.append('TypeId', '1');
      payload.append('FileType', '1');
      payload.append('Link', 'https://ien.edu.sa');
      payload.append('hfLevelsCount', '1'); // NOTE: Enrichment uses "1", NOT "3"
      payload.append('hfDrawTree', hfDrawTree);
      payload.append('SchoolId', schoolId);

      console.log('[Tahdiri] Enrichment POST payload → Name:', 'إثراء: ' + lessonName, '| hfLevelsCount:1 | golesLen:', selectedGolesB64.length);
      try {
        const saveRes = await fetch('/LearningResources/MangeResources/Create', {
          method: 'POST',
          credentials: 'same-origin',
          redirect: 'manual',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: payload.toString()
        });
        // 302 / opaqueredirect = success (same pattern as Activity)
        if (saveRes.type === 'opaqueredirect' || saveRes.status === 0 || saveRes.status === 302) {
          console.log('[Tahdiri] ✅ Enrichment created successfully');
          return true;
        }
        console.warn('[Tahdiri] Enrichment: unexpected response status', saveRes.status);
        return saveRes.ok;
      } catch (e) {
        console.error('[Tahdiri] Enrichment: POST failed', e);
        return false;
      }
    }

    // ── Session 3: Homework / Assignment (واجب) silent API creation ────────────────
    // Flow: before-snapshot → AddQuestionListPaging (get IEN question IDs) → Manage POST
    //       → poll GetAssignmentsList until DIFF exposes the new AssignmentId.
    // Returns '' on any failure (fail-soft — never aborts the lesson save).
    async function silentCreateHomeworkResource(subjectId, chapterId, lessonId, lessonName, realSchoolId) {
      const schoolId     = String(realSchoolId).trim();
      const subjectIdStr = String(subjectId).trim();
      const lessonIdStr  = String(lessonId).trim();
      const chapterIdStr = String(chapterId).trim();

      // ── Inner helper: call GetAssignmentsList → Set of Assignment IDs ──────
      async function _hwSnapshot(label) {
        const body = new URLSearchParams();
        body.append('title', '');
        body.append('lectureAssignmentsList', '');
        body.append('sumLectureAssignmentsGradeBook', '0');
        body.append('selectedUnitId', subjectIdStr);
        body.append('treeId', lessonIdStr);
        body.append('lessonsId[]', lessonIdStr);
        body.append('childOfSubject', chapterIdStr);
        body.append('schoolId', schoolId);
        body.append('accessType', '');
        body.append('createdByme', 'false');
        const snapIds = new Set();
        try {
          const res = await fetch('/Teacher/LectureTools/GetAssignmentsList', {
            method: 'POST',
            credentials: 'same-origin',
            redirect: 'follow',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'Accept': '*/*',
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: body.toString()
          });
          let htmlInner = await res.text();
          try { const j = JSON.parse(htmlInner); if (j && typeof j.html === 'string') htmlInner = j.html; } catch (e) {}
          // Captured shapes:
          //   <a class="selectAssignment ..." id="225114942">
          //   <input value="225114942" name="assignmentId_225114942" id="assignmentId_225114942">
          //   checkAssignment(this,225114942)
          const pats = [
            /class=["'][^"']*selectAssignment[^"']*["'][^>]*id=["'](\d{6,12})["']/gi,
            /id=["'](\d{6,12})["'][^>]*class=["'][^"']*selectAssignment/gi,
            /name=["']assignmentId_(\d{6,12})["']/gi,
            /id=["']assignmentId_(\d{6,12})["']/gi,
            /value=["'](\d{6,12})["'][^>]*(?:name|id)=["']assignmentId_\d{6,12}["']/gi,
            /(?:name|id)=["']assignmentId_\d{6,12}["'][^>]*value=["'](\d{6,12})["']/gi,
            /hfGradeBookTotalValue_(\d{6,12})/gi,
            /assignmentId=(\d{6,12})/gi,
            /checkAssignment\(\s*this\s*,\s*(\d{6,12})\s*\)/gi
          ];
          for (const pat of pats) {
            let m; pat.lastIndex = 0;
            while ((m = pat.exec(htmlInner)) !== null) snapIds.add(String(m[1]));
          }
        } catch (e) {
          console.warn('[Tahdiri] Homework snapshot (' + label + ') threw:', e && e.message);
        }
        console.log('[Tahdiri] Homework ' + label + ' snapshot:', snapIds.size, 'assignment(s)');
        return snapIds;
      }

      function _pickNewestAssignmentId(ids) {
        const arr = [...ids].filter(Boolean);
        if (arr.length === 0) return '';
        return String(arr.map(s => BigInt(s)).sort((a, b) => (a > b ? -1 : a < b ? 1 : 0))[0]);
      }

      async function _waitForNewHomeworkId(beforeSnap) {
        // GetAssignmentsList can lag far behind Assignments/Manage. The manual
        // capture showed ~30s, so poll longer than the activity path.
        const waitSchedule = [1000, 2000, 4000, 4000, 5000, 5000, 5000, 5000, 5000];
        let waitedMs = 0;
        for (let i = 0; i < waitSchedule.length; i++) {
          await new Promise(function (r) { setTimeout(r, waitSchedule[i]); });
          waitedMs += waitSchedule[i];
          const afterSnap = await _hwSnapshot('after-probe-' + (i + 1));
          const newIds = [...afterSnap].filter(function (id) { return !beforeSnap.has(id); });
          if (newIds.length === 1) {
            console.log('[Tahdiri] ✅ Homework DIFF SUCCESS — AssignmentId:', newIds[0], 'after', waitedMs, 'ms');
            return String(newIds[0]);
          }
          if (newIds.length > 1) {
            const picked = _pickNewestAssignmentId(newIds);
            console.warn('[Tahdiri] Homework DIFF found', newIds.length, 'new assignment IDs; picked newest:', picked, 'all:', newIds);
            return picked;
          }
          console.warn('[Tahdiri] ⏳ Homework DIFF probe', i + 1, 'found no new assignment yet (before=' + beforeSnap.size + ', after=' + afterSnap.size + ').');
        }
        return '';
      }

      // 1. Before snapshot (baseline of current assignments)
      const beforeSnap = await _hwSnapshot('before');

      // Reuse existing: if an assignment already exists for this lesson, skip creation
      // (server rejects duplicates for the same lesson, causing DIFF to return empty)
      if (beforeSnap.size > 0) {
        const existingId = _pickNewestAssignmentId(beforeSnap);
        console.log('[Tahdiri] Homework: existing assignment found → reusing ID', existingId, '(skipping creation)');
        return existingId;
      }

      // 2. Prime the live homework UI context, then get CSRF token.
      // Current Madrasati UI calls LectureTools/AddAssignment before opening
      // Assignments/Manage. It may return a context-specific Manage URL.
      let csrfToken = document.querySelector('#csrfid')?.value
        || document.querySelector('input[name="__RequestVerificationToken"]')?.value
        || '';
      let homeworkManageGetUrl = '';
      let homeworkManagePostUrl = '/Teacher/Assignments/Manage?isNotUserLayout=True&selectedSubjectId=' + encodeURIComponent(subjectIdStr);
      let homeworkManageDefaults = new URLSearchParams();
      const homeworkManageContextQuery =
        'isNotUserLayout=True' +
        '&selectedSubjectId=' + encodeURIComponent(subjectIdStr) +
        '&selectedTreeId=' + encodeURIComponent(chapterIdStr) +
        '&selectedLessonse=' + encodeURIComponent(lessonIdStr);

      function _normalizeManageUrl(url, baseUrl) {
        try {
          const u = new URL(url, baseUrl || window.location.href);
          if (u.origin === window.location.origin) return u.pathname + u.search;
          return u.href;
        } catch (e) {
          return String(url || '');
        }
      }

      function _rememberManageDefaults(doc, baseUrl) {
        const form = doc.querySelector('form[action*="/Teacher/Assignments/Manage"]') || doc.querySelector('form');
        const root = form || doc;
        root.querySelectorAll('input[name], select[name], textarea[name]').forEach(function (el) {
          const name = el.getAttribute('name');
          if (!name) return;
          const tag = (el.tagName || '').toLowerCase();
          const type = (el.getAttribute('type') || '').toLowerCase();
          if ((type === 'checkbox' || type === 'radio') && !el.checked) return;
          if (tag === 'select') {
            const selectedOptions = Array.prototype.slice.call(el.options || []).filter(function (opt) { return opt.selected; });
            if (selectedOptions.length === 0) {
              homeworkManageDefaults.append(name, el.value || '');
            } else {
              selectedOptions.forEach(function (opt) { homeworkManageDefaults.append(name, opt.value || ''); });
            }
            return;
          }
          const value = tag === 'textarea'
            ? (el.value || el.textContent || '')
            : (el.getAttribute('value') != null ? el.getAttribute('value') : (el.value || ''));
          homeworkManageDefaults.append(name, value);
        });
        const action = (form && form.getAttribute('action')) || '';
        if (action) {
          homeworkManagePostUrl = _normalizeManageUrl(action.replace(/&amp;/g, '&'), baseUrl);
          console.log('[Tahdiri] Homework: Manage POST action scraped:', homeworkManagePostUrl);
        }
      }

      try {
        const addBody = new URLSearchParams();
        addBody.append('selectedUnitId', subjectIdStr);
        addBody.append('treeId', lessonIdStr);
        addBody.append('lessonsId[]', lessonIdStr);
        addBody.append('childOfSubject', chapterIdStr);
        addBody.append('schoolId', schoolId);
        addBody.append('isNotUserLayout', 'True');
        addBody.append('selectedSubjectId', subjectIdStr);
        addBody.append('selectedTreeId', chapterIdStr);
        addBody.append('selectedLessonse', lessonIdStr);
        const addRes = await fetch('/Teacher/LectureTools/AddAssignment', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: addBody.toString()
        });
        const addRaw = await addRes.text();
        let addHtml = addRaw;
        try {
          const j = JSON.parse(addRaw);
          const jsonParts = [addRaw];
          ['html', 'url', 'Url', 'redirectUrl', 'RedirectUrl', 'location', 'Location'].forEach(function (key) {
            if (j && typeof j[key] === 'string') jsonParts.push(j[key]);
          });
          addHtml = jsonParts.join('\n');
        } catch (e) {}
        const manageMatch = addHtml.match(/(?:href|action)=["']([^"']*\/Teacher\/Assignments\/Manage\?[^"']+)["']/i)
          || addHtml.match(/["'](\/Teacher\/Assignments\/Manage\?[^"']+)["']/i);
        if (manageMatch && manageMatch[1]) {
          homeworkManageGetUrl = manageMatch[1].replace(/&amp;/g, '&');
          console.log('[Tahdiri] Homework: AddAssignment returned Manage URL:', homeworkManageGetUrl.slice(0, 180));
        } else {
          const assignmentMatch = addHtml.match(/[?&]assignmentId=([^&"'<>]+)/i)
            || addHtml.match(/["']assignmentId["']\s*:\s*["']([^"']+)["']/i);
          if (assignmentMatch && assignmentMatch[1]) {
            homeworkManageGetUrl =
              '/Teacher/Assignments/Manage?assignmentId=' + assignmentMatch[1].replace(/&amp;/g, '&') +
              '&schoolId=' + encodeURIComponent(schoolId) +
              '&' + homeworkManageContextQuery;
            console.log('[Tahdiri] Homework: AddAssignment returned assignmentId; built Manage URL:', homeworkManageGetUrl.slice(0, 180));
          }
          console.log('[Tahdiri] Homework: AddAssignment status', addRes.status, '(no Manage URL found)');
        }
      } catch (e) {
        console.warn('[Tahdiri] Homework: AddAssignment preflight failed, continuing with direct Manage route:', e && e.message);
      }

      const manageGetCandidates = [];
      if (homeworkManageGetUrl) manageGetCandidates.push(homeworkManageGetUrl);
      manageGetCandidates.push('/Teacher/Assignments/Manage?' + homeworkManageContextQuery + '&schoolId=' + encodeURIComponent(schoolId));
      manageGetCandidates.push('/Teacher/Assignments/Manage?isNotUserLayout=True&selectedSubjectId=' + encodeURIComponent(subjectIdStr));
      const seenManageUrls = new Set();
      for (const getUrl of manageGetCandidates) {
        if (!getUrl || seenManageUrls.has(getUrl)) continue;
        seenManageUrls.add(getUrl);
        try {
          const getRes = await fetch(getUrl, { credentials: 'same-origin' });
          const html = await getRes.text();
          const doc = new DOMParser().parseFromString(html, 'text/html');
          const defaultsBefore = homeworkManageDefaults.toString();
          _rememberManageDefaults(doc, getUrl);
          const pageToken = doc.querySelector('input[name="__RequestVerificationToken"]')?.value
            || doc.querySelector('meta[name="RequestVerificationToken"]')?.content
            || '';
          if (pageToken) csrfToken = pageToken;
          if (pageToken || homeworkManageDefaults.toString() !== defaultsBefore) {
            console.log('[Tahdiri] Homework: Manage page scraped from:', getUrl.slice(0, 180));
            break;
          }
        } catch (e) {
          console.warn('[Tahdiri] Homework: failed to scrape Manage page', getUrl, e && e.message);
        }
      }
      if (!csrfToken) {
        console.error('[Tahdiri] Homework: no CSRF token — aborting');
        return '';
      }

      // 3. AddQuestionListPaging → fetch first IEN question ID available for this lesson
      //    Payload mirrors the competitor HAR exactly (note: "eschoolId" not "schoolId"!)
      let questionIds = [];
      try {
        const qBody = new URLSearchParams();
        qBody.append('subjectId',     subjectIdStr);
        qBody.append('eschoolId',     schoolId);   // NOTE: eschoolId, NOT schoolId!
        qBody.append('treeId',        lessonIdStr);
        qBody.append('lessonId',      lessonIdStr);
        qBody.append('isTreelevel',   'false');
        qBody.append('pageNumber',    '1');
        qBody.append('searchInput',   '');
        qBody.append('questionType',  '');
        qBody.append('difficultyLevel', '');
        qBody.append('creator',       '0');
        const qRes  = await fetch('/Teacher/Assignments/AddQuestionListPaging', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'requestverificationtoken': csrfToken
          },
          body: qBody.toString()
        });
        let qHtml = await qRes.text();
        try { const j = JSON.parse(qHtml); if (j && typeof j.html === 'string') qHtml = j.html; } catch (e) {}
        // Try multiple ID extraction patterns for the Q-bank HTML
        const qPatterns = [
          /data-questionid=["'](\d{4,12})["']/gi,
          /data-qid=["'](\d{4,12})["']/gi,
          /id=["']q_(\d{4,12})["']/gi,
          /<input[^>]+type=["']checkbox["'][^>]+value=["'](\d{4,12})["']/gi,
          /name=["']questionId["'][^>]*value=["'](\d{4,12})["']/gi,
          /value=["'](\d{4,12})["'][^>]*name=["']questionId["']/gi,
          /class=["'][^"']*addQuestion[^"']*["'][^>]*data-id=["'](\d{4,12})["']/gi,
          /data-id=["'](\d{4,12})["'][^>]*class=["'][^"']*question/gi
        ];
        const qSet = new Set();
        for (const pat of qPatterns) {
          let m; pat.lastIndex = 0;
          while ((m = pat.exec(qHtml)) !== null) qSet.add(Number(m[1]));
        }
        questionIds = [...qSet].slice(0, 1); // one question per assignment (competitor pattern)
        console.log('[Tahdiri] Homework: AddQuestionListPaging found', qSet.size, 'question(s) → using:', questionIds);
      } catch (e) {
        console.warn('[Tahdiri] Homework: AddQuestionListPaging failed', e);
      }
      if (questionIds.length === 0) {
        console.warn('[Tahdiri] Homework: no IEN questions for lesson', lessonIdStr, '— will create assignment without questions');
      }

      // 4. POST to the live UI route:
      //    /Teacher/Assignments/Manage?isNotUserLayout=True&selectedSubjectId=<subject>
      //    Notes: "X-Requested-With" IS also in body (Madrasati quirk); empty key quirk preserved.
      const manageBody = new URLSearchParams(homeworkManageDefaults.toString());
      function _setManage(name, value) { manageBody.set(name, value); }
      _setManage('__RequestVerificationToken', csrfToken);
      _setManage('Grade',          '1');
      _setManage('SaveButton',     '');
      _setManage('IdEnc',          manageBody.get('IdEnc') || '');
      _setManage('Id',             manageBody.get('Id') || '0');
      _setManage('TreeId',         lessonIdStr);
      _setManage('IsTreeLevel',    'false');
      _setManage('IsQuran',        'false');
      _setManage('txt_UploadUrl',  '/Teacher/Assignments/UploadFile');
      _setManage('SelectedUnitId', subjectIdStr);
      _setManage('SelectedTrees_2', chapterIdStr);
      _setManage('SelectedTrees_3', lessonIdStr);
      _setManage('selectedSubjectId', subjectIdStr);
      _setManage('selectedTreeId', chapterIdStr);
      _setManage('selectedLessonse', lessonIdStr);
      _setManage('isNotUserLayout', 'True');
      _setManage('Name',           'واجب (' + lessonName + ')');
      _setManage('QuranLessonType', '1');
      _setManage('QuranLessonId',  '');
      _setManage('AssignmentType', '3');
      manageBody.append('',        '');  // Madrasati quirk: empty key+value pair
      _setManage('Description',    '');
      _setManage('filePath',       '');
      _setManage('PageNumber',     '');
      _setManage('QuestionsNumber', '');
      _setManage('SolvingType',    '4');
      _setManage('AccessType',     'True');
      _setManage('schoolId',       schoolId);
      _setManage('hfLevelsCount',  '3');
      _setManage('hfDrawTree',     manageBody.get('hfDrawTree') || '/Teacher/Assignments/DrawTreeToClassLesson');
      _setManage('X-Requested-With', 'XMLHttpRequest'); // Madrasati quirk: also in body!
      questionIds.forEach(function (qId, i) {
        manageBody.append('AssignmentQuestionsList[' + i + '].Id', String(qId));
        manageBody.append('AssignmentQuestionsList[' + i + '].Grade', '1');
        manageBody.append('AssignmentQuestionsList[' + i + '].IsIenQuestion', 'True');
      });
      manageBody.append('IsEditDraft', 'False');
      manageBody.append('IsDraft',     'false');

      try {
        const manageUrl = homeworkManagePostUrl || ('/Teacher/Assignments/Manage?isNotUserLayout=True&selectedSubjectId=' + encodeURIComponent(subjectIdStr));
        const manageRes  = await fetch(manageUrl, {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'requestverificationtoken': csrfToken
          },
          body: manageBody.toString()
        });
        const manageText = await manageRes.text();
        try {
          const j = JSON.parse(manageText);
          if (j && (j.success === false || j.Success === false)) {
            console.warn('[Tahdiri] Homework Manage returned success:false →', JSON.stringify(j).slice(0, 200));
            return '';
          }
        } catch (e) {}
        if (!manageRes.ok) {
          console.warn('[Tahdiri] Homework: Manage POST status', manageRes.status); return '';
        }
        console.log('[Tahdiri] Homework Manage POST accepted (status', manageRes.status + ')');
      } catch (e) {
        console.error('[Tahdiri] Homework: Manage POST failed', e); return '';
      }

      // 5. Poll GetAssignmentsList until the new AssignmentId appears, then link it.
      const assignmentId = await _waitForNewHomeworkId(beforeSnap);
      if (!assignmentId) {
        console.warn('[Tahdiri] Homework: DIFF found no new assignment IDs after polling (DB lag or creation rejected)');
        return '';
      }
      console.log('[Tahdiri] ✅ Homework created — AssignmentId:', assignmentId);
      return assignmentId;
    }

    // ─────────────────────────────────────────────────────────────────────────
    // silentCreateExamResource – Session 4 asset
    //
    // Flow:
    //   1. Before snapshot (GetExamsList DIFF baseline)
    //   2. GET /Teacher/Exams/Manage?SchoolId=<hash> → scrape HashKey + CSRF
    //   3. POST GetGoalLessonSubject → GoalIds for this lesson
    //   4. POST ExamQuestionSettings (hardcoded 5-question distribution) → parse IDs
    //   5. POST Exams/Manage (full payload + QuestionsList)
    //   6. Wait 1.5s → after snapshot → DIFF → return numeric ExamId string
    // ─────────────────────────────────────────────────────────────────────────
    async function silentCreateExamResource(subjectId, chapterId, lessonId, lessonName, realSchoolId) {
      const schoolId     = String(realSchoolId).trim();
      const subjectIdStr = String(subjectId).trim();
      const lessonIdStr  = String(lessonId).trim();
      const chapterIdStr = String(chapterId).trim();
      const examName     = 'اختبار (' + lessonName + ')';

      // ── Inner helper: snapshot GetExamsList → Set of numeric Exam IDs ──────
      async function _examSnapshot(label) {
        const body = new URLSearchParams();
        body.append('title', '');
        body.append('lectureExamsList', '');
        body.append('sumLectureExamsGradeBook', '0');
        body.append('selectedUnitId', subjectIdStr);
        body.append('treeId', lessonIdStr);
        body.append('lessonsId[]', lessonIdStr);
        body.append('childOfSubject', chapterIdStr);
        body.append('schoolId', schoolId);
        body.append('accessType', '');
        body.append('createdByme', 'false');
        const snapIds = new Set();
        try {
          const res = await fetch('/Teacher/LectureTools/GetExamsList', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'X-Requested-With': 'XMLHttpRequest'
            },
            body: body.toString()
          });
          let html = await res.text();
          try { const j = JSON.parse(html); if (j && typeof j.html === 'string') html = j.html; } catch (e) {}
          const pats = [
            /id=["'](\d{6,12})["'][^>]*class=["'][^"']*gradeQuestion/gi,
            /class=["'][^"']*gradeQuestion[^"']*["'][^>]*id=["'](\d{6,12})["']/gi,
            /id=["']ExamId_(\d{6,12})["']/gi,
            /data-exam-id=["'](\d{6,12})["']/gi
          ];
          for (const pat of pats) {
            let m; pat.lastIndex = 0;
            while ((m = pat.exec(html)) !== null) snapIds.add(Number(m[1]));
          }
        } catch (e) {
          console.warn('[Tahdiri] Exam snapshot (' + label + ') threw:', e && e.message);
        }
        console.log('[Tahdiri] Exam ' + label + ' snapshot:', snapIds.size, 'exam(s)');
        return snapIds;
      }

      // 1. Before snapshot
      const beforeSnap = await _examSnapshot('before');

      // Reuse existing: if an exam already exists for this lesson, skip creation
      if (beforeSnap.size > 0) {
        const existingId = String([...beforeSnap][0]);
        console.log('[Tahdiri] Exam: existing exam found → reusing ID', existingId, '(skipping creation)');
        return existingId;
      }

      // 2. GET Exams/Manage page → scrape HashKey + __RequestVerificationToken
      let csrfToken  = '';
      let hashKey    = '';
      let hfDrawTree = '/Exams/DrawTreeToClassLesson';
      try {
        const getRes = await fetch('/Teacher/Exams/Manage?SchoolId=' + encodeURIComponent(schoolId), {
          credentials: 'same-origin'
        });
        const pageHtml = await getRes.text();
        const doc      = new DOMParser().parseFromString(pageHtml, 'text/html');
        const hashKeyEl = doc.querySelector('[name="HashKey"]');
        hashKey = hashKeyEl ? (hashKeyEl.value || '') : '';
        if (hashKeyEl) {
          const scopedForm = hashKeyEl.closest('form');
          if (scopedForm) {
            csrfToken = (scopedForm.querySelector('[name="__RequestVerificationToken"]') || {}).value || '';
          }
        }
        if (!csrfToken) {
          const allTokens = doc.querySelectorAll('[name="__RequestVerificationToken"]');
          for (const el of allTokens) {
            if (el.value && el.value.length > 20) { csrfToken = el.value; break; }
          }
        }
        const hfEl = doc.querySelector('[name="hfDrawTree"]');
        if (hfEl && hfEl.value) hfDrawTree = hfEl.value;
        console.log('[Tahdiri] Exam: GET Manage scraped → csrfToken:', csrfToken ? csrfToken.slice(0, 20) + '…' : 'EMPTY',
          '| hashKey:', hashKey ? hashKey.slice(0, 20) + '…' : 'EMPTY');
      } catch (e) {
        console.error('[Tahdiri] Exam: failed GET Manage page:', e && e.message);
        return '';
      }
      if (!csrfToken || !hashKey) {
        console.error('[Tahdiri] Exam: missing CSRF or HashKey — aborting. csrfToken:', !!csrfToken, 'hashKey:', !!hashKey);
        return '';
      }

      // 3. Get GoalIds for this lesson (same pattern as Enrichment)
      let goalIds = [];
      try {
        const goalsRes = await fetch('/LearningResources/MangeResources/GetGoalLessonSubject', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: 'subjectId=' + encodeURIComponent(subjectIdStr)
        });
        const goalsData = await goalsRes.json();
        if (Array.isArray(goalsData)) {
          const lessonIdNum = parseInt(lessonIdStr, 10);
          goalIds = goalsData
            .filter(function (row) { return row && row.GoalId && Number(row.LessonId) === lessonIdNum; })
            .map(function (row) { return row.GoalId; });
          console.log('[Tahdiri] Exam: GoalIds found:', goalIds.length);
        }
      } catch (e) {
        console.warn('[Tahdiri] Exam: failed to fetch GoalIds, proceeding without:', e && e.message);
      }

      // 4. ExamQuestionSettings + Exams/Manage
      //    Hardcoded 5-question distribution from competitor HAR (1 per type/difficulty bucket):
      //      MCQ-easy, MCQ-medium, T/F-easy, T/F-medium, Matching-easy
      const LIST_DIST = [
        { NumberOfQuestions: 1, QuestionTypeCode: 0, DifficultyFactor: 0, itemCount: 1 },
        { NumberOfQuestions: 1, QuestionTypeCode: 0, DifficultyFactor: 1, itemCount: 1 },
        { NumberOfQuestions: 1, QuestionTypeCode: 3, DifficultyFactor: 0, itemCount: 1 },
        { NumberOfQuestions: 1, QuestionTypeCode: 3, DifficultyFactor: 1, itemCount: 1 },
        { NumberOfQuestions: 1, QuestionTypeCode: 6, DifficultyFactor: 0, itemCount: 1 }
      ];

      // Build the shared payload (ExamQuestionSettings + Exams/Manage use identical base)
      function _buildExamBody() {
        const p = new URLSearchParams();
        p.append('__RequestVerificationToken', csrfToken);
        p.append('HashKey',           hashKey);
        p.append('Id',                '0');
        p.append('LessonParentId',    chapterIdStr);
        p.append('TreeId',            lessonIdStr);
        p.append('LessonId',          lessonIdStr);
        p.append('IsTreeLevel',       '');
        p.append('ExamId',            '');
        p.append('SchoolId',          schoolId);
        p.append('ExamCategory',      '3');  // sent twice (quirk)
        p.append('ExamCategory',      '');
        p.append('SelectedUnitId',    subjectIdStr);
        p.append('SelectedTrees_2',   chapterIdStr);
        p.append('SelectedTrees_3',   lessonIdStr);
        p.append('Name',              examName);
        p.append('ExamType',          '2');  // sent twice (quirk)
        p.append('ExamType',          '');
        p.append('ExamQuestionSource', 'ien');
        p.append('Description',       '');
        p.append('AccessType',        'True');
        p.append('AllowLessonContent', 'true');   // sent twice (quirk)
        p.append('AllowLessonContent', 'false');
        p.append('hfLevelsCount',     '3');
        p.append('hfDrawTree',        hfDrawTree);
        LIST_DIST.forEach(function (item, i) {
          p.append('List[' + i + '].NumberOfQuestions', String(item.NumberOfQuestions));
          p.append('List[' + i + '].QuestionTypeCode',  String(item.QuestionTypeCode));
          p.append('List[' + i + '].DifficultyFactor',  String(item.DifficultyFactor));
          p.append('List[' + i + '].itemCount',         String(item.itemCount));
        });
        p.append('IsEditDraft', 'False');
        goalIds.forEach(function (gId) { p.append('GoalIds', String(gId)); });
        return p;
      }

      // Call ExamQuestionSettings to get available question IDs per type+difficulty
      const questionsByBucket = {}; // "typeCode:difficulty" → [id, ...]
      try {
        const eqsRes = await fetch('/Teacher/Exams/ExamQuestionSettings', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'requestverificationtoken': csrfToken
          },
          body: _buildExamBody().toString()
        });
        let eqsHtml = await eqsRes.text();
        try { const j = JSON.parse(eqsHtml); if (j && typeof j.html === 'string') eqsHtml = j.html; } catch (e) {}

        // Try rich patterns first (id + typeCode + difficulty on same element)
        const richPats = [
          /data-id=["'](\d{4,12})["'][^>]{0,200}?data-(?:typecode|type-code|questiontype)=["'](\d+)["'][^>]{0,200}?data-(?:difficultyfactor|difficulty-factor|difficulty)=["'](\d+)["']/gi,
          /data-(?:typecode|type-code|questiontype)=["'](\d+)["'][^>]{0,200}?data-(?:difficultyfactor|difficulty-factor|difficulty)=["'](\d+)["'][^>]{0,200}?data-id=["'](\d{4,12})["']/gi,
          /data-qid=["'](\d{4,12})["'][^>]{0,200}?data-type=["'](\d+)["'][^>]{0,200}?data-difficulty=["'](\d+)["']/gi
        ];
        let richFound = false;
        for (const pat of richPats) {
          let m; pat.lastIndex = 0;
          while ((m = pat.exec(eqsHtml)) !== null) {
            richFound = true;
            // Group 1=id, 2=typeCode, 3=difficulty  OR  1=typeCode, 2=difficulty, 3=id
            let qId, typeCode, diff;
            if (pat.source.startsWith('data-id')) {
              qId = m[1]; typeCode = m[2]; diff = m[3];
            } else if (pat.source.startsWith('data-(?:typecode')) {
              typeCode = m[1]; diff = m[2]; qId = m[3];
            } else {
              qId = m[1]; typeCode = m[2]; diff = m[3];
            }
            const key = typeCode + ':' + diff;
            if (!questionsByBucket[key]) questionsByBucket[key] = [];
            questionsByBucket[key].push(Number(qId));
          }
          if (richFound) break;
        }

        // Fallback: plain ID collection (assign in LIST_DIST order)
        if (!richFound) {
          const simIds = [];
          const simPat = /data-(?:questionid|question-id|qid|id)=["'](\d{4,12})["']/gi;
          let m; simPat.lastIndex = 0;
          while ((m = simPat.exec(eqsHtml)) !== null) simIds.push(Number(m[1]));
          simIds.forEach(function (id, idx) {
            if (idx < LIST_DIST.length) {
              const item = LIST_DIST[idx];
              const key  = item.QuestionTypeCode + ':' + item.DifficultyFactor;
              if (!questionsByBucket[key]) questionsByBucket[key] = [];
              questionsByBucket[key].push(id);
            }
          });
        }
        console.log('[Tahdiri] Exam: ExamQuestionSettings → buckets found:', Object.keys(questionsByBucket).length);
      } catch (e) {
        console.warn('[Tahdiri] Exam: ExamQuestionSettings threw (will attempt Manage without QuestionsList):', e && e.message);
      }

      // 5. POST Exams/Manage
      const manageBody = _buildExamBody();
      // Append QuestionsList for each bucket that has IDs
      let qIdx = 0;
      LIST_DIST.forEach(function (item) {
        const key       = item.QuestionTypeCode + ':' + item.DifficultyFactor;
        const available = (questionsByBucket[key] || []).slice();
        if (available.length > 0) {
          const qId = available[0];
          manageBody.append('QuestionsList[' + qIdx + '].GradeInAssignment', '1');
          manageBody.append('QuestionsList[' + qIdx + '].QuestionTypeCodeNo', String(item.QuestionTypeCode));
          manageBody.append('QuestionsList[' + qIdx + '].DifficultyFactorNo', String(item.DifficultyFactor));
          manageBody.append('QuestionsList[' + qIdx + '].Id', String(qId));
          qIdx++;
        }
      });
      manageBody.append('IsDraft', 'false');
      console.log('[Tahdiri] Exam: Manage POST → Name:', examName, '| questions selected:', qIdx);
      try {
        const manageRes = await fetch('/Teacher/Exams/Manage', {
          method: 'POST',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: manageBody.toString()
        });
        const manageText = await manageRes.text();
        try {
          const j = JSON.parse(manageText);
          if (j && (j.success === false || j.Success === false)) {
            console.warn('[Tahdiri] Exam: Manage returned success:false →', JSON.stringify(j).slice(0, 200));
            return '';
          }
        } catch (e) {}
        if (!manageRes.ok) {
          console.warn('[Tahdiri] Exam: Manage POST status', manageRes.status);
          return '';
        }
        console.log('[Tahdiri] Exam: Manage POST accepted (status', manageRes.status + ')');
      } catch (e) {
        console.error('[Tahdiri] Exam: Manage POST failed:', e && e.message);
        return '';
      }

      // 6. DIFF GetExamsList → new ExamId
      await new Promise(function (r) { setTimeout(r, 1500); });
      const afterSnap = await _examSnapshot('after');
      const newIds    = [...afterSnap].filter(function (id) { return !beforeSnap.has(id); });
      if (newIds.length === 0) {
        console.warn('[Tahdiri] Exam: DIFF found no new exam IDs (DB lag?) — returning empty');
        return '';
      }
      const examId = String(newIds[0]);
      console.log('[Tahdiri] ✅ Exam created — ExamId:', examId);
      return examId;
    }

    function _sanitizeFilename(str) {
      if (!str) return "lesson";
      return String(str)
        .replace(/[\\\/:*?"<>|]/g, "_")
        .replace(/\s+/g, "_")
        .replace(/_{2,}/g, "_")
        .slice(0, 120);
    }

    async function bulkDownloadAllLecturePDFs(opts) {
      opts = opts || {};
      const delayMs = opts.delayMs || 2500;

      // 1. نجيب كل الكروت الخضراء
      const cards = Array.from(document.querySelectorAll("div.cs-lesson-card"))
        .filter(c => c.querySelector(".schedule-card.done") || c.classList.contains("tahdiri-processed"));

      if (!cards.length) {
        console.warn("[Tahdiri-Bulk] مفيش دروس محضرّة (خضراء) في الصفحة دي.");
        return;
      }

      console.log(`[Tahdiri-Bulk] جاري العمل على ${cards.length} درس...`);

      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const lessonTitle = card.querySelector("h2")?.textContent.trim() || "lesson";
        console.log(`[${i + 1}/${cards.length}] جاري معالجة: ${lessonTitle}`);

        try {
          // 2. ندور على رابط صفحة التفاصيل (الرابط اللي بيوديك لصفحة الدرس)
          const detailsLink = card.querySelector("a")?.href;
          if (!detailsLink) continue;

          // 3. نفتح صفحة التفاصيل في الخلفية
          const response = await fetch(detailsLink);
          const html = await response.text();

          // 4. ندور جوه صفحة التفاصيل على زرار الطباعة الأصلي
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const printBtn = doc.querySelector("a[href*='PrintLecture']");

          if (printBtn) {
            const printUrl = new URL(printBtn.href, window.location.origin).href;

            // 5. نحمل صفحة الطباعة
            const printRes = await fetch(printUrl);
            const printHtml = await printRes.text();

            // 6. حفظ الملف
            const blob = new Blob([printHtml], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${_sanitizeFilename(lessonTitle)}__${i + 1}.html`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            console.log(`%c [✓] تم حفظ: ${lessonTitle}`, "color: green");
          } else {
            console.warn(`[!] ملقيتش زرار طباعة جوه درس: ${lessonTitle}`);
          }

        } catch (err) {
          console.error(`[X] فشل في معالجة ${lessonTitle}:`, err);
        }

        // تأخير عشان السيرفر ميزعلش
        await new Promise(r => setTimeout(r, delayMs));
      }
      console.log("[Tahdiri-Bulk] مبروك يا هندسة.. الداتا بقت عندك!");
    }

    // Expose for manual invocation from DevTools console
    window.bulkDownloadAllLecturePDFs = bulkDownloadAllLecturePDFs;

    async function silentPrepareLesson(token, selection, passedSubjectId, realSchoolId, lessonCardDiv) {
      const ids = selection.treeValue.split(',');
      if (ids.length < 3) return false;

      // treeValue IDs are ALWAYS used for Activity POST and SaveLastLessonPlan
      // passedSubjectId is only used for ManageLecture URL (CSRF scraping)
      const treeSubjectId = ids[0];   // SelectedUnitId for Activity POST
      const finalSubjectId = passedSubjectId || treeSubjectId; // for ManageLecture URL only
      const chapterId = ids[1];
      const lessonId = ids[2];
      const lessonName = selection.treeText.trim().replace(':', '');

      // 1. Build the ManageLecture URL (use anchor if present, else construct from data-* for blue lessons)
      const cell = lessonCardDiv.closest('td') || lessonCardDiv.parentElement;
      let scrapeUrl = "";
      const anchor = cell ? cell.querySelector('a[href*="ManageLecture"]') : null;

      if (anchor && anchor.href) {
        scrapeUrl = anchor.href;
      } else {
        const dsId = lessonCardDiv.getAttribute('data-subject-id') || passedSubjectId;
        const dcId = lessonCardDiv.getAttribute('data-class-id') || lessonCardDiv.getAttribute('data-classroom-id');
        // The lesson `token` is the canonical TimeTableId/lectureId; data-lecture-id can be the
        // slot index (e.g. "2"), which is wrong for ManageLecture.
        const dlId = token || lessonCardDiv.getAttribute('data-lecture-id');

        if (dsId && dcId && dlId && realSchoolId) {
          scrapeUrl = window.location.origin + "/SchoolSchedule/Schedule/ManageLecture?SchoolId=" + encodeURIComponent(realSchoolId) + "&lectureId=" + encodeURIComponent(dlId) + "&subjectId=" + encodeURIComponent(dsId) + "&classroomId=" + encodeURIComponent(dcId);
        }
      }

      if (!scrapeUrl) {
        console.error("[Tahdiri] ManageLecture link not found and could not be built for this cell", lessonCardDiv);
        return false;
      }

      // ─── Step 1 of DIFF strategy: capture BEFORE snapshot of existing Projects for this scope.
      //     We capture it BEFORE Activity Create so we can detect the new ID afterwards.
      const beforeSnapshot = await fetchProjectsListSnapshot('before-create');
      console.log('[Tahdiri] DIFF baseline captured:', beforeSnapshot.size, 'existing project IDs');

      // Create the Activity FIRST — before any ManageLecture fetch that could invalidate the HashKey
      const activityCreated = await silentCreateActivityResource(treeSubjectId, chapterId, lessonId, lessonName, realSchoolId, null);
      console.log('[Tahdiri] Activity created:', activityCreated);

      if (!activityCreated) {
        console.error("[Tahdiri] Activity creation failed - aborting lesson save.");
        return false;
      }

      // Kick off Enrichment + Homework concurrently with the DB sync polling below.
      // Both run independently — neither their result nor their ID is needed until SaveLastLessonPlan.
      // Fail-soft: if either fails it logs a warning but the lesson save continues.
      const _enrichmentPromise = silentCreateEnrichmentResource(treeSubjectId, chapterId, lessonId, lessonName, realSchoolId)
        .catch(function (e) { console.warn('[Tahdiri] Enrichment creation threw:', e && e.message); return false; });
      const _homeworkPromise = silentCreateHomeworkResource(treeSubjectId, chapterId, lessonId, lessonName, realSchoolId)
        .catch(function (e) { console.warn('[Tahdiri] Homework creation threw:', e && e.message); return ''; });
      const _examPromise = silentCreateExamResource(treeSubjectId, chapterId, lessonId, lessonName, realSchoolId)
        .catch(function (e) { console.warn('[Tahdiri] Exam creation threw:', e && e.message); return ''; });

      // CRITICAL DB sync — Madrasati's GetProjectsList lags 1-15s behind the
      // Activity Create POST depending on server load. We poll up to 5 times
      // with exponential backoff: 1s, 2s, 4s, 4s, 4s (≈15s worst case).
      // Best case: 1 attempt, ~1s total (DB is fast).
      // Worst case: 5 attempts, ~15s total (DB is slow, but we still succeed).
      // After 5 failed attempts, fall through to Tier-B/Tier-C as before.
      var _diffWaitSchedule = [1000, 2000, 4000, 4000, 4000];
      var _diffAttempts = 0;
      var _diffSucceeded = false;
      for (var _attemptIdx = 0; _attemptIdx < _diffWaitSchedule.length; _attemptIdx++) {
        await new Promise(r => setTimeout(r, _diffWaitSchedule[_attemptIdx]));
        _diffAttempts++;
        try {
          var _probeSnapshot = await fetchProjectsListSnapshot('probe-' + _diffAttempts);
          var _probeNewIds = [..._probeSnapshot].filter(id => !beforeSnapshot.has(id));
          if (_probeNewIds.length > 0) {
            console.log('[Tahdiri] ✅ DB sync probe attempt', _diffAttempts, 'detected', _probeNewIds.length, 'new project ID(s) after', _diffWaitSchedule.slice(0, _attemptIdx + 1).reduce(function (a, b) { return a + b; }, 0), 'ms total wait — proceeding to single Tier-A DIFF below');
            _diffSucceeded = true;
            break;
          } else {
            console.warn('[Tahdiri] ⏳ DB sync probe attempt', _diffAttempts, '— no new ID yet (size=' + _probeSnapshot.size + ', baseline=' + beforeSnapshot.size + '). Will retry.');
          }
        } catch (_probeErr) {
          console.warn('[Tahdiri] DB sync probe attempt', _diffAttempts, 'threw:', _probeErr && _probeErr.message);
        }
      }
      if (!_diffSucceeded) {
        console.error('[Tahdiri] ❌ DB sync polling exhausted after', _diffAttempts, 'attempts. Tier-A DIFF will likely fail; falling through to Tier-B (HTML scrape) and Tier-C (Projects/Index).');
      }

      // Collect Enrichment + Homework + Exam results (all three were running concurrently)
      const enrichmentCreated    = await _enrichmentPromise;
      const homeworkAssignmentId = await _homeworkPromise;
      const examId               = await _examPromise;
      console.log('[Tahdiri] Enrichment created:', enrichmentCreated);
      console.log('[Tahdiri] Homework AssignmentId:', homeworkAssignmentId || '(none — will save without assignment)');
      console.log('[Tahdiri] Exam ExamId:', examId || '(none — will save without exam)');

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

      // 3b. Resolve the just-created Activity's ProjectId via a layered probe.
      // Confirmed via prior diagnostics:
      //   - /Projects/Projects/Index/{schoolId} returns only the navbar/page shell (no project IDs in HTML).
      //   - /Teacher/LectureTools/GetActivitiesList → 302 to NotPermitted (forbidden for this role).
      //   - Activity POST returns success but does not echo back the new ProjectId.
      // Strategy: try three sources in order; first numeric ID wins.
      let activityProjectId = '';

      // ─── Helper: call GetProjectsList and return Set of all numeric Project IDs in the response.
      //    Used twice (before + after Activity Create) to compute the diff.
      async function fetchProjectsListSnapshot(label) {
        const body = new URLSearchParams();
        body.append('title', '');
        body.append('lectureProjectsList', '');
        body.append('sumLectureProjectsGradeBook', '0');
        body.append('selectedUnitId', String(finalSubjectId).trim());
        body.append('treeId', String(lessonId).trim());
        body.append('lessonsId[]', String(lessonId).trim());
        body.append('childOfSubject', String(chapterId).trim());
        body.append('accessType', '');
        body.append('createdByme', 'false');
        body.append('schoolId', String(realSchoolId).trim());

        const snapIds = new Set();
        try {
          const res = await fetch('/Teacher/LectureTools/GetProjectsList', {
            method: 'POST',
            credentials: 'same-origin',
            redirect: 'follow',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
              'Accept': '*/*',
              'X-Requested-With': 'XMLHttpRequest',
              'Origin': 'https://schools.madrasati.sa',
              'Referer': location.href
            },
            body: body.toString()
          });
          if (res.status >= 200 && res.status < 400) {
            const bodyText = await res.text();
            let htmlInner = bodyText;
            try {
              const j = JSON.parse(bodyText);
              if (j && typeof j.html === 'string') htmlInner = j.html;
            } catch (_) {}
            // The relevant IDs are on the <a class="selectProject" id="<numeric>">
            // and also in setDefaultDates(<numeric>) onclick handlers.
            const patterns = [
              /class=["'][^"']*selectProject[^"']*["'][^>]*id=["'](\d{6,12})["']/gi,
              /id=["'](\d{6,12})["'][^>]*class=["'][^"']*selectProject/gi,
              /setDefaultDates\(\s*["']?(\d{6,12})["']?\s*\)/g,
              /\/Projects\/Projects\/(?:Edit|Delete|Details|Show)\/(\d{6,12})/g,
              /name=["']LectureProjectsList\[\d+\]\.ProjectId["'][^>]*value=["'](\d{6,12})["']/gi,
              /value=["'](\d{6,12})["'][^>]*name=["']LectureProjectsList\[\d+\]\.ProjectId["']/gi
            ];
            for (const re of patterns) {
              let m;
              while ((m = re.exec(htmlInner)) !== null) snapIds.add(m[1]);
            }
            console.log('[Tahdiri] GetProjectsList snapshot [' + label + ']: status=' + res.status + ', candidates=' + snapIds.size);
          } else {
            console.warn('[Tahdiri] GetProjectsList snapshot [' + label + ']: non-2xx status=' + res.status);
          }
        } catch (e) {
          console.warn('[Tahdiri] GetProjectsList snapshot [' + label + '] threw:', e && e.message);
        }
        return snapIds;
      }

      // ─── Tier A: DIFF-BASED ProjectId resolution (single-attempt version).
      //
      //   We already captured `beforeSnapshot` BEFORE silentCreateActivityResource.
      //   We waited 2000ms for DB sync. Now we take `afterSnapshot` and diff.
      //   The new entry IS our newly-created Activity's ProjectId.
      try {
        const afterSnapshot = await fetchProjectsListSnapshot('after-create');
        const newIds = [...afterSnapshot].filter(id => !beforeSnapshot.has(id));

        if (newIds.length === 1) {
          activityProjectId = newIds[0];
          console.log('[Tahdiri] ✅ Tier-A DIFF SUCCESS — new ProjectId:', activityProjectId,
            '(before:', beforeSnapshot.size, 'after:', afterSnapshot.size, ')');
        } else if (newIds.length > 1) {
          // Race condition (another teacher created an Activity in the same scope in this exact 2-3s window).
          // Pick the largest BigInt as a tiebreaker — our Activity is almost certainly the most recent.
          const sorted = newIds.map(s => BigInt(s)).sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
          activityProjectId = String(sorted[0]);
          console.warn('[Tahdiri] ⚠️ Tier-A DIFF: ' + newIds.length + ' new IDs (race condition?). Picked largest:', activityProjectId, 'all new:', newIds);
        } else if (afterSnapshot.size === beforeSnapshot.size) {
          // No new ID — Activity Create may have failed silently.
          console.error('[Tahdiri] ❌ Tier-A DIFF: no new ID detected (before=' + beforeSnapshot.size + ', after=' + afterSnapshot.size + '). Activity Create likely failed server-side despite returning success.');
        } else {
          console.warn('[Tahdiri] ⚠️ Tier-A DIFF: unexpected state. before=' + beforeSnapshot.size + ' after=' + afterSnapshot.size + ' newIds=' + newIds.length);
        }
      } catch (e) {
        console.warn('[Tahdiri] Tier-A diff threw:', e && e.message);
      }

      // ─── Tier B Scrape ManageLecture HTML
      if (!activityProjectId) {
        try {
          let mlHtml = (typeof dashboardManageLectureHtml === 'string' && dashboardManageLectureHtml.length > 0)
            ? dashboardManageLectureHtml
            : '';
          if (!mlHtml) {
            const mlScrapeUrl = (typeof scrapeUrl === 'string' && scrapeUrl) ? scrapeUrl : '';
            if (mlScrapeUrl) {
              const mlRes = await fetch(mlScrapeUrl, { credentials: 'same-origin' });
              if (mlRes.ok) mlHtml = await mlRes.text();
            }
          }
          if (mlHtml) {
            const candidates = new Set();
            const patterns = [
              /name=["']LectureProjectsList\[\d+\]\.ProjectId["'][^>]*value=["'](\d{5,12})["']/g,
              /value=["'](\d{5,12})["'][^>]*name=["']LectureProjectsList\[\d+\]\.ProjectId["']/g,
              /<option[^>]*value=["'](\d{5,12})["'][^>]*selected/g,
              /data-project-id=["'](\d{5,12})["']/g,
              /ProjectId["']?\s*:\s*["']?(\d{5,12})/g
            ];
            for (const re of patterns) {
              let m;
              while ((m = re.exec(mlHtml)) !== null) candidates.add(m[1]);
            }
            if (candidates.size > 0) {
              const sorted = [...candidates].map(s => BigInt(s)).sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
              activityProjectId = String(sorted[0]);
            }
          }
        } catch (e) {}
      }

      // ─── Tier C Scrape Projects/Index
      if (!activityProjectId) {
        try {
          const indexUrl = `/Projects/Projects/Index/${encodeURIComponent(realSchoolId)}?hfLevelsCount=3`;
          const projRes = await fetch(indexUrl, { credentials: 'same-origin' });
          if (projRes.ok) {
            const html = await projRes.text();
            const idCandidates = new Set();
            const patterns = [
              /data-id=["'](\d{5,12})["']/g,
              /\/Projects\/Projects\/(?:Edit|Delete|Details)\/(\d{5,12})/g,
              /ProjectId["']?\s*[:=]\s*["']?(\d{5,12})/g,
              /name=["']ProjectId["'][^>]*value=["'](\d{5,12})["']/g,
              /value=["'](\d{5,12})["'][^>]*name=["']ProjectId["']/g,
              /<input[^>]+id=["']ProjectId_(\d{5,12})["']/g
            ];
            for (const re of patterns) {
              let m;
              while ((m = re.exec(html)) !== null) idCandidates.add(m[1]);
            }
            if (idCandidates.size > 0) {
              const sorted = [...idCandidates].map(s => BigInt(s)).sort((a, b) => (a > b ? -1 : a < b ? 1 : 0));
              activityProjectId = String(sorted[0]);
            }
          }
        } catch (e) {}
      }

      if (activityProjectId) {
        console.log('[Tahdiri] ✅ Final ProjectId for SaveLastLessonPlan:', activityProjectId);
      } else {
        console.warn('[Tahdiri] ❌ No ProjectId resolved from any tier — SaveLastLessonPlan will be sent without it.');
      }

      // 3c. NOW fetch ManageLecture for the SaveLastLessonPlan CSRF (after Activity is safely created)
      let formHtml = "";
      let finalUrl = scrapeUrl;
      try {
        const formRes = await fetch(scrapeUrl, { credentials: "same-origin" });
        formHtml = await formRes.text();
        finalUrl = formRes.url;
      } catch (e) {
        console.error("[Tahdiri] Failed to fetch ManageLecture page", e);
        return false;
      }

      // ── Diagnostic only — do not change behavior ────────────────────
      console.log("[Tahdiri-DIAG] ManageLecture fetch →",
        "scrapeUrl:", scrapeUrl,
        "| finalUrl:", finalUrl,
        "| activityPostedToSchoolId:", realSchoolId);
      try {
        const finalSchoolMatch = String(finalUrl || "").match(/[?&]SchoolId=([a-f0-9]{32})/i);
        const trueSchoolId = finalSchoolMatch ? finalSchoolMatch[1] : null;
        if (trueSchoolId && trueSchoolId.toLowerCase() !== String(realSchoolId).toLowerCase()) {
          console.warn(
            "[Tahdiri-DIAG] *** SchoolId MISMATCH ***\n" +
            "  posted activity under: " + realSchoolId + "\n" +
            "  ManageLecture's true school: " + trueSchoolId + "\n" +
            "  This is the ARCHITECTURE.md §3 multi-school case. Save will likely 302 to NotPermitted."
          );
        } else if (trueSchoolId) {
          console.log("[Tahdiri-DIAG] SchoolId match OK:", trueSchoolId);
        } else {
          console.log("[Tahdiri-DIAG] No SchoolId in finalUrl. finalUrl was:", finalUrl);
        }
      } catch (e) { /* diagnostic only */ }

      const doc = new DOMParser().parseFromString(formHtml, "text/html");
      let freshCsrf = doc.querySelector('input[name="__RequestVerificationToken"]')?.value;

      if (!freshCsrf) {
        freshCsrf = getCsrfToken();
        console.warn("[Tahdiri] ManageLecture redirected — using dashboard CSRF as fallback.");
      }

      if (!freshCsrf) {
        console.error("[Tahdiri] CSRF token not found. Aborting.");
        return false;
      }

      // Increased buffer to 15000ms to ensure the DB commits the activity before SaveLastLessonPlan runs
      await new Promise(r => setTimeout(r, 15000));

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

      // The ManageLecture page ALREADY rendered the correct, encrypted TimeTableId
      // as a hidden input (scraped above into finalForm at lines ~1428-1432).
      // Do NOT overwrite it from the URL — for Blue cards we manually built that URL
      // with `lectureId = data-lecture-id` (the slot index "1"/"2"/"3"/"4"), which is
      // NOT a valid TimeTableId. Slot index sent as TimeTableId resolves to a
      // foreign school's row, causing /Errors/NotPermitted.
      const scrapedTimeTableId = finalForm.get('TimeTableId');
      const looksLikeRealToken = (v) => {
        if (!v) return false;
        const s = String(v).trim();
        // Real TimeTableId tokens we have observed are 32+ char hex/uppercase strings.
        // Anything 1-3 chars that's purely numeric is the slot index, not a token.
        if (/^\d{1,3}$/.test(s)) return false;
        return s.length >= 16;
      };

      const classroomIdMatch = (scrapeUrl || "").match(/[?&]classroomId=([^&]+)/i);
      const classroomId = classroomIdMatch ? classroomIdMatch[1] : "";

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

      // Force TimeTableId, classroomId — but TimeTableId now uses the validated value.
      finalForm.set('TimeTableId', finalTimeTableId);
      if (classroomId) finalForm.set('classroomId', classroomId);

      // ── DO NOT OVERWRITE SchoolId UNCONDITIONALLY ────────────────────
      // The ManageLecture form's hidden <input name="SchoolId"> contains
      // the NUMERIC internal school id (e.g. "162189") that
      // /Teacher/Lessons/SaveLastLessonPlan requires. Our `realSchoolId`
      // is the 32-hex HASH form (e.g. "6E91EFB4...") which the Activity
      // /Projects/Projects/Create endpoint accepts but SaveLastLessonPlan
      // rejects (302 → /Errors/NotPermitted).
      // The hidden-inputs scrape at line 1457 already put the numeric
      // value into finalForm. We only fall back to realSchoolId if the
      // scrape produced nothing (defensive).
      const scrapedSchoolId = finalForm.get('SchoolId');
      if (!scrapedSchoolId || String(scrapedSchoolId).trim() === '') {
        console.warn("[Tahdiri] No SchoolId in scraped ManageLecture form — falling back to realSchoolId (hash). SaveLastLessonPlan may reject this.");
        finalForm.set('SchoolId', realSchoolId);
      } else {
        console.log("[Tahdiri] Using NUMERIC SchoolId from ManageLecture form:", scrapedSchoolId, "(NOT overwriting with hash:", realSchoolId + ")");
      }

      // Pin the CSRF to the one we scraped from the ManageLecture page
      finalForm.set('__RequestVerificationToken', freshCsrf);

      console.log("[Tahdiri] SaveLastLessonPlan — TimeTableId:", finalTimeTableId, "classroomId:", classroomId, "SchoolId(form):", finalForm.get('SchoolId'), "realSchoolId(hash):", realSchoolId);

      // 3. Inject our lesson selections
      // CRITICAL: Madrasati requires BOTH SubjectId AND SelectedUnitId — they map to different
      // server-side validators. Missing SelectedUnitId returns 400 with the message
      // "لا يمكن ترك حقل مسار الدرس بدون اختيار".
      finalForm.append('SubjectId', String(finalSubjectId).trim());
      finalForm.append('SelectedUnitId', String(finalSubjectId).trim());
      finalForm.append('LessonIds[0].Id', String(lessonId).trim());
      finalForm.append('LessonIds[0].Name', lessonName);
      finalForm.append('SelectedTrees_2', String(chapterId).trim());
      finalForm.append('SelectedTrees_3', String(lessonId).trim());

      // CRITICAL: hfLevelsCount tells the server how many tree levels to bind from
      // the form. The scraped value from MlutiLessonPlan/ManageLecture is "1"
      // (only the subject is known to that page). We always send 3 levels
      // (SubjectId / SelectedTrees_2 / SelectedTrees_3) so this MUST be "3".
      // If it stays at "1", the server ignores SelectedTrees_2 and SelectedTrees_3,
      // leaves the lesson dropdown unselected on re-open, and redirects the POST
      // to ManageLecture (302) — which silentPrepareLesson interprets as failure.
      // Use .set() to OVERRIDE the scraped value (not .append() which would duplicate it).
      finalForm.set('hfLevelsCount', '3');
      console.log('[Tahdiri] ✅ Forced hfLevelsCount=3 for SaveLastLessonPlan (was:', finalForm.getAll('hfLevelsCount').join(',') || 'unset', ')');

      // ── Goals + Activities mirror IDs (the "digital content" checkboxes) ──
      // PLACEHOLDER — extraction logic temporarily removed to restore working save flow.
      // The checkboxes for "المحتوى الرقمي المرتبط بالدرس" will remain empty in the
      // edit view until we re-implement extraction in a separate controlled experiment.
      // The lesson plan ITSELF saves successfully (AI text content, strategies,
      // teachingTools, lesson dropdown, all work). The competitor's behavior of
      // pre-selecting all available checkboxes is a nice-to-have, not required.
      console.log('[Tahdiri] Goals/activities binding skipped (placeholder).');

      // CRITICAL: Madrasati requires LessonType and LessonTempleateType — verified from competitor's
      // successful Save trace. Missing LessonType returns 400 with
      // "لا يمكن ترك حقل نوع الدرس فارغاً".
      //   LessonType=2          → "درس جديد" (new lesson, the default)
      //   LessonTempleateType=1 → standard template ID
      // Use append() — these are NEW fields, not overwrites of fields scraped from MlutiLessonPlan.
      // If MlutiLessonPlan already provided them, the duplicate is harmless (server takes the last).
      if (!finalForm.has('LessonType') || !finalForm.get('LessonType')) {
        finalForm.append('LessonType', '2');
      }
      if (!finalForm.has('LessonTempleateType') || !finalForm.get('LessonTempleateType')) {
        finalForm.append('LessonTempleateType', '1');
      }

      console.log('[Tahdiri] Save form critical fields →',
        'SubjectId:', finalForm.get('SubjectId'),
        'SelectedUnitId:', finalForm.get('SelectedUnitId'),
        'LessonType:', finalForm.get('LessonType'),
        'LessonTempleateType:', finalForm.get('LessonTempleateType'));

      // Core content fields — pull AI-generated text from chrome.storage cache if available.
      // Falls back to hardcoded defaults on any failure (timeout, missing cache, bad shape).
      var aiCached = null;
      try {
        var aiCacheKey = 'tahdiri_ai_' + String(lessonId).trim();
        aiCached = await new Promise(function (resolve) {
          chrome.storage.local.get([aiCacheKey], function (r) { resolve(r[aiCacheKey] || null); });
        });
      } catch (e) {
        console.warn('[Tahdiri-AI] silentPrepareLesson cache read failed:', e && e.message);
      }

      // Coerce any AI field shape (string | array of strings | array of objects | object)
      // into a single clean Arabic string suitable for FormData.append().
      // GPT-4o-mini occasionally returns LessonVocabulary as an array of objects which
      // produces object text when FormData stringifies it.
      function _aiToString(val, fallback) {
        try {
          if (val == null) return fallback;
          if (typeof val === 'string') return val.trim() || fallback;
          if (Array.isArray(val)) {
            var parts = val.map(function (item) {
              if (item == null) return '';
              if (typeof item === 'string') return item.trim();
              if (typeof item === 'object') {
                // Prefer common term/meaning pairs; fall back to joining all values.
                var keys = Object.keys(item);
                if (keys.length === 0) return '';
                // Build "<key1>: <val1>" if there's a recognizable pair
                var termKey  = keys.find(function (k) { return /term|word|كلم|مصطلح/i.test(k); });
                var meanKey  = keys.find(function (k) { return /mean|defin|شرح|معنى|تعريف/i.test(k); });
                if (termKey && meanKey) {
                  return String(item[termKey]).trim() + ': ' + String(item[meanKey]).trim();
                }
                // Generic fallback: join all primitive values
                return keys.map(function (k) {
                  var v = item[k];
                  return (v == null || typeof v === 'object') ? '' : String(v).trim();
                }).filter(Boolean).join(' — ');
              }
              return String(item).trim();
            }).filter(Boolean);
            var joined = parts.join(' • ');
            return joined || fallback;
          }
          if (typeof val === 'object') {
            // Plain object — join "key: value" pairs
            var oParts = Object.keys(val).map(function (k) {
              var v = val[k];
              if (v == null || typeof v === 'object') return '';
              return String(k).trim() + ': ' + String(v).trim();
            }).filter(Boolean);
            return oParts.length ? oParts.join(' • ') : fallback;
          }
          // Number / boolean / other primitive
          return String(val).trim() || fallback;
        } catch (e) {
          console.warn('[Tahdiri-AI] aiToString error, using fallback:', e && e.message);
          return fallback;
        }
      }

      var aiPrep  = _aiToString(aiCached && aiCached.LectureClassPreparationText, "تمهيد مناسب يربط الدرس بالخبرات السابقة.");
      var aiClose = _aiToString(aiCached && aiCached.LectureClassCloseText,       "ملخص شامل لأهم نقاط الدرس.");
      var aiVocab = _aiToString(aiCached && aiCached.LessonVocabulary,            "المصطلحات والمفاهيم الأساسية الواردة.");
      var aiThink = _aiToString(aiCached && aiCached.ThinkingSkills,              "التركيز والتحليل والملاحظة");
      var aiNote  = _aiToString(aiCached && aiCached.TeacherNote,                 "متابعة أداء الطلاب وتقديم التغذية الراجعة.");

      if (aiCached) {
        console.log('[Tahdiri-AI] ✅ Normalized AI content for lesson', lessonId,
          '| vocab len:', aiVocab.length,
          '| prep len:', aiPrep.length);
      }

      if (aiCached) {
        console.log('[Tahdiri-AI] ✅ Using AI content for lesson', lessonId);
      } else {
        console.log('[Tahdiri-AI] ⚠️ No AI cache for', lessonId, '— using defaults');
      }

      // Strategies + teachingTools — replicate competitor's exact payload pattern.
      // FormData.append() with the same key multiple times produces the standard
      // "strategies=2&strategies=4&strategies=5..." form-encoding that ASP.NET MVC
      // binds to List<int> on the server side.
      // IDs are static Madrasati checkbox values (verified from competitor_full.json HAR).
      var TAHDIRI_DEFAULT_STRATEGIES = [2, 4, 5, 12, 19];
      var TAHDIRI_DEFAULT_TEACHING_TOOLS = [1, 2, 3, 5, 7, 8, 9, 11]; // 7 added (verified from competitor HAR)

      TAHDIRI_DEFAULT_STRATEGIES.forEach(function (id) {
        finalForm.append('strategies', String(id));
      });
      finalForm.append('strategyExtraData', 'الفهم القرائي'); // competitor sends this after strategies
      TAHDIRI_DEFAULT_TEACHING_TOOLS.forEach(function (id) {
        finalForm.append('teachingTools', String(id));
      });
      console.log('[Tahdiri] ✅ Appended', TAHDIRI_DEFAULT_STRATEGIES.length, 'strategies + strategyExtraData +', TAHDIRI_DEFAULT_TEACHING_TOOLS.length, 'teachingTools');

      finalForm.append('ThinkingSkills', aiThink);
      finalForm.append('LectureClassPreparationText', aiPrep);
      finalForm.append('LectureClassCloseText', aiClose);
      finalForm.append('LessonVocabulary', aiVocab);
      finalForm.append('TeacherNote', aiNote);

      // Resource windows must match the scheduled lecture time, especially for
      // multi-lesson prepare where MlutiLessonPlan provides MultiPrepareLesson[0].
      const rawLectureStart = finalForm.get('MultiPrepareLesson[0].StartDate')
                            || finalForm.get('StartDate')
                            || '';

      function parseMadrasatiDate(s) {
        if (!s || typeof s !== 'string') return null;
        const m = s.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
        if (!m) return null;
        const [, mo, da, yr, hh, mm, ss] = m;
        const d = new Date(Number(yr), Number(mo) - 1, Number(da), Number(hh), Number(mm), Number(ss));
        return isNaN(d.getTime()) ? null : d;
      }

      function fmtProjectTime(d) {
        const month = d.getMonth() + 1;
        const day   = d.getDate();
        const year  = d.getFullYear();
        let   hour  = d.getHours();
        const min   = String(d.getMinutes()).padStart(2, '0');
        const sec   = String(d.getSeconds()).padStart(2, '0');
        const ampm  = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12;
        if (hour === 0) hour = 12;
        return `${month}/${day}/${year} ${hour}:${min}:${sec} ${ampm}`;
      }

      function deleteFormDataPrefix(form, prefix) {
        Array.from(form.keys()).forEach(function (key) {
          if (String(key).indexOf(prefix) === 0) form.delete(key);
        });
      }

      let startDate = parseMadrasatiDate(rawLectureStart);
      if (!startDate) {
        console.warn('[Tahdiri] Resource lists: could not parse lecture StartDate; using now() as fallback. raw=', JSON.stringify(rawLectureStart));
        startDate = new Date();
      } else {
        console.log('[Tahdiri] Resource lists: using lecture StartDate from form:', rawLectureStart, '→ parsed:', startDate.toString());
      }

      const endDate = new Date(startDate.getTime() + 3 * 24 * 60 * 60 * 1000);
      const startTimeStr = fmtProjectTime(startDate);
      const endTimeStr   = fmtProjectTime(endDate);

      // MlutiLessonPlan / ManageLecture can carry stale or empty resource rows.
      // Clear them before appending the IDs created in this run so ASP.NET binds
      // the actual AssignmentId/ExamId/ProjectId, not an earlier blank value.
      deleteFormDataPrefix(finalForm, 'LectureProjectsList[');
      deleteFormDataPrefix(finalForm, 'LectureAssignmentsList[');
      deleteFormDataPrefix(finalForm, 'LectureExamsList[');

      // Include the Activity so the server validation passes (requires at least one نشاط/واجب/إثراء).
      if (activityProjectId) {
        finalForm.append('LectureProjectsList[0].ProjectId', activityProjectId);
        finalForm.append('LectureProjectsList[0].Grade', '1');
        finalForm.append('LectureProjectsList[0].StartTime', startTimeStr);
        finalForm.append('LectureProjectsList[0].EndTime', endTimeStr);
        finalForm.append('LectureProjectsList[0].Name', 'واجب');
        finalForm.append('LectureProjectsList[0].DayCount', '3');

        console.log('[Tahdiri] LectureProjectsList[0] →',
          'ProjectId:', activityProjectId,
          'StartTime:', startTimeStr,
          'EndTime:', endTimeStr);
      } else {
        console.warn('[Tahdiri] No projectId — SaveLastLessonPlan will rely on homework/exam if available.');
      }

      // ── LectureAssignmentsList (Homework) ─────────────────────────────────────────
      if (homeworkAssignmentId) {
        finalForm.append('LectureAssignmentsList[0].AssignmentId', homeworkAssignmentId);
        finalForm.append('LectureAssignmentsList[0].Grade',       '1');
        finalForm.append('LectureAssignmentsList[0].IsGradeBook', 'true');
        finalForm.append('LectureAssignmentsList[0].StartTime',   startTimeStr);
        finalForm.append('LectureAssignmentsList[0].EndTime',     endTimeStr);
        finalForm.append('LectureAssignmentsList[0].DayCount',    '3');
        console.log('[Tahdiri] LectureAssignmentsList[0] → AssignmentId:', homeworkAssignmentId, 'StartTime:', startTimeStr, 'EndTime:', endTimeStr);
      } else {
        console.warn('[Tahdiri] No homeworkAssignmentId — LectureAssignmentsList omitted from SaveLastLessonPlan.');
      }

      // ── LectureExamsList (Exam) ───────────────────────────────────────────────
      if (examId) {
        const examEndDate = new Date(startDate.getTime() + 5 * 24 * 60 * 60 * 1000);
        const examEndStr  = fmtProjectTime(examEndDate);
        finalForm.append('LectureExamsList[0].ExamId',      examId);
        finalForm.append('LectureExamsList[0].Duration',    '20');
        finalForm.append('LectureExamsList[0].Grade',       '5');
        finalForm.append('LectureExamsList[0].IsGradeBook', 'false');
        finalForm.append('LectureExamsList[0].Name',        'اختبار (' + lessonName + ')');
        finalForm.append('LectureExamsList[0].StartTime',   startTimeStr);
        finalForm.append('LectureExamsList[0].EndTime',     examEndStr);
        finalForm.append('LectureExamsList[0].DayCount',    '5');
        console.log('[Tahdiri] LectureExamsList[0] → ExamId:', examId);
      } else {
        console.warn('[Tahdiri] No examId — LectureExamsList omitted from SaveLastLessonPlan.');
      }

      try {
        const saveRes = await fetch("https://schools.madrasati.sa/Teacher/Lessons/SaveLastLessonPlan", {
          method: "POST",
          credentials: "same-origin",
          body: finalForm
        });

        // 🚀 Detect ASP.NET validation redirects (Failure bounces back to ManageLecture or NotPermitted)
        if (saveRes.url && (saveRes.url.includes('ManageLecture') || saveRes.url.includes('NotPermitted') || saveRes.url.includes('Error'))) {
          console.error("[Tahdiri] Save rejected by server due to missing resource or slow DB sync. Redirected to:", saveRes.url);
          return false;
        }

        return saveRes.ok;
      } catch (e) {
        console.error("[Tahdiri] Failed to POST Final Lesson Save", e);
        return false;
      }
    }
    async function iframePrepareLesson(token, selection) {
      // Persist the selection so the auto flow inside the iframe can find it on STEP1
      var stored = await getLocal([DASHBOARD_SELECTIONS_KEY]);
      var sels = stored[DASHBOARD_SELECTIONS_KEY] || {};
      sels[token] = { mode: 'auto', treeValue: selection.treeValue };
      await setLocal({ [DASHBOARD_SELECTIONS_KEY]: sels });

      // Open the dashboard URL inside a hidden iframe; the boot hook will click the cell,
      // Madrasati will navigate the subframe to ManageLecture, then the hook starts AutomationController.
      var dashUrl = new URL(window.location.href);
      dashUrl.searchParams.set('tahdiri_iframe', '1');
      dashUrl.searchParams.set('tahdiri_click', token);

      var iframe = document.createElement('iframe');
      iframe.name = 'tahdiri_iframe_blue_' + token;
      iframe.style.cssText = 'width:0;height:0;position:absolute;top:-10000px;left:-10000px;opacity:0;border:none;pointer-events:none;';
      document.body.appendChild(iframe);
      iframe.src = dashUrl.toString();

      const result = await new Promise((resolve) => {
        const timeout = setTimeout(() => resolve(false), 120000); // 2 min hard cap
        function onMessage(e) {
          if (e.data && e.data.type === 'TAHDIRI_IFRAME_DONE') {
            clearTimeout(timeout);
            window.removeEventListener('message', onMessage);
            resolve(!!e.data.success);
          }
        }
        window.addEventListener('message', onMessage);
      });

      iframe.remove();
      return result;
    }

    // ── Prefetch AI content for a single lesson card and cache in chrome.storage.local ──
    // Returns the AI object (5 fields) or null on failure. Cache key: tahdiri_ai_<lessonId>.
    async function prefetchAILessonDataForCard(cardItem) {
      try {
        // Resolve lessonId the SAME WAY silentPrepareLesson does — by parsing
        // selection.treeValue ("subjectId,chapterId,lessonId"). Direct `.lessonId`
        // is NOT a property on selection.
        var lessonId = '';
        try {
          var tv = cardItem && cardItem.selection && cardItem.selection.treeValue;
          if (tv && typeof tv === 'string') {
            var parts = tv.split(',');
            if (parts.length >= 3) {
              lessonId = String(parts[2]).trim();
            }
          }
        } catch (e) {
          console.warn('[Tahdiri-AI] prefetch: error parsing treeValue:', e && e.message);
        }
        if (!lessonId) {
          console.warn('[Tahdiri-AI] prefetch skipped — could not parse lessonId from treeValue:', cardItem && cardItem.selection && cardItem.selection.treeValue);
          return null;
        }
        console.log('[Tahdiri-AI] prefetch: resolved lessonId', lessonId, 'from treeValue');
        var cacheKey = 'tahdiri_ai_' + lessonId;

        // 1. Try cache first
        var cached = await new Promise(function (resolve) {
          chrome.storage.local.get([cacheKey], function (r) { resolve(r[cacheKey] || null); });
        });
        if (cached && cached.LectureClassPreparationText) {
          console.log('[Tahdiri-AI] ✅ cache hit for', lessonId);
          return cached;
        }

        // 2. Build context from the SAME canonical sources used elsewhere in the file:
        //    - lessonName: from selection.treeText (matches silentPrepareLesson line 1571)
        //    - subjectName: from <h2> inside card div (matches dashboard dropdown builder line 1218-1219)
        //    - gradeName: scraped from page (breadcrumb / sidebar / header). Best-effort; AI tolerates empty grade.
        var div = cardItem && cardItem.div ? cardItem.div : null;
        var lessonName = '';
        try {
          var tt = cardItem && cardItem.selection && cardItem.selection.treeText;
          if (tt && typeof tt === 'string') {
            lessonName = tt.trim().replace(/:$/, '').trim();
          }
        } catch (_) { }

        var subjectName = '';
        try {
          if (div) {
            var h2 = div.querySelector('h2');
            if (h2) subjectName = (h2.innerText || h2.textContent || '').trim();
          }
        } catch (_) { }

        var gradeName = '';
        // The grade is not in the dashboard card DOM and not in our local JSON.
        // We will resolve it later inside silentPrepareLesson by parsing the
        // ManageLecture HTML breadcrumb, then write it back to the AI cache.
        // For the prefetch context we send to n8n RIGHT NOW, we leave it empty —
        // the AI tolerates empty grade and still produces high-quality content
        // because it has subject + lesson_title.
        // (Future optimization: pre-fetch ManageLecture HTML in parallel before
        // the AI call so we can pass grade on the first attempt.)

        console.log('[Tahdiri-AI] prefetch context →',
          'grade:', JSON.stringify(gradeName),
          '| subject:', JSON.stringify(subjectName),
          '| lesson_title:', JSON.stringify(lessonName));

        if (!lessonName && !subjectName) {
          console.warn('[Tahdiri-AI] prefetch skipped — both lessonName and subjectName are empty for lessonId', lessonId);
          return null;
        }

        // 3. Call n8n
        // 60s timeout — GPT-4o-mini for long Arabic content routinely takes 8-15s
        var controller = new AbortController();
        var timeoutId = setTimeout(function () { controller.abort(); }, 60000);
        var res = await fetch(N8N_AI_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': N8N_AI_API_KEY
          },
          body: JSON.stringify({
            grade: gradeName,
            subject: subjectName,
            lesson_title: lessonName
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!res.ok) {
          console.warn('[Tahdiri-AI] prefetch HTTP', res.status, 'for', lessonId);
          return null;
        }
        var data = await res.json();
        if (!data || typeof data !== 'object' || !data.LectureClassPreparationText) {
          console.warn('[Tahdiri-AI] prefetch: invalid response shape for', lessonId);
          return null;
        }

        // 4. Cache and return
        await new Promise(function (resolve) {
          var payload = {};
          payload[cacheKey] = data;
          chrome.storage.local.set(payload, resolve);
        });
        console.log('[Tahdiri-AI] ✅ prefetched + cached', lessonId);
        return data;
      } catch (err) {
        console.warn('[Tahdiri-AI] prefetch error:', err && err.message);
        return null;
      }
    }

    async function handleDashboardSave() {
      var allSelects = document.querySelectorAll('.tahdiri-dashboard-select');
      var tokensToPrepare = [];
      var successCount = 0;

      for (var select of allSelects) {
        if (!select.value || select.value === 'AI_AUTO') continue;

        var div = select.closest('div[data-data]') || select.parentElement;
        var lessonToken = select.getAttribute('data-lesson-token');
        if (!lessonToken) continue;

        var cell = div.closest('td') || div.parentElement;

        // 1. Extract subjectId
        var subjectId = div.getAttribute('data-subject-id');
        if (!subjectId && cell) {
          var anchor = cell.querySelector('a');
          if (anchor && anchor.href) {
            var match = anchor.href.match(/subjectId=(\d+)/i);
            if (match) subjectId = match[1];
          }
        }

        // 2. Extract realSchoolId — instrumented to log which branch matched.
        var realSchoolId = null;
        var schoolIdSource = "none";
        if (cell) {
          var anchors = cell.querySelectorAll('a');
          for (var i = 0; i < anchors.length; i++) {
            var hrefMatch = anchors[i].href.match(/schoolId=([a-f0-9]{32})/i);
            if (hrefMatch) { realSchoolId = hrefMatch[1]; schoolIdSource = "cell-anchor-href"; break; }
            var onclickMatch = (anchors[i].getAttribute('onclick') || "").match(/'([a-f0-9]{32})'/i);
            if (onclickMatch) { realSchoolId = onclickMatch[1]; schoolIdSource = "cell-anchor-onclick"; break; }
          }
        }
        if (!realSchoolId) {
          var divOnclick = div.getAttribute('onclick') || "";
          var divMatch = divOnclick.match(/'([a-f0-9]{32})'/i);
          if (divMatch) { realSchoolId = divMatch[1]; schoolIdSource = "card-div-onclick"; }
        }
        if (!realSchoolId) {
          var urlParams = new URLSearchParams(window.location.search);
          realSchoolId = urlParams.get("SchoolId") || urlParams.get("schoolId") || (typeof getSchoolIdValue === 'function' ? getSchoolIdValue() : '79427');
          schoolIdSource = "url-bar-fallback";
        }
        console.log("[Tahdiri-DIAG] handleDashboardSave card →",
          "subjectId:", subjectId,
          "| realSchoolId:", realSchoolId,
          "| source:", schoolIdSource,
          "| cardDiv:", div);

        var selection = { treeValue: select.value, treeText: select.options[select.selectedIndex].text };
        tokensToPrepare.push({ select, div: div, token: lessonToken, selection, subjectId, realSchoolId });

        select.style.borderColor = '#c87f0a';
        select.style.background = 'rgba(200,127,10,0.08)';
      }

      if (tokensToPrepare.length === 0) return;

      updateDashboardStatus(`⏳ جاري التحضير المخفي عبر الـ API لـ ${tokensToPrepare.length} حصة...`, "loading");

      // 3. Execute saves sequentially: ALL cards (Blue & Green) go through the headless API path.
      // silentPrepareLesson contains a fallback URL builder for Blue cards (data-subject-id +
      // data-class-id + lesson token), so the iframe legacy path is no longer needed.
      if (typeof silentPrepareLesson !== 'function') {
        updateDashboardStatus("❌ خطأ: دالة silentPrepareLesson غير موجودة بالكود!", "error");
        return;
      }
      // ── Parallel pre-fetch AI content for ALL cards before the save loop ──
      // Fires all n8n requests concurrently. Each result is cached per-lesson in
      // chrome.storage.local. silentPrepareLesson reads from that cache. Failures
      // are silent — the save loop falls back to hardcoded defaults.
      updateDashboardStatus("⏳ جاري توليد محتوى الذكاء الاصطناعي لـ " + tokensToPrepare.length + " درس...", "info");
      try {
        await Promise.all(tokensToPrepare.map(function (c) { return prefetchAILessonDataForCard(c); }));
        console.log('[Tahdiri-AI] ✅ Parallel prefetch complete for', tokensToPrepare.length, 'lessons');
      } catch (e) {
        console.warn('[Tahdiri-AI] Parallel prefetch had errors (continuing with defaults):', e && e.message);
      }
      for (var item of tokensToPrepare) {
        try {
          var success = await silentPrepareLesson(item.token, item.selection, item.subjectId, item.realSchoolId, item.div);

          if (success) {
            item.select.style.borderColor = '#1a9448';
            item.select.style.background = 'rgba(26,148,72,0.04)';
            successCount++;
          } else {
            item.select.style.borderColor = '#c0392b';
            item.select.style.background = 'rgba(192,57,43,0.08)';
          }
        } catch (err) {
          console.error("[Tahdiri] prep failed for", item.token, err);
          item.select.style.borderColor = '#c0392b';
          item.select.style.background = 'rgba(192,57,43,0.08)';
        }
      }

      if (successCount > 0) {
        updateDashboardStatus(`✅ تم تحضير ${successCount} حصة بنجاح عبر API!`, "success");
        // Optionally reload after a delay to reflect changes
        setTimeout(() => window.location.reload(), 2000);
      } else {
        updateDashboardStatus("❌ فشل التحضير المجمع عبر الـ API.", "error");
      }
    }
    // src/content/dashboard-storage-helpers.js
    async function getDashboardSelectionForCurrentLesson() {
      try {
        var stored = await getLocal([DASHBOARD_SELECTIONS_KEY]);
        var selections = stored[DASHBOARD_SELECTIONS_KEY];
        if (!selections || !Object.keys(selections).length) return null;

        // Try to match by lessonId from the current URL
        var urlParams = new URLSearchParams(window.location.search);
        var currentLessonId = urlParams.get("id") || urlParams.get("lessonId") || urlParams.get("lectureId") || "";

        // Also try extracting from hidden fields
        if (!currentLessonId) {
          currentLessonId = getFieldValue("#LessonId") || getFieldValue("#LectureId") || getFieldValue('input[name="Id"]') || "";
        }

        // Also try extracting from path
        if (!currentLessonId) {
          var pathMatch = window.location.pathname.match(/\/Index\/([\w\-]+)/);
          if (pathMatch) currentLessonId = pathMatch[1];
        }

        if (currentLessonId && selections[currentLessonId]) {
          return { lessonId: currentLessonId, path: selections[currentLessonId] };
        }

        // If no specific match, return the first selection (FIFO)
        var firstKey = Object.keys(selections)[0];
        if (firstKey) {
          return { lessonId: firstKey, path: selections[firstKey] };
        }

        return null;
      } catch (err) {
        log("getDashboardSelectionForCurrentLesson error:", err);
        return null;
      }
    }

    async function applyDashboardSelections(dashboardPath) {
      var path = dashboardPath.path;
      if (!path || !path.treeValue) return false;

      log("Dashboard: applying stored selection, mode=" + path.mode + " value=" + path.treeValue);

      var firstSelect = document.getElementById("SelectedUnitId");

      if (path.mode === 'auto' || path.treeValue === 'AI_AUTO') {
        // AI Auto-Pilot: select last option for all dropdowns (existing behavior)
        log("Dashboard: AI Auto-Pilot mode — selecting last option for all levels");
        if (isTrulyVisible(firstSelect)) {
          await selectLastOption(firstSelect);
        }
      } else {
        // Unit mode: select the specific unit chosen by the user
        if (isTrulyVisible(firstSelect)) {
          var unitFound = false;
          for (var opt of firstSelect.options) {
            if (opt.value === path.treeValue) {
              firstSelect.value = opt.value;
              triggerEvents(firstSelect, ["input", "change", "blur"]);
              if (typeof firstSelect.onchange === "function") {
                try { firstSelect.onchange(); } catch (e) { }
              }
              unitFound = true;
              log("Dashboard: selected unit '" + opt.textContent.trim() + "'");
              break;
            }
          }
          if (!unitFound) {
            log("Dashboard: unit value not found, falling back to last option");
            await selectLastOption(firstSelect);
          }
        }
      }

      // Cascade through tree levels with selectLastOption (both modes)
      for (var index = 2; index <= 6; index++) {
        var select = await waitForOptions("SelectedTrees_" + index, 7000);
        if (select && isTrulyVisible(select)) {
          await selectLastOption(select);
        }
      }

      return true;
    }

    async function clearDashboardSelection(lessonId) {
      try {
        var stored = await getLocal([DASHBOARD_SELECTIONS_KEY]);
        var selections = stored[DASHBOARD_SELECTIONS_KEY];
        if (!selections) return;
        delete selections[lessonId];
        await setLocal({ [DASHBOARD_SELECTIONS_KEY]: selections });
        log("Dashboard: cleared selection for", lessonId);
      } catch (err) {
        log("Dashboard: clearDashboardSelection error:", err);
      }
    }

    // src/content/resource-fallbacks.js
    var hasInjectedFallbackResource = false;
    function isSecondPageVisible() {
      return isTrulyVisible(document.getElementById("secondPage"));
    }
    function isMainLessonPageVisible() {
      const mainPage = document.getElementById("mainPage");
      if (isTrulyVisible(mainPage)) return true;
      return detectPageState() === FLOW_STATES.STEP2;
    }
    function getRootScope(root) {
      if (!root) return null;
      if (root.body && typeof root.querySelector === "function") return root.body;
      return root;
    }
    function getRootDocument(root) {
      if (!root) return document;
      if (root.body && typeof root.querySelector === "function") return root;
      return root.ownerDocument || document;
    }
    function getIframeDocument(iframe) {
      if (!iframe || !isTrulyVisible(iframe)) return null;
      try {
        const iframeDocument = iframe.contentDocument;
        if (!iframeDocument || !iframeDocument.body) return null;
        if (iframeDocument.readyState === "loading") return null;
        return iframeDocument;
      } catch {
        return null;
      }
    }
    function getEnrichmentCreationRoot() {
      const iframeDocuments = Array.from(document.querySelectorAll("iframe")).map((iframe) => getIframeDocument(iframe)).filter(Boolean);
      const candidates = [
        document.getElementById("CreateResourceForm"),
        document.getElementById("LectuerToolsModalBody"),
        document.getElementById("LectuerToolsModal"),
        ...iframeDocuments,
        ...Array.from(document.querySelectorAll('.modal.show, .modal.in, [role="dialog"]'))
      ];
      for (const candidate of candidates) {
        const scope = getRootScope(candidate);
        if (!scope) continue;
        const isDocumentRoot = Boolean(candidate.body && typeof candidate.querySelector === "function");
        if (!isDocumentRoot && !isTrulyVisible(scope)) continue;
        if (scope.querySelector('#LessonsGoalsList, #txtName, #Name, #txtHelpText, #Description, #txtFullPath, input[type="url"]')) {
          return scope;
        }
      }
      return null;
    }
    async function returnToMainLessonPage() {
      if (isMainLessonPageVisible() && !isSecondPageVisible()) return true;
      const secondPage = document.getElementById("secondPage") || document;
      const backButton = findPreferredElement({
        root: secondPage,
        ids: ["backButton"],
        attributes: [`button[onclick*="showhidedivs('secondPage', 'mainPage')"]`],
        texts: ["\u0639\u0648\u062F\u0629"]
      });
      if (backButton) {
        activateElementOnce(backButton);
      }
      const returned = await waitForValue(
        () => isMainLessonPageVisible() && !isSecondPageVisible() ? true : null,
        8e3
      );
      return Boolean(returned);
    }
    function countVisibleChildren(element) {
      if (!element) return 0;
      return Array.from(element.children || []).filter(isTrulyVisible).length;
    }
    function countLegacySectionItems(sectionTitle) {
      const titles = getVisibleElements(".titlesection2, .titleSection2, h2, h3, h4, div, span");
      const matchingTitle = titles.find((element) => {
        const text = getElementLabel(element).replace(/\s+/g, " ").trim();
        return text === sectionTitle || text.includes(sectionTitle);
      });
      if (!matchingTitle) return 0;
      const level2 = matchingTitle.parentElement ? matchingTitle.parentElement.parentElement : null;
      if (!level2) return 0;
      const rows = Array.from(level2.querySelectorAll(".row"));
      if (rows[1]) {
        return countVisibleChildren(rows[1]);
      }
      return 0;
    }
    function getLessonResourceCounts() {
      const enrichments = countVisibleChildren(document.getElementById("ActivitiesDiv")) || countLegacySectionItems("\u0625\u062B\u0631\u0627\u0621\u0627\u062A");
      const assignments = countVisibleChildren(document.getElementById("AssignmentsDiv")) || countLegacySectionItems("\u0648\u0627\u062C\u0628\u0627\u062A");
      const exams = countVisibleChildren(document.getElementById("ExamsDiv")) || countLegacySectionItems("\u0627\u062E\u062A\u0628\u0627\u0631\u0627\u062A");
      const projects = countVisibleChildren(document.getElementById("ProjectsDiv")) || countLegacySectionItems("\u0623\u0646\u0634\u0637\u0629 \u0645\u062F\u0631\u0633\u064A\u0629") || countLegacySectionItems("\u0623\u0646\u0634\u0637\u0629");
      return {
        enrichments,
        assignments,
        exams,
        projects,
        hasAny: hasInjectedFallbackResource || Boolean(enrichments || assignments || exams || projects)
      };
    }
    function getCurrentLessonName() {
      const select4 = document.getElementById("SelectedTrees_4");
      if (select4 && select4.value && select4.selectedOptions && select4.selectedOptions[0]) {
        return select4.selectedOptions[0].text.trim();
      }
      const select3 = document.getElementById("SelectedTrees_3");
      if (select3 && select3.value && select3.selectedOptions && select3.selectedOptions[0]) {
        return select3.selectedOptions[0].text.trim();
      }
      return "\u0627\u0644\u062F\u0631\u0633";
    }
    function scrapeLessonContext() {
      // Hardened scraper: all DOM reads are wrapped in try/catch so a DOM shift
      // (e.g. showing a Teams-link field after selecting 'افتراضي متزامن') never
      // throws before the fetch call is reached.

      var lessonTitle = "\u0627\u0644\u062F\u0631\u0633";
      try {
        // 1. Scrape lesson title from the last active SelectedTrees dropdown.
        //    Strip any trailing colon.
        for (var i = 6; i >= 2; i--) {
          var sel = document.getElementById("SelectedTrees_" + i);
          if (sel && sel.value && sel.selectedOptions && sel.selectedOptions[0]) {
            lessonTitle = (sel.selectedOptions[0].text || "").trim().replace(':', '').trim();
            break;
          }
        }
      } catch (e) {
        console.error('[\u062A\u062D\u0636\u064A\u0631\u064A] scrapeLessonContext: lessonTitle error', e);
      }

      var fullPathString = "";
      try {
        // 2. Find the breadcrumb text at the top of the page.
        //    Try common breadcrumb selectors used on Madrasati.
        var breadcrumbSelectors = [
          ".breadcrumb-item.active",
          ".breadcrumb li:last-child",
          ".breadcrumb",
          ".page-breadcrumb",
          ".header-breadcrumb",
          "[class*='breadcrumb']"
        ];
        for (var s of breadcrumbSelectors) {
          try {
            var bcEl = document.querySelector(s);
            if (bcEl) {
              var bcText = ((bcEl.innerText || bcEl.textContent) || "").trim();
              if (bcText && bcText.includes("-")) {
                fullPathString = bcText;
                break;
              }
            }
          } catch (_) { }
        }
      } catch (e) {
        console.error('[\u062A\u062D\u0636\u064A\u0631\u064A] scrapeLessonContext: breadcrumb error', e);
      }

      try {
        // 3. Fallback to the #SelectedUnitId selected option text if no breadcrumb found.
        if (!fullPathString) {
          var unitSelect = document.getElementById("SelectedUnitId");
          if (unitSelect && unitSelect.selectedOptions && unitSelect.selectedOptions[0]) {
            fullPathString = (unitSelect.selectedOptions[0].text || "").trim();
          }
        }
      } catch (e) {
        console.error('[\u062A\u062D\u0636\u064A\u0631\u064A] scrapeLessonContext: unitSelect fallback error', e);
      }

      // 4. Parse the full path string to extract Grade and Subject.
      var extractedGrade = "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";
      var extractedSubject = fullPathString || "\u063A\u064A\u0631 \u0645\u062D\u062F\u062F";
      try {
        if (fullPathString && fullPathString.includes("-")) {
          var parts = fullPathString.split("-").map(function (part) { return part.trim(); });
          extractedSubject = parts[parts.length - 1];
          extractedGrade = parts.length > 1 ? parts[1] : parts[0];
        }
      } catch (e) {
        console.error('[\u062A\u062D\u0636\u064A\u0631\u064A] scrapeLessonContext: path parse error', e);
      }

      // جمع الـ checkboxes المتاحة من الصفحة
      var availableStrategies = [];
      var availableTools = [];

      document.querySelectorAll('input[name="strategies"]').forEach(function (cb) {
        var label = cb.closest('label') || document.querySelector('label[for="' + cb.id + '"]');
        var text = label ? label.textContent.trim() : '';
        if (text) availableStrategies.push(text);
      });

      document.querySelectorAll('input[name="teachingTools"]').forEach(function (cb) {
        var label = cb.closest('label') || document.querySelector('label[for="' + cb.id + '"]');
        var text = label ? label.textContent.trim() : '';
        if (text) availableTools.push(text);
      });

      log("scrapeLessonContext:", { grade: extractedGrade, subject: extractedSubject, lessonTitle: lessonTitle, availableStrategies: availableStrategies, availableTools: availableTools });
      return { grade: extractedGrade, subject: extractedSubject, lessonTitle: lessonTitle, availableStrategies: availableStrategies, availableTools: availableTools };

    }
    async function fetchAILessonData(context) {
      try {
        log("fetchAILessonData: sending to n8n:", context);
        // 60s timeout — GPT-4o-mini for long Arabic content routinely takes 8-15s
        var controller = new AbortController();
        var timeoutId = setTimeout(function () { controller.abort(); }, 60000);
        var response = await fetch(N8N_AI_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": N8N_AI_API_KEY
          },
          body: JSON.stringify({
            grade: context.grade,
            subject: context.subject,
            lesson_title: context.lessonTitle
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        if (!response.ok) {
          log("fetchAILessonData: HTTP error", response.status);
          return null;
        }
        var data = await response.json();
        log("fetchAILessonData: received:", data);
        // Validate expected fields exist
        if (!data || typeof data !== "object") return null;
        return {
          prep: data.prep || data.preparation || data.LectureClassPreparationText || "",
          goals: data.goals || "",
          closure: data.closure || data.Closure || "",
          vocabulary: data.vocabulary || data.Vocabulary || data.LessonVocabulary || "",
          strategies: Array.isArray(data.strategies) ? data.strategies : [],
          tools: Array.isArray(data.tools) ? data.tools : [],
          homework: data.homework || ""
        };

      } catch (err) {
        log("fetchAILessonData: error:", err);
        return null;
      }
    }

    // ── Deprecated stub — kept so older call-sites do not throw ──────────────────
    // The parasite strategy replaces this. runQuickPrepStep2Flow no longer calls it.
    async function fetchQuickPrepData(subjectId, lessonId) {
      log('fetchQuickPrepData: deprecated — parasite strategy active');
      return null;
    }
    function buildLessonPlanFromGoals(goals, books, lessonName, tree2Value) {
      const name = lessonName || "الدرس";
      const einLink = "https://ibs.ien.edu.sa/#/planslessons/" + (tree2Value || "");
      const goalIds = Array.isArray(goals) ? goals.map(function (g) { return g.GoalId; }).filter(Boolean) : [];

      var firstGoalTitle = "";
      var lastGoalTitle = "";
      if (Array.isArray(goals) && goals.length > 0) {
        firstGoalTitle = (goals[0].GoalTitle || "").trim();
        lastGoalTitle = (goals[goals.length - 1].GoalTitle || "").trim();
      }

      var prepText, closeText, homeworkText;

      if (!Array.isArray(goals) || goals.length === 0) {
        // Zero goals: lesson-name-only templates
        prepText = "نراجع مع الطلاب المعارف السابقة، ثم نمهد لدرس \"" + name + "\" من خلال طرح موقف يومي مرتبط بموضوع الدرس.";
        closeText = "نلخص مع الطلاب أهم ما تعلموه في درس \"" + name + "\".";
        homeworkText = "حل تمارين درس \"" + name + "\" في كتاب التمارين.";
      } else if (goals.length === 1) {
        // One goal: different phrasing for prep vs closure so they are not identical
        prepText = "نراجع مع الطلاب المعارف السابقة، ثم نمهد لدرس \"" + name + "\" من خلال طرح موقف يومي مرتبط بـ " + firstGoalTitle + ".";
        closeText = "نلخص مع الطلاب أهم ما تعلموه في درس \"" + name + "\"، ونتأكد من تحقق الهدف: " + lastGoalTitle + ".";
        homeworkText = "حل تمارين درس \"" + name + "\" في كتاب التمارين، ومراجعة هدف: " + firstGoalTitle + ".";
      } else {
        // Two or more goals: first → prep, last → closure
        prepText = "نراجع مع الطلاب المعارف السابقة، ثم نمهد لدرس \"" + name + "\" من خلال طرح موقف يومي مرتبط بـ " + firstGoalTitle + ".";
        closeText = "نلخص مع الطلاب أهم ما تعلموه في درس \"" + name + "\"، ونتأكد من تحقق الهدف: " + lastGoalTitle + ".";
        homeworkText = "حل تمارين درس \"" + name + "\" في كتاب التمارين، ومراجعة هدف: " + firstGoalTitle + ".";
      }

      var vocabularyText =
        "مفردات الدرس: راجع الكتاب الإلكتروني درس (" + name + ").\n" +
        "تجد روابط الكتب الإلكترونية في قسم الإثراء.";

      var thinkingSkillsText =
        "التركيز - التذكر - التحليل - التركيب - الربط - الملاحظة - الاستنتاج - التفكير الإبداعي - العصف الذهني";

      var teacherNoteText =
        "بإمكانك الاطلاع على شرح هذا الدرس على منصة عين وحل بعض الأسئلة ومشاهدة المزيد من الإثراءات من خلال:\n" +
        "أولاً: تسجيل الدخول لمنصة عين بحسابك.\n" +
        "ثانياً: فتح رابط هذا الدرس وهو:\n" +
        einLink;

      return {
        LectureClassPreparationText: prepText,
        LessonVocabulary: vocabularyText,
        ThinkingSkills: thinkingSkillsText,
        LectureClassCloseText: closeText,
        TeacherNote: teacherNoteText,
        goalIds: goalIds,
        einLink: einLink,
        homework: homeworkText
      };
    }
    function getCsrfToken() {
      return getFieldValue("#csrfid") || getFieldValue('input[name="__RequestVerificationToken"]');
    }
    function getSchoolIdValue(root) {
      const scopes = [root || document, document];
      const selectorCandidates = [
        "#hSchoolId",
        'input[name="schoolId"]',
        "input#schoolId",
        'input[name="SchoolIdEnc"]',
        'input[name="eschoolId"]'
      ];
      for (const scope of scopes) {
        for (const selector of selectorCandidates) {
          const value = getFieldValue(selector, scope);
          if (value) return value;
        }
      }
      const globalCandidates = [
        globalThis.schoolId,
        globalThis.eschoolId,
        globalThis.SchoolIdEnc
      ];
      for (const candidate of globalCandidates) {
        if (typeof candidate === "string" && candidate.trim()) {
          return candidate.trim();
        }
      }
      const hrefSources = [
        getFieldValue("#hfDrawTree"),
        getFieldValue("#hfGetAssignment"),
        getFieldValue("#hfGradeBookTotalValue")
      ].filter(Boolean);
      for (const href of hrefSources) {
        const match = href.match(/\/Index\/([^/?#]+)/i);
        if (match && match[1]) return match[1].trim();
      }
      return "";
    }
    function matchesLessonRequirementError(text) {
      const normalized = (text || "").replace(/\s+/g, " ").trim();
      return LESSON_RESOURCE_ERROR_PATTERNS.some((pattern) => normalized.includes(pattern));
    }
    function matchesSaveValidationError(text) {
      const normalized = (text || "").replace(/\s+/g, " ").trim();
      return SAVE_VALIDATION_ERROR_PATTERNS.some((pattern) => normalized.includes(pattern));
    }
    function matchesDuplicateLessonError(text) {
      const normalized = (text || "").replace(/\s+/g, " ").trim();
      return DUPLICATE_LESSON_ERROR_PATTERNS.some((pattern) => normalized.includes(pattern));
    }
    function findLessonRequirementErrorMessage() {
      if (!document.body) return "";
      const pageText = document.body.innerText || "";
      if (!matchesLessonRequirementError(pageText)) return "";
      const scopedCandidates = getVisibleElements(".swal2-html-container, .validation-summary-errors, .alert, .modal, .toast, .field-validation-error, div, p, span, li");
      const exactCandidate = scopedCandidates.find((element) => matchesLessonRequirementError(getElementLabel(element)));
      return exactCandidate ? getElementLabel(exactCandidate) : LESSON_RESOURCE_ERROR_PATTERNS[0];
    }
    function findSaveValidationErrorMessage() {
      if (!document.body) return "";
      const pageText = document.body.innerText || "";
      if (!matchesSaveValidationError(pageText)) return "";
      const scopedCandidates = getVisibleElements(".swal2-html-container, .validation-summary-errors, .alert, .modal, .toast, .field-validation-error, div, p, span, li");
      const exactCandidate = scopedCandidates.find((element) => matchesSaveValidationError(getElementLabel(element)));
      return exactCandidate ? getElementLabel(exactCandidate) : SAVE_VALIDATION_ERROR_PATTERNS[0];
    }
    function findDuplicateLessonErrorMessage() {
      if (!document.body) return "";
      const pageText = document.body.innerText || "";
      if (!matchesDuplicateLessonError(pageText)) return "";
      const scopedCandidates = getVisibleElements(".swal2-html-container, .validation-summary-errors, .alert, .modal, .toast, .field-validation-error, div, p, span, li");
      const exactCandidate = scopedCandidates.find((element) => matchesDuplicateLessonError(getElementLabel(element)));
      return exactCandidate ? getElementLabel(exactCandidate) : DUPLICATE_LESSON_ERROR_PATTERNS[0];
    }
    async function dismissLessonRequirementAlert() {
      const modal = findPreferredElement({
        attributes: [".swal2-popup", ".modal.show", ".modal.in", '[role="dialog"]'],
        classes: [".swal2-popup", ".modal.show", ".modal.in"]
      });
      if (!modal || !isTrulyVisible(modal)) return false;
      const confirmButton = findPreferredElement({
        root: modal,
        attributes: [".swal2-confirm", ".btn-primary", 'button[type="button"]'],
        classes: [".swal2-confirm", ".btn-primary", ".btn-main"],
        texts: ["\u0645\u0648\u0627\u0641\u0642", "\u062D\u0633\u0646\u0627", "\u062D\u0633\u0646\u064B\u0627", "\u0625\u063A\u0644\u0627\u0642", "\u0627\u063A\u0644\u0627\u0642", "\u062A\u0623\u0643\u064A\u062F", "\u0645\u0648\u0627\u0641\u0642"]
      });
      if (!confirmButton) return false;
      activateElementOnce(confirmButton);
      await sleep(500);
      return true;
    }
    async function fetchHtml(url, options) {
      try {
        const response = await fetch(url, {
          credentials: "same-origin",
          ...options || {}
        });
        const text = await response.text();
        return {
          ok: response.ok,
          status: response.status,
          text
        };
      } catch (error) {
        log("fetchHtml error:", error);
        return {
          ok: false,
          status: 0,
          text: ""
        };
      }
    }
    async function createSchoolActivityFallback(options) {
      const settings = options || {};
      if (hasInjectedFallbackResource && !settings.force) {
        return buildResult(true, "Fallback resource already created");
      }
      const schoolId = getSchoolIdValue();
      const unitId = getFieldValue("#SelectedUnitId");
      const tree2 = getFieldValue("#SelectedTrees_2");
      const tree3 = getFieldValue("#SelectedTrees_3");
      const tree4 = getFieldValue("#SelectedTrees_4");
      if (!schoolId || !unitId || !tree2 || !tree3) {
        return buildResult(false, "Missing lesson identifiers for school activity fallback");
      }
      const createPageResponse = await fetchHtml(`/Projects/Projects/Create?schoolId=${encodeURIComponent(schoolId)}`);
      if (!createPageResponse.ok || !createPageResponse.text) {
        return buildResult(false, "Could not open school activity creation page");
      }
      const createDocument = new DOMParser().parseFromString(createPageResponse.text, "text/html");
      const verificationToken = getFieldValue('[name="__RequestVerificationToken"]', createDocument);
      const hashKey = getFieldValue('[name="HashKey"]', createDocument);
      if (!verificationToken || !hashKey) {
        return buildResult(false, "Could not extract activity creation tokens");
      }
      const payload = new URLSearchParams();
      payload.append("TypeId", "1");
      payload.append("__RequestVerificationToken", verificationToken);
      payload.append("HashKey", hashKey);
      payload.append("Id", "");
      payload.append("schoolId", schoolId);
      payload.append("SelectedUnitId", unitId);
      payload.append("SelectedTrees_2", tree2);
      payload.append("SelectedTrees_3", tree3);
      if (tree4) payload.append("SelectedTrees_4", tree4);
      payload.append("Name", `\u0646\u0634\u0627\u0637 (${getCurrentLessonName()})`);
      payload.append("CategoryId", tree4 ? "1" : "4");
      payload.append("ClassificationLevel", "1");
      payload.append("ProjectType", "1");
      payload.append("Description", "\u0646\u0634\u0627\u0637 \u0645\u0646 \u0627\u0644\u0643\u062A\u0627\u0628 \u0645\u0631\u062A\u0628\u0637 \u0628\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062F\u0631\u0633\u060C \u0645\u0639 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u064A\u0646.");
      payload.append("PageNumber", "13");
      payload.append("QuestionsNumber", "1");
      payload.append("SaveButton", "");
      if (tree4) {
        payload.append("hfLevelsCount", "4");
        payload.append("hfDrawTree", "/Projects/Projects/DrawTreeToClassLesson");
      } else {
        payload.append("hfLevelsCount", "3");
        payload.append("hfDrawTree", "/Projects/Projects/DrawTreeToClassLesson");
      }
      payload.append("SolvingType", "3");
      payload.append("AccessType", "False");
      const saveResponse = await fetchHtml("/Projects/Projects/Create", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          requestverificationtoken: getCsrfToken() || verificationToken
        },
        body: payload.toString()
      });
      if (!saveResponse.ok) {
        return buildResult(false, "School activity fallback request failed");
      }
      await sleep(1200);
      const counts = getLessonResourceCounts();
      if (counts.hasAny) {
        hasInjectedFallbackResource = true;
        return buildResult(true, "School activity created and linked", { counts });
      }
      return buildResult(false, "School activity was created but not linked to the lesson");
    }
    async function createAssignmentFallback(options) {
      const settings = options || {};
      if (hasInjectedFallbackResource && !settings.force) {
        return buildResult(true, "Fallback resource already created");
      }
      const csrfToken = getCsrfToken();
      const schoolId = getSchoolIdValue();
      const unitId = getFieldValue("#SelectedUnitId");
      const tree2 = getFieldValue("#SelectedTrees_2");
      const tree3 = getFieldValue("#SelectedTrees_3");
      const tree4 = getFieldValue("#SelectedTrees_4");
      const assignmentLessonId = tree4 || tree3;
      const assignmentParentId = tree4 ? tree3 : tree2;
      if (!csrfToken || !schoolId || !unitId || !tree2 || !tree3) {
        return buildResult(false, "Missing lesson identifiers for assignment fallback");
      }
      const payload = new URLSearchParams();
      payload.append("SaveButton", "");
      payload.append("IdEnc", "");
      payload.append("Id", "0");
      payload.append("TreeId", assignmentLessonId);
      payload.append("IsTreeLevel", "false");
      payload.append("IsQuran", "false");
      payload.append("txt_UploadUrl", "/Teacher/Assignments/UploadFile");
      payload.append("SelectedUnitId", unitId);
      payload.append("SelectedTrees_2", tree2);
      payload.append("SelectedTrees_3", tree3);
      if (tree4) payload.append("SelectedTrees_4", tree4);
      payload.append("selectedSubjectId", unitId);
      payload.append("selectedTreeId", assignmentParentId);
      payload.append("selectedLessonse", assignmentLessonId);
      payload.append("isNotUserLayout", "True");
      payload.append("Name", `\u0648\u0627\u062C\u0628 (${getCurrentLessonName()})`);
      payload.append("QuranLessonType", "1");
      payload.append("AssignmentType", "1");
      payload.append("Description", "\u0642\u0645 \u0628\u062D\u0644 \u0623\u0633\u0626\u0644\u0629 \u0627\u0644\u062F\u0631\u0633 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0645\u0646 \u0643\u062A\u0627\u0628 \u0627\u0644\u0637\u0627\u0644\u0628 \u0648\u062A\u0633\u0644\u064A\u0645 \u0627\u0644\u0625\u062C\u0627\u0628\u0629 \u062F\u0627\u062E\u0644 \u0627\u0644\u0646\u0638\u0627\u0645.");
      payload.append("filePath", "");
      payload.append("PageNumber", "13");
      payload.append("QuestionsNumber", "1");
      payload.append("SolvingType", "2");
      payload.append("AccessType", "False");
      payload.append("schoolId", schoolId);
      payload.append(tree4 ? "hformrawTree" : "hfDrawTree", "/Teacher/Assignments/DrawTreeToClassLesson");
      payload.append("hfLevelsCount", tree4 ? "4" : "3");
      payload.append("X-Requested-With", "XMLHttpRequest");
      const saveResponse = await fetchHtml(`/Teacher/Assignments/Manage?isNotUserLayout=True&selectedSubjectId=${encodeURIComponent(unitId)}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "X-Requested-With": "XMLHttpRequest",
          requestverificationtoken: csrfToken
        },
        body: payload.toString()
      });
      if (!saveResponse.ok) {
        return buildResult(false, "Assignment fallback request failed");
      }
      await sleep(1200);
      const counts = getLessonResourceCounts();
      if (counts.hasAny) {
        hasInjectedFallbackResource = true;
        return buildResult(true, "Assignment created and linked", { counts });
      }
      return buildResult(false, "Assignment was created but not linked to the lesson");
    }
    async function ensureLessonRequirementSatisfied(options) {
      const settings = options || {};
      const initialCounts = getLessonResourceCounts();
      const hasVisibleResource = Boolean(
        initialCounts.enrichments || initialCounts.assignments || initialCounts.exams || initialCounts.projects
      );
      const hasKnownResource = settings.ignoreInjectedResource ? hasVisibleResource : initialCounts.hasAny;
      if (hasKnownResource) {
        return buildResult(true, "Lesson already has a resource", { counts: initialCounts });
      }

      // 1. SKIP UI Enrichment completely. Go directly to Silent POST Assignment.
      // This perfectly mimics the competitor's speed and reliability.
      const assignmentResult = await createAssignmentFallback({ force: true });
      if (assignmentResult.ok) {
        return assignmentResult;
      }

      // 2. Silent POST School Activity Fallback
      const activityResult = await createSchoolActivityFallback({ force: true });
      if (activityResult.ok) {
        return activityResult;
      }

      // 3. Last resort: UI Project Flow
      const projectFlowResult = await handleProjectResourceFlow();
      if (projectFlowResult.ok) {
        return projectFlowResult;
      }

      return buildResult(false, "Could not add assignment or school activity in the background.");
    }
    async function ensureLessonGoalSelected(root) {
      const scope = getRootScope(root);
      if (!scope) return buildResult(true, "No enrichment scope found");
      const goalsSelect = scope.querySelector("#LessonsGoalsList");
      if (!goalsSelect) return buildResult(true, "No lesson goals selector found");
      const options = Array.from(goalsSelect.options || []).filter((option) => option.value && !option.disabled);
      if (!options.length) {
        return buildResult(false, "No lesson goals available");
      }
      const selectedValues = Array.from(goalsSelect.selectedOptions || []).map((option) => option.value).filter(Boolean);
      if (!selectedValues.length) {
        const firstGoal = options[0];
        firstGoal.selected = true;
        triggerEvents(goalsSelect, ["input", "change", "blur"]);
        const hiddenGoals = scope.querySelector('#SelectedGoles, input[name="SelectedGoles"]');
        if (hiddenGoals) {
          setNativeValue(hiddenGoals, firstGoal.value);
        }
        const checkboxSelector = `.multiselect-container input[type="checkbox"][value="${firstGoal.value}"]`;
        const goalCheckbox = scope.querySelector(checkboxSelector);
        if (goalCheckbox && !goalCheckbox.checked) {
          goalCheckbox.checked = true;
          triggerEvents(goalCheckbox, ["input", "change", "click", "blur"]);
        }
        const pluralHiddenGoals = scope.querySelector('input[name="Goals"], input[name="SelectedGoals"]');
        if (pluralHiddenGoals) {
          setNativeValue(pluralHiddenGoals, firstGoal.value);
        }
        const rootDocument = getRootDocument(scope);
        const rootWindow = rootDocument.defaultView || window;
        if (typeof rootWindow.changeGoals === "function") {
          try {
            rootWindow.changeGoals();
          } catch {
          }
        }
      }
      return buildResult(true, "Lesson goal selected");
    }
    async function fillEnrichmentCreationForm(root) {
      const scope = getRootScope(root);
      if (!scope) return buildResult(true, "No enrichment creation form found");
      const goalResult = await ensureLessonGoalSelected(scope);
      if (!goalResult.ok) return goalResult;
      const selects = Array.from(scope.querySelectorAll("select")).filter((select) => {
        if (select.id === "LessonsGoalsList") return false;
        return isTrulyVisible(select);
      });
      for (const select of selects) {
        const option = Array.from(select.options).find((item) => item.text && item.text.includes("\u0631\u0627\u0628\u0637"));
        if (option) {
          select.selectedIndex = option.index;
          triggerEvents(select, ["input", "change", "blur"]);
        }
      }
      const nameField = scope.querySelector('#txtName, #Name, input[name="txtName"], input[name="Name"]');
      const descriptionField = scope.querySelector('#txtHelpText, #Description, textarea[name="txtHelpText"], textarea[name="Description"], textarea');
      let urlField = scope.querySelector('#txtFullPath, input[name="txtFullPath"], input[name="FullPath"], input[name="Url"], input[type="url"]');
      if (!urlField) {
        urlField = Array.from(scope.querySelectorAll('input[type="text"], input[type="url"], input:not([type])')).find((input) => isTrulyVisible(input) && input !== nameField);
      }
      if (isTrulyVisible(nameField)) setNativeValue(nameField, "\u0625\u062B\u0631\u0627\u0621 \u062A\u0639\u0644\u064A\u0645\u064A \u0634\u0627\u0645\u0644 \u0644\u0644\u062F\u0631\u0633");
      if (isTrulyVisible(descriptionField)) setNativeValue(descriptionField, "\u0645\u0627\u062F\u0629 \u0625\u062B\u0631\u0627\u0626\u064A\u0629 \u0644\u062F\u0639\u0645 \u062A\u0639\u0644\u0645 \u0627\u0644\u0637\u0644\u0627\u0628 \u0648\u0631\u0628\u0637 \u0627\u0644\u0645\u0641\u0627\u0647\u064A\u0645 \u0628\u0627\u0644\u062F\u0631\u0633.");
      if (isTrulyVisible(urlField)) setNativeValue(urlField, "https://ien.edu.sa");
      const saveButton = findPreferredElement({
        root: scope,
        attributes: [
          'button[onclick*="addAttchmentLink"]',
          'a[onclick*="addAttchmentLink"]',
          ".submit-form-btn",
          'button[type="submit"]',
          'input[type="submit"]'
        ],
        classes: [".submit-form-btn", ".btn-primary"],
        texts: ["\u062D\u0641\u0638"]
      });
      if (saveButton) {
        activateElementOnce(saveButton);
        await sleep(2500);
      }
      if (isSecondPageVisible()) {
        await returnToMainLessonPage();
      }
      return buildResult(true, "Enrichment handled");
    }
    function getProjectCreationRoot() {
      const iframeDocuments = Array.from(document.querySelectorAll("iframe")).map((iframe) => getIframeDocument(iframe)).filter(Boolean);
      const candidates = [
        ...Array.from(document.querySelectorAll('.modal.show, .modal.in, [role="dialog"]')),
        ...iframeDocuments,
        document
      ];
      for (const candidate of candidates) {
        const scope = getRootScope(candidate);
        if (!scope) continue;
        const isDocumentRoot = Boolean(candidate.body && typeof candidate.querySelector === "function");
        if (!isDocumentRoot && !isTrulyVisible(scope)) continue;
        const markers = Array.from(scope.querySelectorAll(
          '#Name, #CategoryId, #TotalGrade, input[name="ClassificationLevel"], input.ProjectType, input.SolvingType, button[type="submit"], .modal-footer .btn-primary, .card-footer .btn-primary'
        ));
        if (markers.some(isTrulyVisible)) {
          return scope;
        }
      }
      return null;
    }
    function setCheckedInput(input) {
      if (!input || input.disabled) return false;
      input.checked = true;
      simulateHumanClick(input);
      triggerEvents(input, ["input", "change", "click", "blur"]);
      return true;
    }
    function setSelectValue(select, preferredValues) {
      if (!select || select.disabled) return false;
      const values = Array.isArray(preferredValues) ? preferredValues : [preferredValues];
      const option = values.filter(Boolean).map((value) => Array.from(select.options || []).find((item) => item.value === String(value))).find(Boolean) || Array.from(select.options || []).find((item) => item.value && !item.disabled);
      if (!option) return false;
      select.value = option.value;
      triggerEvents(select, ["input", "change", "blur"]);
      return true;
    }
    async function fillActivitySchedulingFields(scope) {
      const isMulti = isMultiLessonMode(scope.ownerDocument || document);
      const targetValue = isMulti ? "2" : "1";
      const teachingModeRadio = scope.querySelector(`input[name="LessonType"][value="${targetValue}"]`) || (() => {
        return Array.from(scope.querySelectorAll('input[type="radio"]')).find((r) => {
          const txt = (r.closest("label, .form-check")?.innerText || r.value || "").replace(/\s+/g, " ");
          if (isMulti) {
            return txt.includes("\u063A\u064A\u0631 \u0645\u062A\u0632\u0627\u0645\u0646") || txt.includes("\u062A\u0639\u0644\u0645 \u0630\u0627\u062A\u064A");
          } else {
            return txt.includes("\u0645\u062A\u0632\u0627\u0645\u0646") && !txt.includes("\u063A\u064A\u0631 \u0645\u062A\u0632\u0627\u0645\u0646") || txt.includes("\u064A\u0633\u062A\u0644\u0632\u0645 \u062D\u0636\u0648\u0631");
          }
        });
      })();
      if (teachingModeRadio && !teachingModeRadio.disabled) {
        setCheckedInput(teachingModeRadio);
        await sleep(400);
      }
      const radioSlotContainers = Array.from(scope.querySelectorAll(".radio-slots"));
      if (radioSlotContainers.length) {
        for (const container of radioSlotContainers) {
          const radios = Array.from(container.querySelectorAll('input[type="radio"]')).filter((r) => !r.disabled && isTrulyVisible(r));
          if (!radios.length) continue;
          if (!radios.some((r) => r.checked)) {
            setCheckedInput(radios[0]);
          }
        }
      } else {
        const seenGroups = /* @__PURE__ */ new Set();
        const periodRadios = Array.from(scope.querySelectorAll('input[type="radio"][name^="r_"]')).filter((r) => !r.disabled && isTrulyVisible(r));
        for (const radio of periodRadios) {
          const group = radio.name;
          if (seenGroups.has(group)) continue;
          seenGroups.add(group);
          const groupRadios = periodRadios.filter((r) => r.name === group);
          if (!groupRadios.some((r) => r.checked)) {
            setCheckedInput(groupRadios[0]);
          }
        }
      }
      const daysField = scope.querySelector('input[name="DayCount"]') || scope.querySelector('input[id^="DayCount_"]') || (() => {
        return Array.from(scope.querySelectorAll('input[type="number"]')).find((input) => {
          const nearby = input.closest(".position-relative, .form-group, .row")?.innerText || "";
          return /أيام|يوم|deadline|days/i.test(nearby);
        });
      })();
      if (daysField && isTrulyVisible(daysField) && !daysField.disabled) {
        setNativeValue(daysField, "3");
      }
      const gradeBookCheckbox = scope.querySelector('input[type="checkbox"][name^="isGradeBook"]') || scope.querySelector('input[type="checkbox"][id^="isGradeBook"]') || (() => {
        return Array.from(scope.querySelectorAll('input[type="checkbox"]')).find((cb) => {
          const labelText = (cb.closest("label")?.innerText || cb.parentElement?.innerText || "").replace(/\s+/g, " ");
          return labelText.includes("\u0633\u062C\u0644 \u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0627\u0644\u064A\u0648\u0645\u064A");
        });
      })();
      if (gradeBookCheckbox && !gradeBookCheckbox.disabled && !gradeBookCheckbox.checked) {
        setCheckedInput(gradeBookCheckbox);
      }
    }
    async function submitProjectCreationForm(root) {
      const scope = getRootScope(root);
      if (!scope) return buildResult(false, "Project creation form is unavailable");
      const lessonTreeValue = getFieldValue("#SelectedTrees_4") || getFieldValue("#SelectedTrees_3");
      const nameField = scope.querySelector('#Name, input[name="Name"]');
      const descriptionField = scope.querySelector('#Description, textarea[name="Description"]');
      const linkField = scope.querySelector('#Link, input[name="Link"], input[placeholder*="http"]');
      const gradeField = scope.querySelector('#TotalGrade, input[name="TotalGrade"]');
      const pageNumberField = scope.querySelector('#PageNumber, input[name="PageNumber"]');
      const questionNumberField = scope.querySelector('#QuestionsNumber, input[name="QuestionsNumber"]');
      const hiddenProjectTypeField = scope.querySelector('#ProjectType, input[name="ProjectType"]');
      const categorySelect = scope.querySelector('#CategoryId, select[name="CategoryId"]');
      const classificationRadio = scope.querySelector("#classificationLevel1") || scope.querySelector('input[name="ClassificationLevel"][value="1"]');
      const relatedToSubjectRadio = scope.querySelector("#IsRelatedToSubject") || scope.querySelector('input[name="IsRelatedToSubject"][value="true"]');
      const projectTypeRadio = scope.querySelector("#ProjectType1") || scope.querySelector('input[name="ProjectType"][value="1"]') || scope.querySelector("#ProjectType4") || scope.querySelector('input[name="ProjectType"][value="4"]') || scope.querySelector('input[name="ProjectType"]:checked') || scope.querySelector('input[name="ProjectType"]');
      const solvingTypeRadio = scope.querySelector("#OutsideSystem") || scope.querySelector('input[name="SolvingType"][value="3"]') || scope.querySelector('input[name="SolvingType"]:checked') || scope.querySelector('input[name="SolvingType"]');
      if (isTrulyVisible(nameField)) {
        setNativeValue(nameField, `\u0646\u0634\u0627\u0637 (${getCurrentLessonName()})`);
      }
      if (classificationRadio) {
        setCheckedInput(classificationRadio);
      }
      if (relatedToSubjectRadio && isTrulyVisible(relatedToSubjectRadio)) {
        setCheckedInput(relatedToSubjectRadio);
      }
      if (categorySelect) {
        setSelectValue(categorySelect, lessonTreeValue ? ["1", "4"] : ["4", "1"]);
      }
      if (projectTypeRadio) {
        setCheckedInput(projectTypeRadio);
      }
      if (hiddenProjectTypeField) {
        const preferredProjectType = projectTypeRadio && projectTypeRadio.value ? projectTypeRadio.value : "1";
        setNativeValue(hiddenProjectTypeField, preferredProjectType);
      }
      if (descriptionField) {
        setNativeValue(
          descriptionField,
          "\u0646\u0634\u0627\u0637 \u0645\u0646 \u0627\u0644\u0643\u062A\u0627\u0628 \u0645\u0631\u062A\u0628\u0637 \u0628\u0645\u0648\u0636\u0648\u0639 \u0627\u0644\u062F\u0631\u0633\u060C \u0645\u0639 \u062A\u062D\u062F\u064A\u062F \u0627\u0644\u0635\u0641\u062D\u0629 \u0648\u0627\u0644\u0633\u0624\u0627\u0644 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u064A\u0646."
        );
      }
      if (linkField) {
        setNativeValue(linkField, "");
      }
      if (gradeField && isTrulyVisible(gradeField)) {
        setNativeValue(gradeField, "10");
      }
      if (pageNumberField && isTrulyVisible(pageNumberField)) {
        setNativeValue(pageNumberField, "13");
      }
      if (questionNumberField && isTrulyVisible(questionNumberField)) {
        setNativeValue(questionNumberField, "1");
      }
      if (solvingTypeRadio) {
        setCheckedInput(solvingTypeRadio);
      }
      const saveButton = findPreferredElement({
        root: scope,
        attributes: [
          'button[type="submit"]',
          'input[type="submit"]',
          ".modal-footer .btn-primary",
          ".card-footer .btn-primary"
        ],
        classes: [".btn-primary", ".submit-form-btn", ".btn-main"],
        texts: ["\u062D\u0641\u0638", "\u0625\u0636\u0627\u0641\u0629"]
      });
      if (!saveButton) {
        return buildResult(false, "Could not find the project save button");
      }
      await fillActivitySchedulingFields(scope);
      activateElementOnce(saveButton);
      await sleep(2600);
      return buildResult(true, "Project creation submitted");
    }
    function getProjectEntryIds(root) {
      const scope = root || document;
      return Array.from(scope.querySelectorAll('[id^="ProjectId_"]')).map((input) => {
        const match = input.id.match(/^ProjectId_(.+)$/);
        return match ? match[1] : "";
      }).filter(Boolean);
    }
    function openProjectSelectionModal(projectId, root) {
      const scope = root || document;
      const selectors = [
        `[data-bs-target="#selectProjectForm_${projectId}"]`,
        `[href="#selectProjectForm_${projectId}"]`,
        `[onclick*="selectProjectForm_${projectId}"]`,
        `[onclick*="setDefaultDates(${projectId})"]`
      ];
      for (const selector of selectors) {
        const button = scope.querySelector(selector);
        if (button && isTrulyVisible(button)) {
          activateElementOnce(button);
          return true;
        }
      }
      return false;
    }
    async function attachProjectToLesson(projectId, root) {
      // FIX 3: Wrap modal open + setDefaultDates in try/catch so optional UI
      // failures don't crash the entire AI flow.
      try {
        openProjectSelectionModal(projectId, root);
      } catch (err) {
        log("attachProjectToLesson: openProjectSelectionModal error:", err);
      }
      await sleep(800);
      try {
        if (typeof globalThis.setDefaultDates === "function") {
          globalThis.setDefaultDates(projectId);
        }
      } catch (err) {
        log("attachProjectToLesson: setDefaultDates error:", err);
      }
      try {
        const gradeField = document.getElementById(`gradeInProject_${projectId}`);
        if (gradeField && !(gradeField.value || "").trim()) {
          setNativeValue(gradeField, "10");
        }
      } catch (err) {
        log("attachProjectToLesson: gradeField error:", err);
      }
      const modalRoot = document.getElementById(`selectProjectForm_${projectId}`) || document;
      const addButton = findPreferredElement({
        root: modalRoot,
        attributes: [
          `button[onclick*="check(${projectId})"]`,
          `a[onclick*="check(${projectId})"]`
        ],
        classes: [".btn-primary", ".btn-main"],
        texts: ["\u0625\u0636\u0627\u0641\u0629", "\u062D\u0641\u0638"]
      });
      try {
        await fillActivitySchedulingFields(modalRoot);
      } catch (err) {
        log("attachProjectToLesson: fillActivitySchedulingFields error:", err);
      }
      if (addButton && isTrulyVisible(addButton)) {
        activateElementOnce(addButton);
      } else if (typeof globalThis.check === "function") {
        try {
          const result = globalThis.check(projectId);
          if (result === false) {
            return buildResult(false, "Project validation failed before attaching to the lesson");
          }
        } catch (error) {
          log("check(projectId) error:", error);
          return buildResult(false, "Could not attach the project to the lesson");
        }
      } else {
        return buildResult(false, "Could not find the project attach action");
      }
      const linked = await waitForValue(() => {
        const counts = getLessonResourceCounts();
        return counts.projects || counts.hasAny ? counts : null;
      }, 12e3, 250);
      if (linked) {
        hasInjectedFallbackResource = true;
        return buildResult(true, "Project linked to the lesson", { counts: linked });
      }
      return buildResult(false, "Project was created but not linked to the lesson");
    }
    async function handleProjectResourceFlow() {
      const existingCounts = getLessonResourceCounts();
      if (existingCounts.projects || existingCounts.hasAny) {
        return buildResult(true, "Lesson already has a linked project", { counts: existingCounts });
      }
      if (!isSecondPageVisible()) {
        const projectButton = findPreferredElement({
          attributes: [
            '[onclick*="loadProjects"]',
            '[onclick*="GetProjectsList"]',
            `[onclick*="showhidedivs('mainPage', 'secondPage')"]`
          ],
          classes: [".btn-outline-info", ".btn-main"],
          texts: ["\u0625\u0636\u0627\u0641\u0629 \u0646\u0634\u0627\u0637"]
        });
        if (!projectButton) {
          return buildResult(false, "Could not find the school activity button");
        }
        activateElementOnce(projectButton);
        await sleep(1600);
      }
      const secondPage = await waitForValue(
        () => isSecondPageVisible() ? document.getElementById("secondPage") || document : null,
        8e3
      );
      if (!secondPage) {
        return buildResult(false, "School activity bank page did not open");
      }
      let projectIds = getProjectEntryIds(secondPage);
      if (!projectIds.length) {
        const createButton = findPreferredElement({
          root: secondPage,
          attributes: [
            'a[onclick*="/Projects/Projects/Create"]',
            'button[onclick*="/Projects/Projects/Create"]',
            'a[onclick*="openCreationModal"]',
            'button[onclick*="openCreationModal"]'
          ],
          classes: [".btn-primary", ".btn-main"],
          texts: ["\u0625\u0636\u0627\u0641\u0629 \u0646\u0634\u0627\u0637"]
        });
        if (!createButton) {
          await returnToMainLessonPage();
          return buildResult(false, "No project is available and the project creation button was not found");
        }
        activateElementOnce(createButton);
        await sleep(1800);
        const creationRoot = await waitForValue(() => getProjectCreationRoot(), 8e3);
        if (!creationRoot) {
          await returnToMainLessonPage();
          return buildResult(false, "Project creation form did not open");
        }
        const creationResult = await submitProjectCreationForm(creationRoot);
        if (!creationResult.ok) {
          await returnToMainLessonPage();
          return creationResult;
        }
        await waitForValue(() => isSecondPageVisible() ? true : null, 8e3);
        await sleep(1600);
        projectIds = getProjectEntryIds(document.getElementById("secondPage") || document);
      }
      if (!projectIds.length) {
        await returnToMainLessonPage();
        return buildResult(false, "No project was available to attach after creation");
      }
      const attachResult = await attachProjectToLesson(projectIds[0], document.getElementById("secondPage") || document);
      await returnToMainLessonPage();
      return attachResult;
    }
    async function handleSecondPageEnrichmentFlow() {
      try {
        const secondPage = document.getElementById("secondPage");
        if (!isTrulyVisible(secondPage)) return buildResult(true, "Enrichment bank page not visible");

        // 1. التعديل الجديد: البحث عن زرار "اختر الإثراء" لو الإثراء موجود مسبقاً
        const selectExistingBtn = findPreferredElement({
          root: secondPage,
          attributes: ['[onclick*="check"]', '[onclick*="Select"]', '[onclick*="select"]'],
          classes: ['.btn-success', '.btn-primary'],
          texts: ["اختر الإثراء", "اختر", "إختيار"]
        });

        if (selectExistingBtn) {
          log("Found existing enrichment, clicking 'Choose'...");
          activateElementOnce(selectExistingBtn);
          await sleep(3000); // انتظار حتى يتم ربط الإثراء
          if (isSecondPageVisible()) {
            await returnToMainLessonPage();
          }
          return buildResult(true, "Selected existing enrichment from bank");
        }

        // 2. لو مفيش إثراء موجود، يروح يضغط على "إضافة إثراء" لإنشاء واحد جديد
        const createButton = findPreferredElement({
          root: secondPage,
          attributes: [
            'a[onclick*="openCreationModal"]',
            'button[onclick*="openCreationModal"]'
          ],
          classes: [".btn-primary"],
          texts: ["إضافة إثراء", "اضافة اثراء"]
        });

        const noItemsMessage = findElementByText("div, span, p", "لايوجد إثراءات يمكن عرضها", secondPage) || findElementByText("div, span, p", "لايوجد  إثراءات يمكن عرضها", secondPage);

        if ((noItemsMessage || createButton) && createButton) {
          activateElementOnce(createButton);
          await sleep(2000);
        }

        const creationRoot = await waitForValue(() => getEnrichmentCreationRoot(), 7000);
        if (creationRoot) {
          return await fillEnrichmentCreationForm(creationRoot);
        }

        await returnToMainLessonPage();
        return buildResult(true, "Could not handle enrichment bank, returned to lesson form");

      } catch (error) {
        log("handleSecondPageEnrichmentFlow error:", error);
        await returnToMainLessonPage();
        return buildResult(false, "Error in enrichment flow: " + error.message);
      }
    }
    async function handleEnrichmentForm() {
      const directCreationRoot = getEnrichmentCreationRoot();
      if (directCreationRoot) {
        return fillEnrichmentCreationForm(directCreationRoot);
      }
      let enrichButton = findPreferredElement({
        attributes: [
          '[onclick*="loadActivities"]',
          '[onclick*="searchActivitesList"]',
          `[onclick*="showhidedivs('mainPage', 'secondPage')"]`
        ],
        classes: [".add-resource-btn"],
        texts: ["\u0625\u0636\u0627\u0641\u0629 \u0625\u062B\u0631\u0627\u0621"]
      });
      if (!enrichButton) return buildResult(true, "No enrichment form found");
      activateElementOnce(enrichButton);
      await sleep(1400);
      const nextTarget = await waitForValue(
        () => getEnrichmentCreationRoot() || (isSecondPageVisible() ? "SECOND_PAGE" : null),
        8e3
      );
      if (nextTarget === "SECOND_PAGE" || isSecondPageVisible()) {
        return handleSecondPageEnrichmentFlow();
      }
      if (nextTarget && nextTarget !== "SECOND_PAGE") {
        return fillEnrichmentCreationForm(nextTarget);
      }
      return buildResult(true, "Enrichment form did not open");
    }

    // src/content/step1-flow.js
    function findNextButton() {
      return findPreferredElement({
        ids: ["next", "btnNext"],
        attributes: [
          'a[onclick*="firstLessonDetailsPageSuccess"]',
          'a[href="#next"]',
          'button[data-action="next"]'
        ],
        classes: [".wizard-next", ".next-btn", ".btn-next"],
        texts: ["\u0627\u0644\u062A\u0627\u0644\u064A"]
      });
    }
    async function selectRequiredRadio(text) {
      const label = findElementByText("label, div, span, button, a", text);
      if (label) {
        simulateHumanClick(label);
        return true;
      }
      const radios = Array.from(document.querySelectorAll('input[type="radio"]'));
      for (const radio of radios) {
        const relatedText = [
          radio.value,
          radio.getAttribute("aria-label"),
          radio.parentElement && radio.parentElement.innerText
        ].filter(Boolean).join(" ");
        if (relatedText.includes(text)) {
          radio.checked = true;
          simulateHumanClick(radio);
          triggerEvents(radio, ["input", "change", "click", "blur"]);
          return true;
        }
      }
      return false;
    }
    async function runStep1Flow() {
      // ── Snapshot IDs into sessionStorage FIRST — before any DOM mutations ──────
      // The radio-button interactions below (LessonType, TARGET_RADIOS) trigger a
      // React state wipe that clears #SelectedUnitId and #SelectedTrees_* from the
      // DOM.  We must capture the user's manually-chosen values at the very instant
      // the button is clicked, before we touch anything else on the page.
      try {
        const _snapUnitId = getFieldValue("#SelectedUnitId");
        const _snapTree2 = getFieldValue("#SelectedTrees_2");
        const _snapTree3 = getFieldValue("#SelectedTrees_3");
        const _snapTree4 = getFieldValue("#SelectedTrees_4");
        const _snapTree5 = getFieldValue("#SelectedTrees_5");
        const _snapPayload = JSON.stringify({
          subjectId: _snapUnitId,
          tree2: _snapTree2,
          tree3: _snapTree3,
          lessonId: _snapTree4 || _snapTree3,   // tree4 when present, else tree3
          tree5: _snapTree5
        });
        window.sessionStorage.setItem("tahdiri_quick_ids", _snapPayload);
        console.log("[تحضيري] Step1: snapshotted IDs into sessionStorage:", _snapPayload);
      } catch (_snapErr) {
        console.warn("[تحضيري] Step1: could not snapshot IDs", _snapErr);
      }
      // ─────────────────────────────────────────────────────────────────────────
      updatePrimaryButton("\u062C\u0627\u0631\u064A \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u0627\u0631...", "loading");
      updateControlStatus("\u064A\u062A\u0645 \u0627\u0644\u0622\u0646 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0645\u0633\u0627\u0631 \u0627\u0644\u062F\u0631\u0627\u0633\u064A \u0648\u062E\u064A\u0627\u0631\u0627\u062A \u0627\u0644\u062F\u0631\u0633 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629...", "info");
      // Check for stored dashboard selection
      const dashboardSelection = await getDashboardSelectionForCurrentLesson();
      if (dashboardSelection) {
        log("Step1: found dashboard selection for", dashboardSelection.lessonId);
        updateControlStatus("\u062A\u0637\u0628\u064A\u0642 \u0627\u062E\u062A\u064A\u0627\u0631 \u0644\u0648\u062D\u0629 \u0627\u0644\u062A\u062D\u0636\u064A\u0631...", "info"); // تطبيق اختيار لوحة التحضير...
        await applyDashboardSelections(dashboardSelection);
        await clearDashboardSelection(dashboardSelection.lessonId);
      } else {
        // FIX 1: Only auto-select last option if the dropdown is currently empty.
        // If the user has already made a manual selection, preserve it.
        const firstSelect = document.getElementById("SelectedUnitId");
        if (isTrulyVisible(firstSelect) && !firstSelect.value) {
          await selectLastOption(firstSelect);
        }
        for (let index = 2; index <= 6; index++) {
          const select = await waitForOptions(`SelectedTrees_${index}`, 7e3);
          if (select && isTrulyVisible(select) && !select.value) {
            await selectLastOption(select);
          }
        }
      }
      const isMulti = isMultiLessonMode();
      const targetValue = isMulti ? "2" : "1";
      const fallbackText = isMulti ? "\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u063A\u064A\u0631 \u0645\u062A\u0632\u0627\u0645\u0646" : "\u0627\u0641\u062A\u0631\u0627\u0636\u064A \u0645\u062A\u0632\u0627\u0645\u0646";
      const teachingModeRadio = document.querySelector(`input[name="LessonType"][value="${targetValue}"]`);
      if (teachingModeRadio && !teachingModeRadio.disabled) {
        if (!teachingModeRadio.checked) {
          setCheckedInput(teachingModeRadio);
          await sleep(500);
        }
      } else {
        await selectRequiredRadio(fallbackText);
      }
      for (const radioText of TARGET_RADIOS) {
        await selectRequiredRadio(radioText);
      }
      await fillActivitySchedulingFields(document.body);
      await sleep(1200);
      const nextButton = findNextButton();
      if (!nextButton) {
        throw new Error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u062A\u0627\u0644\u064A");
      }
      if (!tryAcquireActionLock("step1-next", STEP1_NEXT_LOCK_TTL_MS)) {
        updateControlStatus("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062E\u0637\u0648\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0645\u0633\u0628\u0642\u064B\u0627 \u0644\u0647\u0630\u0627 \u0627\u0644\u062F\u0631\u0633. \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062F\u0631\u0633...", "info");
        return buildResult(true, "\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062E\u0637\u0648\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0645\u0633\u0628\u0642\u064B\u0627");
      }

      activateElementOnce(nextButton);
      lockActionElement(nextButton);
      const duplicateLessonError = await waitForValue(() => findDuplicateLessonErrorMessage(), 3e3, 250);
      if (duplicateLessonError) {
        releaseActionLock("step1-next");
        unlockActionElement(nextButton);
        return buildResult(false, duplicateLessonError, { code: "duplicate-lesson" });
      }
      updateControlStatus("\u062A\u0645 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u0627\u0631 \u0628\u0646\u062C\u0627\u062D. \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062F\u0631\u0633...", "success");
      return buildResult(true, "\u062A\u0645\u062A \u0627\u0644\u062E\u0637\u0648\u0629 \u0627\u0644\u0623\u0648\u0644\u0649 \u0628\u0646\u062C\u0627\u062D");
    }

    // src/content/settings.js
    var currentSaveSelector = SETTINGS_DEFAULTS.defaultSelector || DEFAULT_SAVE_SELECTOR;
    function getCurrentSaveSelector() {
      return currentSaveSelector;
    }
    function getSelectorProfile() {
      return getSync([
        STORAGE_KEYS.DEFAULT_SELECTOR || "defaultSelector",
        STORAGE_KEYS.SITE_PROFILES || "siteProfiles"
      ]).then((result) => {
        const profiles = result[STORAGE_KEYS.SITE_PROFILES || "siteProfiles"] || SETTINGS_DEFAULTS.siteProfiles || {};
        const currentProfile = profiles[window.location.hostname] || {};
        currentSaveSelector = currentProfile.selector || result[STORAGE_KEYS.DEFAULT_SELECTOR || "defaultSelector"] || SETTINGS_DEFAULTS.defaultSelector || '.submit-form-btn, #sub, a[href="#finish"]';
        return {
          selector: currentSaveSelector
        };
      }).catch(() => ({
        selector: currentSaveSelector
      }));
    }

    // src/content/step2-flow.js
    var isSaving = false;
    function resetSaving() {
      isSaving = false;
    }
    async function markLessonCheckboxes(aiData) {
      const lessonRoot = getLessonFormRoot();
      const processedGroups = new Set();
      for (const selector of REQUIRED_LESSON_CHECKBOX_GROUPS) {
        const checkboxes = Array.from(lessonRoot.querySelectorAll(selector)).filter(isCheckboxUsable);
        if (checkboxes.length > 0) {
          let matched = false;
          if (aiData && aiData.strategies && Array.isArray(aiData.strategies)) {
            var selectedStrategies = aiData.strategies;
            for (var cb of checkboxes) {
              var labelEl = cb.closest("label") || (cb.id ? document.querySelector('label[for="' + CSS.escape(cb.id) + '"]') : null);
              var labelText = labelEl ? (labelEl.textContent || "").trim() : (cb.parentElement ? cb.parentElement.textContent || "" : "").trim();
              if (labelText && selectedStrategies.includes(labelText)) {
                ensureCheckboxChecked(cb);
                matched = true;
              }
            }
          }
          // Fallback: Select specific logical choices by text if no AI match
          if (!matched) {
            const targetLabels = ["التعلم التعاوني", "العصف الذهني", "الكتاب", "السبورة التقليدية", "جهاز عرض البيانات", "التعلم الذاتي"];
            let selectedCount = 0;
            for (const cb of checkboxes) {
              const labelEl = cb.closest("label") || (cb.id ? document.querySelector('label[for="' + CSS.escape(cb.id) + '"]') : null);
              const labelText = labelEl ? (labelEl.textContent || "").trim() : (cb.parentElement ? cb.parentElement.textContent || "" : "").trim();

              if (targetLabels.some(t => labelText.includes(t))) {
                ensureCheckboxChecked(cb);
                selectedCount++;
              }
              if (selectedCount >= 2) break; // limit to 2 per group
            }

            // If our specific targets weren't found, fallback to first item
            if (selectedCount === 0 && checkboxes.length > 0) {
              ensureCheckboxChecked(checkboxes[0]);
            }
          }
        }
        if (selector === 'input[name="teachingTools"]' && aiData && Array.isArray(aiData.tools)) {
          var selectedTools = aiData.tools;
          for (var tcb of checkboxes) {
            var tlabelEl = tcb.closest("label") || (tcb.id ? document.querySelector('label[for="' + CSS.escape(tcb.id) + '"]') : null);
            var tlabelText = tlabelEl ? (tlabelEl.textContent || "").trim() : (tcb.parentElement ? tcb.parentElement.textContent || "" : "").trim();
            if (tlabelText && selectedTools.includes(tlabelText)) {
              ensureCheckboxChecked(tcb);
            }
          }
        }
        const sample = lessonRoot.querySelector(selector);
        if (sample && sample.name) processedGroups.add(sample.name);
      }
      const fallbackCheckboxes = Array.from(
        lessonRoot.querySelectorAll('.required input[type="checkbox"], .required input.radio-as-checkbox')
      );
      for (const checkbox of fallbackCheckboxes) {
        if (!isCheckboxUsable(checkbox)) continue;
        const groupKey = checkbox.name || checkbox.id || checkbox.className || `checkbox-${processedGroups.size}`;
        if (processedGroups.has(groupKey)) continue;
        processedGroups.add(groupKey);
        ensureCheckboxChecked(checkbox);
      }
    }
    function fillSpecificLessonFields(root) {
      let filled = false;
      for (const [fieldId, fieldValue] of Object.entries(EXPLICIT_LESSON_FIELD_VALUES)) {
        const field = root.querySelector(`#${CSS.escape(fieldId)}`);
        if (!field || !isTrulyVisible(field) || field.disabled || field.readOnly) continue;
        setNativeValue(field, fieldValue);
        filled = true;
      }
      const examGoalField = root.querySelector(".publish-ixam-goal");
      if (examGoalField && isTrulyVisible(examGoalField) && !examGoalField.disabled && !examGoalField.readOnly) {
        setNativeValue(examGoalField, "\u062A\u062D\u0642\u064A\u0642 \u0623\u0647\u062F\u0627\u0641 \u0627\u0644\u062F\u0631\u0633 \u0648\u0642\u064A\u0627\u0633 \u0641\u0647\u0645 \u0627\u0644\u0637\u0644\u0627\u0628 \u0644\u0644\u0645\u0641\u0627\u0647\u064A\u0645 \u0627\u0644\u0623\u0633\u0627\u0633\u064A\u0629.");
        filled = true;
      }
      const examTeacherNote = root.querySelector(".lesson-exam-teacher-note");
      if (examTeacherNote && isTrulyVisible(examTeacherNote) && !examTeacherNote.disabled && !examTeacherNote.readOnly) {
        setNativeValue(examTeacherNote, EXPLICIT_LESSON_FIELD_VALUES.TeacherNote);
        filled = true;
      }
      return filled;
    }
    async function fillLessonFields(aiData) {
      const lessonRoot = getLessonFormRoot();
      const currentLessonName = getCurrentLessonName();
      const hasAI = aiData && typeof aiData === "object";

      // 1. Fill specific named fields — override with AI data where applicable
      if (hasAI) {
        // Map AI closure to LectureClassCloseText if available
        if (aiData.closure) {
          var closeField = lessonRoot.querySelector("#LectureClassCloseText");
          if (closeField && isTrulyVisible(closeField) && !closeField.disabled && !closeField.readOnly) {
            setNativeValue(closeField, aiData.closure);
          }
        }
        // Map AI goals to LectureClassPreparationText if available
        if (aiData.goals) {
          var prepField = lessonRoot.querySelector("#LectureClassPreparationText");
          if (prepField && isTrulyVisible(prepField) && !prepField.disabled && !prepField.readOnly) {
            setNativeValue(prepField, aiData.goals);
          }
        }
      }
      fillSpecificLessonFields(lessonRoot);

      // 2. Fill textareas — use AI goals/closure or fallback to competitor text
      const textareas = getVisibleElements("textarea", lessonRoot).filter((field) => !field.closest("#CreateResourceForm"));
      for (let i = 0; i < textareas.length; i++) {
        const textarea = textareas[i];
        if ((textarea.value || "").trim()) continue;

        if (hasAI) {
          // Alternate between goals and closure for textareas
          var aiText = (i % 2 === 0) ? (aiData.goals || "") : (aiData.closure || "");
          if (aiText.trim()) {
            setNativeValue(textarea, aiText);
            continue;
          }
        }
        // Fallback to competitor text
        let textType = (i % 2 === 0) ? 'prep' : 'strategies';
        setNativeValue(textarea, getCompetitorText(textType, currentLessonName));
      }

      // 3. Fill text inputs — use AI homework or fallback
      const textInputs = getVisibleElements('input[type="text"]', lessonRoot).filter((field) => {
        return !field.closest("#CreateResourceForm") && !field.readOnly && !field.disabled;
      });
      for (const input of textInputs) {
        if ((input.value || "").trim()) continue;
        if (hasAI && aiData.homework && aiData.homework.trim()) {
          setNativeValue(input, aiData.homework);
          continue;
        }
        setNativeValue(input, getCompetitorText('prep', currentLessonName));
      }

      // 4. Fill contenteditable rich text fields
      const editables = getVisibleElements('[contenteditable="true"]', lessonRoot).filter((field) => !field.closest("#CreateResourceForm"));
      for (const editable of editables) {
        if ((editable.innerText || "").trim()) continue;
        editable.focus();
        if (hasAI && aiData.closure && aiData.closure.trim()) {
          editable.innerText = aiData.closure;
        } else {
          editable.innerText = getCompetitorText('strategies', currentLessonName);
        }
        triggerEvents(editable, ["input", "change", "blur"]);
      }
    }
    function findFinalSaveButtonSync(customSelector) {
      const exactTextButton = findPreferredElement({
        attributes: [
          customSelector || getCurrentSaveSelector(),
          'button[id="sub"]',
          'input[id="sub"]',
          'a[href="#finish"]',
          ".submit-form-btn",
          'button[type="submit"]',
          'input[type="submit"]',
          'button[onclick*="save"]',
          'input[onclick*="save"]'
        ],
        classes: [".btn.btn-primary.btn-main", "#sub", ".submit-form-btn", ".btn-main", ".btn-primary"],
        texts: ["\u062D\u0641\u0638 \u0648 \u0625\u0646\u0647\u0627\u0621", "\u062D\u0641\u0638 \u0648\u0625\u0646\u0647\u0627\u0621"]
      });
      if (exactTextButton) return exactTextButton;
      const genericSaveButton = findPreferredElement({
        attributes: [
          customSelector || getCurrentSaveSelector(),
          'button[id="sub"]',
          'input[id="sub"]',
          'a[href="#finish"]',
          ".submit-form-btn",
          'button[type="submit"]',
          'input[type="submit"]',
          'button[onclick*="save"]',
          'input[onclick*="save"]'
        ],
        classes: [".btn.btn-primary.btn-main", "#sub", ".submit-form-btn", ".btn-main", ".btn-primary"],
        texts: ["\u062D\u0641\u0638"]
      });
      if (!genericSaveButton) return null;
      const label = getElementLabel(genericSaveButton);
      if (label.includes("\u0639\u0648\u062F\u0629") || label.includes("\u0631\u062C\u0648\u0639") || label.includes("\u0627\u0644\u062A\u0627\u0644\u064A")) {
        return null;
      }
      return genericSaveButton;
    }
    async function findFinalSaveButton2() {
      const selectorProfile = await getSelectorProfile();
      return findFinalSaveButtonSync(selectorProfile.selector);
    }
    async function closeBlockingTourDialog() {
      const closeButton = findPreferredElement({
        ids: ["tg-dialog-close-btn"],
        attributes: ["#tg-dialog-close-btn", ".tg-dialog-close-btn"]
      });
      if (!closeButton) return false;
      activateElementOnce(closeButton);
      await sleep(300);
      return true;
    }
    async function acceptKnownConsentModal(options) {
      const modal = findPreferredElement({
        attributes: [options.modalSelector],
        classes: [options.modalSelector]
      });
      if (!modal || !isTrulyVisible(modal)) return false;
      const checkbox = modal.querySelector(options.checkboxSelector);
      if (checkbox) ensureCheckboxChecked(checkbox);
      if (options.confirmSelectors || options.confirmTexts) {
        const confirmButton = findPreferredElement({
          root: modal,
          attributes: options.confirmSelectors || [],
          classes: options.confirmClasses || [".btn-primary", ".btn-main"],
          texts: options.confirmTexts || []
        });
        if (confirmButton) {
          activateElementOnce(confirmButton);
        }
      }
      await sleep(options.waitAfter || 1200);
      return true;
    }
    async function handleAgreementModal() {
      if (await closeBlockingTourDialog()) return true;
      if (await acceptKnownConsentModal({
        modalSelector: "#behavior-modal",
        checkboxSelector: "#behavior-checkbox",
        confirmSelectors: [".cs-btn-behavior-modal"],
        confirmTexts: ["\u0627\u0648\u0627\u0641\u0642", "\u0623\u0648\u0627\u0641\u0642"],
        waitAfter: 1500
      })) return true;
      if (await acceptKnownConsentModal({
        modalSelector: "#privacy-notice-modal",
        checkboxSelector: "#privacy-notice-checkbox",
        confirmSelectors: [".cs-btn"],
        confirmTexts: ["\u0642\u0628\u0648\u0644"],
        waitAfter: 1500
      })) return true;
      if (await acceptKnownConsentModal({
        modalSelector: "#splashscreen",
        checkboxSelector: "#agreement",
        waitAfter: 2200
      })) return true;
      const label = findElementByText("label, div, span", "\u0645\u0648\u0627\u0641\u0642") || findElementByText("label, div, span", "\u0627\u0644\u062A\u0639\u0647\u062F") || findElementByText("label, div, span", "\u0623\u0642\u0631") || findElementByText("label, div, span", "\u0627\u0644\u062E\u0635\u0648\u0635\u064A\u0629");
      if (!label) return false;
      const modal = label.closest(".modal") || label.closest('[role="dialog"]');
      if (!modal) return false;
      let checkbox = null;
      try {
        checkbox = label.querySelector('input[type="checkbox"]');
      } catch {
        checkbox = null;
      }
      if (!checkbox) {
        const forAttr = label.getAttribute("for");
        if (forAttr) checkbox = document.getElementById(forAttr);
      }
      if (checkbox) ensureCheckboxChecked(checkbox);
      const confirmButton = findPreferredElement({
        root: modal,
        classes: [".btn-primary", ".btn-main"],
        texts: ["\u062A\u0623\u0643\u064A\u062F", "\u062D\u0641\u0638", "\u0645\u0648\u0627\u0641\u0642", "\u0627\u0648\u0627\u0641\u0642", "\u0623\u0648\u0627\u0641\u0642", "\u0642\u0628\u0648\u0644"]
      });
      if (!confirmButton) return Boolean(checkbox);
      activateElementOnce(confirmButton);
      await sleep(1200);
      return true;
    }
    async function waitForSaveCompletion(saveButton, timeoutMs = 3e4) {
      let activeSaveButton = saveButton;
      let attemptedRecovery = false;
      let submittedCurrentAttempt = false;
      const deadline = Date.now() + timeoutMs;
      while (Date.now() < deadline) {
        if (!submittedCurrentAttempt) {
          if (!document.contains(activeSaveButton) || !isTrulyVisible(activeSaveButton)) {
            const refreshedSaveButton = await findFinalSaveButton2();
            if (refreshedSaveButton && isTrulyVisible(refreshedSaveButton)) {
              activeSaveButton = refreshedSaveButton;
            } else if (detectPageState() !== FLOW_STATES.STEP2) {
              return buildResult(true, "Save button disappeared after page transition");
            } else {
              await sleep(600);
              continue;
            }
          }
          if (detectPageState() !== FLOW_STATES.STEP2) {
            return buildResult(true, "Page moved away from lesson form");
          }
          if (await handleAgreementModal()) {
            if (detectPageState() !== FLOW_STATES.STEP2) {
              return buildResult(true, "Agreement modal confirmed");
            }
          }
          if (!tryAcquireActionLock("final-save", FINAL_SAVE_LOCK_TTL_MS)) {
            return buildResult(true, "Final save was already submitted for this lesson");
          }
          await markFinalSaveSubmitted();
          activateElementOnce(activeSaveButton);
          lockActionElement(activeSaveButton);
          submittedCurrentAttempt = true;
          updateControlStatus("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062D\u0641\u0638 \u0627\u0644\u0646\u0647\u0627\u0626\u064A. \u0628\u0627\u0646\u062A\u0638\u0627\u0631 \u0627\u0644\u062A\u0623\u0643\u064A\u062F...", "info");
        }
        await sleep(1e3);
        if (detectPageState() !== FLOW_STATES.STEP2) {
          return buildResult(true, "Page moved away from lesson form after save");
        }
        const saveValidationError = findSaveValidationErrorMessage();
        if (saveValidationError) {
          await reopenAfterSaveValidationError();
          releaseActionLock("final-save");
          unlockActionElement(activeSaveButton);
          return buildResult(false, saveValidationError, { code: "save-validation-error" });
        }
        const duplicateLessonError = findDuplicateLessonErrorMessage();
        if (duplicateLessonError) {
          await reopenAfterSaveValidationError();
          releaseActionLock("final-save");
          unlockActionElement(activeSaveButton);
          return buildResult(false, duplicateLessonError, { code: "duplicate-lesson" });
        }
        const lessonRequirementError = findLessonRequirementErrorMessage();
        if (!lessonRequirementError) {
          continue;
        }
        if (!attemptedRecovery) {
          attemptedRecovery = true;
          await reopenAfterSaveValidationError();
          releaseActionLock("final-save");
          unlockActionElement(activeSaveButton);
          updateControlStatus("The site rejected the save because no lesson resource was linked. Recovering automatically...", "warning");
          await dismissLessonRequirementAlert();
          const recoveryResult = await ensureLessonRequirementSatisfied({
            skipEnrichment: true,
            ignoreInjectedResource: true,
            forceFallback: true
          });
          if (!recoveryResult.ok) {
            return buildResult(false, recoveryResult.message, { code: "missing-lesson-resource" });
          }
          await sleep(1e3);
          activeSaveButton = await findFinalSaveButton2() || activeSaveButton;
          submittedCurrentAttempt = false;
          continue;
        }
        return buildResult(false, lessonRequirementError, { code: "missing-lesson-resource" });
      }
      releaseActionLock("final-save");
      unlockActionElement(activeSaveButton);
      return buildResult(false, "Save timeout reached", { code: "save-timeout" });
    }
    async function runStep2Flow() {
      if (isSaving) {
        return buildResult(false, "A save action is already in progress", { code: "already-saving" });
      }
      isSaving = true;
      try {
        updatePrimaryButton("\u062C\u0627\u0631\u064A \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u062F\u0631\u0633...", "loading");
        updateControlStatus("\u062C\u0627\u0631\u064A \u062A\u0647\u064A\u0626\u0629 \u0635\u0641\u062D\u0629 \u0627\u0644\u062A\u062D\u0636\u064A\u0631...", "info");

        // Step 2-A: Wait for React-rendered textareas to be fully hydrated
        await waitForElement('textarea', 15000);
        await sleep(1000); // Extra buffer for React hydration
        await closeBlockingTourDialog();

        // Step 2-B: Retrieve AI data stored by Phase 1
        const storageResult = await new Promise(function (resolve) {
          chrome.storage.local.get(['aiLessonData'], resolve);
        });
        const aiData = storageResult.aiLessonData || null;

        if (aiData) {
          console.log('[\u062A\u062D\u0636\u064A\u0631\u064A AI] Step 2 \u2014 AI data found:', JSON.stringify(aiData).substring(0, 200));
          updateControlStatus("\u062C\u0627\u0631\u064A \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A...", "info");
          // fillLessonFields uses the updated setNativeValue, which targets the
          // HTMLTextAreaElement prototype setter so React registers the value.
          await fillLessonFields(aiData);
          await markLessonCheckboxes(aiData);
        } else {
          console.warn('[\u062A\u062D\u0636\u064A\u0631\u064A AI] No AI data found in storage, using fallback texts.');
          await fillLessonFields(null);
          await markLessonCheckboxes(null);
        }

        // Step 2-C: Satisfy the enrichment/activity requirement
        //           (must complete BEFORE the save click so tokens are in the DOM)
        updateControlStatus("\u062C\u0627\u0631\u064A \u0625\u0636\u0627\u0641\u0629 \u0627\u0644\u0625\u062B\u0631\u0627\u0621/\u0627\u0644\u0648\u0627\u062C\u0628 \u0627\u0644\u0645\u0637\u0644\u0648\u0628...", "info");
        await ensureLessonRequirementSatisfied();

        // Crucial wait: allow any popup/modal to close and React to flush
        // enrichment-widget hidden tokens back into the main form DOM.
        console.log('[\u062A\u062D\u0636\u064A\u0631\u064A] Enrichment complete. Waiting 2s for DOM to settle...');
        await sleep(2000);

        // Step 2-D: Native Save — let Madrasati encrypt and submit
        //           We do NOT construct FormData or fetch ourselves; the platform's
        //           own submission handler performs the required payload encryption.
        updateControlStatus("\u062C\u0627\u0631\u064A \u062D\u0641\u0638 \u0627\u0644\u062F\u0631\u0633...", "loading");
        const saveButton = await findFinalSaveButton2();
        if (!saveButton) {
          throw new Error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u062D\u0641\u0638");
        }

        // Clear AI data BEFORE clicking so it is not re-used if the page
        // partially reloads and boot() fires again during the save round-trip.
        chrome.storage.local.remove('aiLessonData');

        console.log('[\u062A\u062D\u0636\u064A\u0631\u064A] Clicking native save button — platform will encrypt and submit.');
        saveButton.click();

        updatePrimaryButton("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0644\u0644\u0645\u0646\u0635\u0629! \uD83D\uDE80", "success");
        updateControlStatus("\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062D\u0641\u0638 \u0644\u0644\u0645\u0646\u0635\u0629 \u0628\u0646\u062C\u0627\u062D.", "success");

        return buildResult(true, "\u062A\u0645 \u0625\u0631\u0633\u0627\u0644 \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0628\u0646\u062C\u0627\u062D");

      } catch (error) {
        console.error('[\u062A\u062D\u0636\u064A\u0631\u064A] Step 2 Flow Error:', error);
        updateControlStatus("\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u0636\u064A\u0631", "error");
        return buildResult(false, error.message || "\u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639", { code: "step2-error" });
      } finally {
        isSaving = false;
      }
    }
    async function runQuickPrepStep2Flow() {
      // ── PARASITE STRATEGY ────────────────────────────────────────────────────
      // Fetches rich Arabic lesson content from k.tahdiri.com via background.js,
      // decrypts both payloads, resolves the current lesson's named sections, and
      // injects the text directly into the Madrasati form fields.
      // Entirely replaces the old Madrasati internal API + template builder approach.
      if (isSaving) {
        return buildResult(false, "A save action is already in progress", { code: "already-saving" });
      }
      isSaving = true;
      try {
        log("runQuickPrepStep2Flow: START pathname=", window.location.pathname);
        updatePrimaryButton("جاري التحضير السريع...", "loading");
        updateControlStatus("جاري تهيئة صفحة التحضير...", "info");

        // Wait for React-rendered textareas
        await waitForElement("textarea", 15000);
        await sleep(1000);
        await closeBlockingTourDialog();

        // ── Restore IDs sequentially for React Hydration ─────────────────────────
        let subjectId = "", lessonId = "", tree2Value = "", tree3Value = "", tree5Value = "";
        try {
          const _raw = window.sessionStorage.getItem("tahdiri_quick_ids");
          if (_raw) {
            const _ids = JSON.parse(_raw);
            subjectId = _ids.subjectId || "";
            lessonId = _ids.lessonId || "";
            tree2Value = _ids.tree2 || "";
            tree3Value = _ids.tree3 || "";
            tree5Value = _ids.tree5 || "";

            log("[Parasite] Restoring dropdowns sequentially...");
            const _domMap = {
              "SelectedUnitId": subjectId,
              "SelectedTrees_2": tree2Value,
              "SelectedTrees_3": tree3Value,
              "SelectedTrees_4": lessonId,
              "SelectedTrees_5": tree5Value
            };
            for (const [_id, _val] of Object.entries(_domMap)) {
              if (!_val) continue;
              const _el = document.getElementById(_id);
              if (_el) {
                setNativeValue(_el, _val);
                await sleep(500); // السطر ده هو اللي هيمنع React من مسح الاختيارات
                log("[Parasite] restored #" + _id + " =", _val);
              }
            }
          }
        } catch (_readErr) {
          log("SessionStorage read error", _readErr);
        }
        // ─────────────────────────────────────────────────────────────────────────

        log("runQuickPrepStep2Flow: subjectId=", subjectId, "lessonId=", lessonId);

        // Headless API Strategy: parasite/competitor decrypt chain has been retired.
        // Fall back to the standard field-fill pipeline; richer plan generation
        // is now handled out-of-band by background.js + silent POST.
        void subjectId; void lessonId; void tree2Value;
        await fillLessonFields(null);

        // Always fill any remaining required checkboxes
        await markLessonCheckboxes(null);

        // ── Step H — Enrichment & Save ────────────────────────────────────────────
        updateControlStatus("جاري إضافة الإثراء المطلوب...", "info");
        await ensureLessonRequirementSatisfied();

        // Allow enrichment DOM tokens to settle before save
        await sleep(2000);

        updateControlStatus("جاري حفظ الدرس...", "loading");
        log("runQuickPrepStep2Flow: about to call findFinalSaveButton2");
        const saveButton = await findFinalSaveButton2();
        log("runQuickPrepStep2Flow: findFinalSaveButton2 returned:",
          saveButton ? ("found, text=" + (saveButton.textContent || "").trim().substring(0, 40)) : "null");
        if (!saveButton) {
          throw new Error("لم يتم العثور على زر الحفظ");
        }

        const saveResult = await waitForSaveCompletion(saveButton);
        log("runQuickPrepStep2Flow: waitForSaveCompletion result:", saveResult);

        if (!saveResult.ok) {
          return saveResult;
        }

        updatePrimaryButton("تم إرسال التحضير للمنصة! ⚡", "success");
        updateControlStatus("تم التحضير السريع وحفظ الدرس بنجاح.", "success");
        return buildResult(true, "تم التحضير السريع بنجاح");

      } catch (error) {
        log("runQuickPrepStep2Flow error:", error);
        updateControlStatus("حدث خطأ أثناء التحضير السريع", "error");
        return buildResult(false, error.message || "خطأ غير متوقع", { code: "quick-step2-error" });
      } finally {
        isSaving = false;
      }
    }


    // src/content/index.js

    var step2CompletedThisSession = false;
    var sessionLocked = false;
    var isEnabled = false;
    var mutationObserver = null;
    function startMutationObserver() {
      if (mutationObserver || !document.body) return;
      mutationObserver = new MutationObserver(() => {
        if (!isEnabled || sessionLocked || AutomationController.running || AutomationController.starting || step2CompletedThisSession || AutomationController.state === FLOW_STATES.DONE || AutomationController.state === FLOW_STATES.ERROR || AutomationController.state === FLOW_STATES.IDLE || AutomationController.state === FLOW_STATES.DASHBOARD) return;
        const detectedState = detectPageState();
        if (AutomationController.state === FLOW_STATES.STEP2 && detectedState === FLOW_STATES.STEP2) {
          updateControlStatus("\u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062F\u0631\u0633. \u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062D\u0641\u0638...", "info");
          void AutomationController.run();
        }
      });
      mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    var AutomationController = {
      state: FLOW_STATES.IDLE,
      starting: false,
      running: false,
      mode: "auto",
      async loadState() {
        const data = await getLocal([AUTOMATION_STATE_KEY, AUTOMATION_MODE_KEY, "storedPathKey"]);
        this.state = data[AUTOMATION_STATE_KEY] || FLOW_STATES.IDLE;
        this.mode = data[AUTOMATION_MODE_KEY] || "auto";
        return data;
      },
      async setState(nextState) {
        this.state = nextState;
        const update = { [AUTOMATION_STATE_KEY]: nextState, [AUTOMATION_MODE_KEY]: this.mode };
        if (nextState !== FLOW_STATES.IDLE) {
          update.storedPathKey = getAutomationActionKey("path-info");
        }
        await setLocal(update);
        if (nextState !== FLOW_STATES.DONE) {
          await clearSaveSubmittedMarker();
        }
      },
      async start(mode) {
        injectControlPanel();
        clearUiRemoval();
        if (this.starting || this.running) {
          updateControlStatus("\u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u064A\u0639\u0645\u0644 \u0628\u0627\u0644\u0641\u0639\u0644.", "info");
          return;
        }
        this.starting = true;
        try {
          this.mode = mode || "auto";
          isEnabled = true;
          const nextState = FLOW_STATES.STEP1;
          await this.setState(nextState);
          setButtonsDisabled(true);
          await sendAutomationStatus("START", { state: nextState, mode: this.mode });
          updateControlStatus("\u062A\u0645 \u0628\u062F\u0621 \u0627\u0644\u062A\u062D\u0636\u064A\u0631.", "info");
          void this.run();
        } finally {
          this.starting = false;
        }
      },
      async startAI() {
        injectControlPanel();
        clearUiRemoval();
        if (this.starting || this.running) {
          updateControlStatus("\u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u064A\u0639\u0645\u0644 \u0628\u0627\u0644\u0641\u0639\u0644.", "info");
          return;
        }
        this.starting = true;
        try {
          this.mode = "ai";
          isEnabled = true;
          setButtonsDisabled(true);

          // Update AI button with loading state
          var aiBtnEl = getAIButton();
          if (aiBtnEl) {
            var labelEl = aiBtnEl.querySelector(".tahdiri-btn-label");
            if (labelEl) labelEl.textContent = "\u23F3 \u062C\u0627\u0631\u064A \u062A\u0648\u0644\u064A\u062F \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0645\u0646 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A...";
          }
          updateControlStatus("\u062C\u0627\u0631\u064A \u062C\u0645\u0639 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u062F\u0631\u0633 \u0648\u0625\u0631\u0633\u0627\u0644\u0647\u0627 \u0644\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A...", "info");

          // 1. Scrape lesson context
          var context = scrapeLessonContext();
          log("startAI: scraped context", context);
          console.log('[تحضيري] Context scraped:', JSON.stringify(context));

          // 2. Fetch AI data from n8n — FIX 3: wrap in try/catch so a network
          //    failure doesn't crash the entire AI flow.
          updateControlStatus("\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0645\u0639 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A...", "info");
          var aiResult = null;
          try {
            aiResult = await fetchAILessonData(context);
            console.log('AI Data:', aiResult);
          } catch (fetchErr) {
            console.error('AI Flow Error:', fetchErr);
            aiResult = null;
          }

          if (aiResult) {
            // 3. Store AI data using explicit Promise to guarantee write completion
            await new Promise(function (resolve) {
              chrome.storage.local.set({ aiLessonData: aiResult }, function () {
                console.log('[تحضيري AI] Saved to storage successfully.', aiResult);
                resolve();
              });
            });

            // 4. Verification read-back: confirm data is actually persisted
            var verification = await new Promise(function (resolve) {
              chrome.storage.local.get(['aiLessonData'], function (result) {
                console.log('[تحضيري AI] Storage verification read-back:', result.aiLessonData);
                resolve(result.aiLessonData);
              });
            });

            if (verification) {
              console.log('[تحضيري AI] ✅ Data verified in storage. Proceeding to Step 1.');
              updateControlStatus("\u062A\u0645 \u0627\u0633\u062A\u0644\u0627\u0645 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A. \u062C\u0627\u0631\u064A \u0628\u062F\u0621 \u0627\u0644\u062A\u062D\u0636\u064A\u0631...", "success");
            } else {
              console.warn('[تحضيري AI] ⚠️ Verification failed — data not found in storage after write!');
              updateControlStatus("\u062A\u062D\u0630\u064A\u0631: \u0644\u0645 \u064A\u062A\u0645 \u062D\u0641\u0638 \u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0646\u0635\u0648\u0635 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629.", "warning");
            }
          } else {
            console.warn('[تحضيري AI] AI fetch returned null, will fallback to competitor text');
            updateControlStatus("\u062A\u0639\u0630\u0631 \u0627\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A. \u0633\u064A\u062A\u0645 \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0646\u0635\u0648\u0635 \u0627\u0644\u0627\u0641\u062A\u0631\u0627\u0636\u064A\u0629.", "warning");
            await sleep(1500);
          }

          // ── PHASE 1 COMPLETE ─────────────────────────────────────────────────────
          // Set state to STEP2 NOW (before navigating) so that:
          //   a) If the site performs a full page reload, boot() detects STEP2 and
          //      calls runStep2Flow() on the new page.
          //   b) If the site is an SPA, the MutationObserver detects the DOM change,
          //      sees state===STEP2, and calls runStep2Flow() automatically.
          // We do NOT call this.run() here — that would execute Phase 2 in the same
          // JS context as Phase 1 (the Step 1 page), which is the bug.
          await this.setState(FLOW_STATES.STEP2);
          await sendAutomationStatus("START", { state: FLOW_STATES.STEP2, mode: "ai" });
          console.log('[تحضيري AI] Phase 1 done. State set to STEP2. Clicking Next to navigate...');

          // Click the native Next button — this is the ONLY action in Phase 1.
          // runStep2Flow() will be triggered on the Step 2 page by the existing
          // MutationObserver or by boot() after page navigation.
          updateControlStatus("\u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u0649 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062F\u0631\u0633...", "info");
          const nextBtn = findNextButton();
          if (!nextBtn) {
            throw new Error("\u062A\u0639\u0630\u0631 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u062A\u0627\u0644\u064A");
          }
          activateElementOnce(nextBtn);
          // Phase 1 ends here. Do NOT proceed further in this context.

        } catch (err) {
          log("startAI error:", err);
          updateControlStatus("\u062E\u0637\u0623 \u0641\u064A \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u0630\u0643\u064A: " + (err.message || err), "error");
          setButtonsDisabled(false);
          // Reset AI button label
          var aiBtnReset = getAIButton();
          if (aiBtnReset) {
            var resetLabel = aiBtnReset.querySelector(".tahdiri-btn-label");
            if (resetLabel) resetLabel.textContent = "\uD83E\uDD16 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062F\u0631\u0633 \u062A\u0644\u0642\u0627\u0626\u064A\u0627\u064B";
          }
        } finally {
          this.starting = false;
        }
      },
      async startQuick() {
        injectControlPanel();
        clearUiRemoval();
        if (this.starting || this.running) {
          updateControlStatus("التحضير يعمل بالفعل.", "info");
          return;
        }
        this.starting = true;
        try {
          this.mode = "quick";
          isEnabled = true;
          const nextState = detectPageState() === FLOW_STATES.STEP2 ? FLOW_STATES.STEP2 : FLOW_STATES.STEP1;
          await this.setState(nextState);
          setButtonsDisabled(true);
          const quickBtnEl = getQuickButton();
          if (quickBtnEl) {
            const labelEl = quickBtnEl.querySelector(".tahdiri-btn-label");
            if (labelEl) labelEl.textContent = "⏳ جاري التحضير السريع...";
          }
          await sendAutomationStatus("START", { state: nextState, mode: "quick" });
          updateControlStatus("تم بدء التحضير السريع.", "info");
          void this.run();
        } finally {
          this.starting = false;
        }
      },
      async stop(reason) {
        isEnabled = false;
        this.running = false;
        sessionLocked = false;
        resetSaving();
        await this.setState(FLOW_STATES.IDLE);
        await clearSaveSubmittedMarker();
        setButtonsDisabled(false);
        updatePrimaryButton(" \u0627\u0628\u062F\u0623 \u0627\u0644\u062A\u062D\u0636\u064A\u0631");
        updateControlStatus(reason || "\u062A\u0645 \u0625\u064A\u0642\u0627\u0641 \u0627\u0644\u062A\u062D\u0636\u064A\u0631.", "warning");
        await sendAutomationStatus("STOP", { state: FLOW_STATES.IDLE, reason: reason || "stopped" });
      },
      async finish(status, message) {
        const finalState = status === "DONE" ? FLOW_STATES.DONE : FLOW_STATES.ERROR;
        await this.setState(finalState);
        await clearSaveSubmittedMarker();
        isEnabled = false;
        this.running = false;
        setButtonsDisabled(false);
        updateControlStatus(message, status === "DONE" ? "success" : "error");
        updatePrimaryButton(
          status === "DONE" ? "\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062F\u0631\u0633" : "\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0636\u064A\u0631",
          status === "DONE" ? "success" : "error"
        );
        await sendAutomationStatus(status, { state: finalState, message });
        removeControlPanel(status === "DONE" ? 2500 : 5e3);
      },
      async run() {
        if (!isEnabled || this.running || sessionLocked) return;
        if (step2CompletedThisSession) {
          log("run() blocked: step2 already completed this session");
          return;
        }
        sessionLocked = true;
        this.running = true;
        try {
          if (this.state === FLOW_STATES.STEP1) {
            const step1Result = await runStep1Flow();
            if (!step1Result.ok) {
              if (step1Result.code === "duplicate-lesson") {
                await this.stop(step1Result.message || "\u064A\u0648\u062C\u062F \u062F\u0631\u0633 \u0645\u0633\u062C\u0644 \u0645\u0633\u0628\u0642\u064B\u0627 \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0639\u062F.");
                return;
              }
              throw new Error(step1Result.message);
            }
            if (this.mode === "step1Only") {
              await this.stop("\u062A\u0645 \u0625\u0639\u062F\u0627\u062F \u0627\u0644\u0645\u0633\u0627\u0631 \u0628\u0646\u062C\u0627\u062D.");
              return;
            }
            await this.setState(FLOW_STATES.STEP2);
            const duplicateOrTransitioned = await waitForValue(() => {
              const duplicateLessonError = findDuplicateLessonErrorMessage();
              if (duplicateLessonError) return { duplicateLessonError };
              return detectPageState() === FLOW_STATES.STEP2 ? { transitioned: true } : null;
            }, 22e3, 250);
            if (duplicateOrTransitioned?.duplicateLessonError) {
              releaseActionLock("step1-next");
              unlockActionElement(findNextButton());
              await this.stop(duplicateOrTransitioned.duplicateLessonError);
              return;
            }
            const transitioned = Boolean(duplicateOrTransitioned?.transitioned);
            if (!transitioned) {
              throw new Error("\u0644\u0645 \u064A\u0638\u0647\u0631 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062F\u0631\u0633 \u0628\u0639\u062F \u0627\u0644\u062E\u0637\u0648\u0629 \u0627\u0644\u0623\u0648\u0644\u0649");
            }
          }
          if (this.state === FLOW_STATES.STEP2) {
            step2CompletedThisSession = true;
            const step2Result = this.mode === "quick"
              ? await runQuickPrepStep2Flow()
              : await runStep2Flow();
            if (!step2Result.ok) {
              if (step2Result.code === "duplicate-lesson") {
                await this.stop(step2Result.message || "A lesson is already registered for this timetable slot.");
                return;
              }
              throw new Error(step2Result.message);
            }
          }
          await this.finish("DONE", "\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062F\u0631\u0633 \u0648\u062D\u0641\u0638\u0647 \u0628\u0646\u062C\u0627\u062D.");
        } catch (error) {
          log("Automation failed:", error);
          step2CompletedThisSession = false;
          sessionLocked = false;
          await this.finish("ERROR", error.message || "\u062D\u062F\u062B \u062E\u0637\u0623 \u063A\u064A\u0631 \u0645\u062A\u0648\u0642\u0639 \u0623\u062B\u0646\u0627\u0621 \u0627\u0644\u062A\u062D\u0636\u064A\u0631");
        } finally {
          this.running = false;
        }
      }
    };
    setControlPanelHandlers({
      start: (mode) => AutomationController.start(mode),
      startAI: () => AutomationController.startAI(),
      startQuick: () => AutomationController.startQuick()
    });
    setFinalSaveButtonDetector(findFinalSaveButtonSync);
    if (isContextAlive()) {
      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (!message || !message.type) return;
        if (message.type === "START") {
          void AutomationController.start("auto").then(() => {
            sendResponse({ success: true, state: AutomationController.state });
          });
          return true;
        }
        if (message.type === "STOP") {
          void AutomationController.stop("Stopped from extension controls").then(() => {
            removeControlPanel();
            sendResponse({ success: true, state: AutomationController.state });
          });
          return true;
        }
      });
    }
    (function boot() {
      var bootPageState = detectPageState();

      // --- IFRAME AUTOMATION HOOK (for blue-lesson fallback) ---
      var isIframeMode = window.location.search.includes('tahdiri_iframe') || window.name.includes('tahdiri_iframe');

      if (isIframeMode) {
        // Persist the iframe marker across navigations within this subframe
        if (window.location.search.includes('tahdiri_iframe') && !window.name.includes('tahdiri_iframe')) {
          window.name = 'tahdiri_iframe_master';
        }

        const originalFinish = AutomationController.finish;
        AutomationController.finish = async function (status, message) {
          await originalFinish.call(this, status, message);
          window.parent.postMessage({ type: 'TAHDIRI_IFRAME_DONE', success: status === "DONE" }, '*');
        };

        if (bootPageState === FLOW_STATES.DASHBOARD) {
          // Either we landed here to click a blue cell, or we landed here AFTER a successful save
          // redirected back. The presence of `tahdiri_click` in the URL tells us which case.
          var iframeParams = new URLSearchParams(window.location.search);
          var clickToken = iframeParams.get('tahdiri_click');

          if (clickToken) {
            setTimeout(() => {
              var cellSelect = document.querySelector('.tahdiri-dashboard-select[data-lesson-token="' + CSS.escape(clickToken) + '"]');
              var cellDiv = cellSelect ? (cellSelect.closest('div[data-data]') || cellSelect.parentElement) : null;
              var clickTarget = cellDiv && (cellDiv.querySelector('[onclick]') || cellDiv);

              if (!clickTarget) {
                // Fallback: any element on the page carrying the token
                clickTarget = document.querySelector('[data-lesson-token="' + CSS.escape(clickToken) + '"]');
              }

              if (clickTarget) {
                try { clickTarget.click(); } catch (e) {
                  window.parent.postMessage({ type: 'TAHDIRI_IFRAME_DONE', success: false }, '*');
                }
                // Madrasati's click handler should now navigate this subframe to ManageLecture.
                // The boot hook will fire again on STEP1 and start the automation.
              } else {
                console.error('[Tahdiri] iframe could not find cell for token', clickToken);
                window.parent.postMessage({ type: 'TAHDIRI_IFRAME_DONE', success: false }, '*');
              }
            }, 1500);
            return;
          }

          // No click instruction — assume we got here via post-save redirect (success)
          window.parent.postMessage({ type: 'TAHDIRI_IFRAME_DONE', success: true }, '*');
          return;
        }

        if (bootPageState === FLOW_STATES.STEP1) {
          setTimeout(() => { AutomationController.start('auto'); }, 1000);
        }
      }
      // ---------------------------------------------------------

      if (bootPageState === FLOW_STATES.DASHBOARD && !isIframeMode) {
        injectDashboardUI();
        return;
      }

      injectControlPanel();
      startMutationObserver();

      if (!isContextAlive()) return;
      chrome.runtime.sendMessage({ type: "GET_RUNNING" }, async (response) => {
        if (chrome.runtime.lastError) return;
        isEnabled = !!(response && response.running);
        const data = await AutomationController.loadState();
        const terminalStates = [FLOW_STATES.DONE, FLOW_STATES.ERROR, FLOW_STATES.IDLE];

        // استئناف الحالة المحفوظة في حالة تحديث الصفحة أو الانتقال التلقائي
        if (AutomationController.state === FLOW_STATES.DONE || AutomationController.state === FLOW_STATES.ERROR) {
          const currentPathKey = getAutomationActionKey("path-info");
          if (currentPathKey !== data.storedPathKey) {
            AutomationController.state = FLOW_STATES.IDLE;
            return;
          }
          isEnabled = false;
          setButtonsDisabled(false);
          updatePrimaryButton(
            AutomationController.state === FLOW_STATES.DONE ? "تم تحضير الدرس" : "فشل التحضير",
            AutomationController.state === FLOW_STATES.DONE ? "success" : "error"
          );
          updateControlStatus("تم إنهاء التحضير مسبقاً. جاري مزامنة الحالة...", "info");
          await sendAutomationStatus(AutomationController.state === FLOW_STATES.DONE ? "DONE" : "ERROR", {
            state: AutomationController.state,
            message: "Stored automation state was already complete."
          });
          await clearSaveSubmittedMarker();
          return;
        }

        // استئناف الخطوة الثانية (Step 2) فور الوصول لصفحة النموذج
        if (AutomationController.state === FLOW_STATES.STEP2 && detectPageState() === FLOW_STATES.STEP2) {
          isEnabled = true;
          setButtonsDisabled(true);
          updatePrimaryButton("جاري الاستئناف...", "loading");
          updateControlStatus("تم اكتشاف نموذج الدرس. جاري تعبئة الحقول وحفظ الدرس...", "info");
          void AutomationController.run();
          return;
        }

        if (isEnabled && !terminalStates.includes(AutomationController.state)) {
          setButtonsDisabled(true);
          updatePrimaryButton("جاري الاستئناف...", "loading");
          updateControlStatus("يتم استئناف التحضير بعد تحديث الصفحة...", "info");
          void AutomationController.run();
        }
      });
    })();
  })();
})();
