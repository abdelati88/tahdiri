

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
 * 
 * 
 * 
 
 */
(() => {
  // src/content/constants.js
  var CONFIG = globalThis.TAHDIRI_CONFIG || {};
  var STORAGE_KEYS = CONFIG.STORAGE_KEYS || {};
  var SETTINGS_DEFAULTS = CONFIG.SETTINGS_DEFAULTS || {};
  var AUTOMATION_STATE_KEY = STORAGE_KEYS.AUTOMATION_STATE || "automationState";
  var SAVE_SUBMITTED_AT_KEY = "automationSaveSubmittedAt";
  var AI_LESSON_DATA_KEY = "aiLessonData";
  var AUTOMATION_MODE_KEY = "automationMode";
  var N8N_AI_WEBHOOK_URL = "https://n8n.abdelati88.shop/webhook/tahdiri-ai-generator";
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
    try { element.dispatchEvent(new Event('input',  { bubbles: true })); } catch { }
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
    try { selectElement.dispatchEvent(new Event('input',  { bubbles: true })); } catch { }
    try { selectElement.dispatchEvent(new Event('change', { bubbles: true })); } catch { }
    try { selectElement.dispatchEvent(new Event('blur',   { bubbles: true })); } catch { }

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

  async function fetchLessonTreeOptions(lessonData) {
    // Bulletproof: ALWAYS returns at least the AI Auto-Pilot option.
    // Extracts first available <select> options from the lesson HTML.
    // No cascading AJAX — deep tree selection deferred to runStep1Flow.

    // Base array: AI option is always present
    var optionsArray = [{
      value: 'AI_AUTO',
      text: '\uD83E\uDD16 \u062A\u062D\u0636\u064A\u0631 \u0630\u0643\u064A (AI Auto-Pilot)', // 🤖 تحضير ذكي (AI Auto-Pilot)
      level: 'auto'
    }];

    try {
      var url = "/Teacher/Lessons/LessonDetailsNew?Data=" + encodeURIComponent(lessonData);
      var response = await fetchHtml(url);
      if (!response.ok || !response.text) {
        log("Dashboard: fetch FAILED for token " + lessonData.substring(0, 30) + "... status=" + response.status);
        return optionsArray; // Still returns AI option
      }
      var parser = new DOMParser();
      var doc = parser.parseFromString(response.text, "text/html");

      // Broad selector: try multiple possible IDs/names
      var unitSelect = doc.querySelector(
        'select[id^="SelectedTrees_"], select[name*="Tree"], select[id*="Unit"], select[id*="unit"]'
      );

      // If broad selector fails, grab the first <select> with >1 options
      if (!unitSelect) {
        var allSelects = doc.querySelectorAll('select');
        log("Dashboard: broad selector found 0 matches, checking " + allSelects.length + " total selects");
        for (var s of allSelects) {
          var validCount = Array.from(s.options).filter(function (o) {
            return o.value && o.value.trim() && !o.disabled;
          }).length;
          if (validCount > 0) {
            unitSelect = s;
            log("Dashboard: using first select with options: #" + s.id + " (" + validCount + " valid opts)");
            break;
          }
        }
      }

      if (!unitSelect) {
        log("Dashboard: no <select> with valid options found for token " + lessonData.substring(0, 30) + "...");
        return optionsArray; // Still returns AI option
      }

      log("Dashboard: found select#" + unitSelect.id + " with " + unitSelect.options.length + " total options");

      // Extract valid options, skip placeholders
      Array.from(unitSelect.options).forEach(function (opt) {
        if (!opt.value || !opt.value.trim() || opt.disabled) return;
        var text = opt.textContent.trim();
        // Skip placeholder/default texts
        if (!text || /^\u0627\u062E\u062A\u0631|^--|اختر|^\u002D\u002D/.test(text)) return;
        optionsArray.push({
          value: opt.value.trim(),
          text: text,
          level: '1'
        });
      });

      log("Dashboard: " + (optionsArray.length - 1) + " unit options extracted for token " + lessonData.substring(0, 30) + "...");

    } catch (err) {
      log("Dashboard: tree fetch error", err);
      // optionsArray still has AI option
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

        try {
          var options = await fetchLessonTreeOptions(tok);

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
      var lessons = document.querySelectorAll('td.day-cell div[data-data]:not(.tahdiri-processed)');
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

  async function handleDashboardSave() {
    var allSelects = document.querySelectorAll('.tahdiri-dashboard-select');
    var selections = {};
    var firstLessonDiv = null;

    for (var select of allSelects) {
      if (!select.value) continue;
      var token = select.getAttribute('data-lesson-token');
      if (!token) continue;

      var isAuto = select.value === 'AI_AUTO';
      selections[token] = {
        mode: isAuto ? 'auto' : 'unit',
        treeValue: select.value,
        treeText: select.options[select.selectedIndex] ? select.options[select.selectedIndex].text : '',
        selectedAt: Date.now()
      };

      // Track first lesson's parent div for navigation
      if (!firstLessonDiv) {
        firstLessonDiv = select.closest('div[data-data]') || select.parentElement;
      }
    }

    if (!Object.keys(selections).length) {
      updateDashboardStatus('\u0627\u062E\u062A\u0631 \u062F\u0631\u0633\u064B\u0627 \u0648\u0627\u062D\u062F\u064B\u0627 \u0639\u0644\u0649 \u0627\u0644\u0623\u0642\u0644.', 'warning'); // اختر درسًا واحدًا على الأقل.
      return;
    }

    // Save to chrome.storage.local
    try {
      var stored = await getLocal([DASHBOARD_SELECTIONS_KEY]);
      var existing = stored[DASHBOARD_SELECTIONS_KEY] || {};
      var merged = Object.assign({}, existing, selections);
      await setLocal({ [DASHBOARD_SELECTIONS_KEY]: merged });
      log('Dashboard: saved ' + Object.keys(selections).length + ' selections');
    } catch (err) {
      log('Dashboard: save error', err);
      updateDashboardStatus('\u062E\u0637\u0623 \u0641\u064A \u062D\u0641\u0638 \u0627\u0644\u0627\u062E\u062A\u064A\u0627\u0631\u0627\u062A.', 'error'); // خطأ في حفظ الاختيارات.
      return;
    }

    updateDashboardStatus(
      '\u062A\u0645 \u062D\u0641\u0638 ' + Object.keys(selections).length + ' \u062D\u0635\u0629. \u062C\u0627\u0631\u064A \u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644...', // تم حفظ X حصة. جاري الانتقال...
      'success'
    );

    // Bypass UI frameworks entirely. 
    // Gather tokens, join with '##', and submit directly to the backend.

    var selectedTokens = [];

    // 1. Gather all selected tokens from our UI
    var allSelects = document.querySelectorAll('select.tahdiri-dashboard-select');
    for (var sel of allSelects) {
      if (sel.value && sel.value !== '') {
        var token = sel.getAttribute('data-lesson-token');
        if (token) {
          selectedTokens.push(token);
        }
      }
    }

    // Deduplicate tokens (in case our logic grabbed the same combined lesson twice)
    selectedTokens = selectedTokens.filter(function (item, pos) {
      return selectedTokens.indexOf(item) == pos;
    });

    if (selectedTokens.length === 0) {
      updateDashboardStatus('\u0644\u0645 \u064A\u062A\u0645 \u062A\u062D\u062F\u064A\u062F \u062D\u0635\u0635', 'error'); // لم يتم تحديد حصص
      return;
    }

    updateDashboardStatus('\u062C\u0627\u0631\u064A \u0627\u0644\u062A\u0648\u062C\u064A\u0647 \u0644\u0644\u062A\u062D\u0636\u064A\u0631...', 'info'); // جاري التوجيه للتحضير...

    if (selectedTokens.length === 1) {
      // Single lesson: Standard GET request
      log('Dashboard: navigating to LessonDetailsNew for single token');
      window.location.href = '/Teacher/Lessons/LessonDetailsNew?Data=' + selectedTokens[0];
    } else {
      // Multiple lessons: POST request with '##' separated tokens
      var combinedData = selectedTokens.join('##');
      log('Dashboard: submitting MultiLessonDetailsNew with ' + selectedTokens.length + ' combined tokens');

      // Create a native hidden form to bypass all UI frameworks
      var form = document.createElement('form');
      form.method = 'POST';
      form.action = '/Teacher/Lessons/MultiLessonDetailsNew';
      form.style.display = 'none';

      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'Data';
      input.value = combinedData;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
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
      var response = await fetch(N8N_AI_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          grade: context.grade,
          subject: context.subject,
          lessonTitle: context.lessonTitle,
          availableStrategies: context.availableStrategies || [],
          availableTools: context.availableTools || []
        })
      });
      if (!response.ok) {
        log("fetchAILessonData: HTTP error", response.status);
        return null;
      }
      var data = await response.json();
      log("fetchAILessonData: received:", data);
      // Validate expected fields exist
      if (!data || typeof data !== "object") return null;
      return {
        prep:       data.prep       || data.preparation || data.LectureClassPreparationText || "",
        goals:      data.goals      || "",
        closure:    data.closure    || data.Closure || "",
        vocabulary: data.vocabulary || data.Vocabulary || data.LessonVocabulary || "",
        strategies: Array.isArray(data.strategies) ? data.strategies : [],
        tools:      Array.isArray(data.tools)       ? data.tools      : [],
        homework:   data.homework   || ""
      };

    } catch (err) {
      log("fetchAILessonData: error:", err);
      return null;
    }
  }
  // ── Competitor API Decryption Pipelines ──────────────────────────────────────
  // Reverse-engineered from competitor.js. Both pipelines are pure JS —
  // no external dependencies. They run entirely inside content.js.

  function _tahdiriChunkReverse(str, n) {
    let r = '';
    for (let i = 0; i < str.length; i += n)
      r += str.slice(i, i + n).split('').reverse().join('');
    return r;
  }

  // Pipeline A — getlessonq.php  (window['decodeResponse'] in competitor.js)
  function _decryptEndpoint1(raw) {
    let t = raw.trim();
    t = _tahdiriChunkReverse(t, 7);
    t = _tahdiriChunkReverse(t, 2);
    t = _tahdiriChunkReverse(t, 5);
    t = _tahdiriChunkReverse(t, 4);
    t = t.split('').reverse().join('');
    t = _tahdiriChunkReverse(t, 9);
    t = _tahdiriChunkReverse(t, 8);
    t = _tahdiriChunkReverse(t, 7);
    t = _tahdiriChunkReverse(t, 6);
    t = _tahdiriChunkReverse(t, 5);
    const bin = atob(t);
    const uri = bin.split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('');
    return JSON.parse(decodeURIComponent(uri));
  }

  // Pipeline B — lessonsofsubject2.php  (_0x2c9b5b / _0x26a59e in competitor.js)
  function _decryptEndpoint2(raw) {
    let t = raw.trim();
    t = _tahdiriChunkReverse(t, 11);
    t = _tahdiriChunkReverse(t, 2);
    t = _tahdiriChunkReverse(t, 3);
    t = _tahdiriChunkReverse(t, 4);
    t = t.split('').reverse().join('');
    t = _tahdiriChunkReverse(t, 9);
    t = _tahdiriChunkReverse(t, 8);
    t = _tahdiriChunkReverse(t, 7);
    t = _tahdiriChunkReverse(t, 6);
    t = _tahdiriChunkReverse(t, 5);
    const bytes = Uint8Array.from(atob(t), c => c.charCodeAt(0));
    return JSON.parse(new TextDecoder('utf-8').decode(bytes));
  }

  // ── CORS Proxy helper ─────────────────────────────────────────────────────────
  // Routes a fetch through background.js to bypass CORS on k.tahdiri.com.
  // Returns the raw encrypted text string, or throws on network/background error.
  async function fetchViaBackground(url, method, body) {
    method = method || 'GET';
    body   = body   || null;
    return new Promise(function(resolve, reject) {
      if (!isContextAlive()) { reject(new Error('Extension context dead')); return; }
      try {
        chrome.runtime.sendMessage(
          { action: 'COMPETITOR_FETCH', url: url, method: method, body: body },
          function(response) {
            void chrome.runtime.lastError;
            if (!response) { reject(new Error('No response from background')); return; }
            if (response.ok) { resolve(response.text); }
            else { reject(new Error('COMPETITOR_FETCH failed: ' + (response.error || 'unknown'))); }
          }
        );
      } catch (e) { reject(e); }
    });
  }

  // ── Lesson Map Builder ────────────────────────────────────────────────────────
  // catalogue = decryptEndpoint2 output:  [{id: "subj,chap,lesson", name: "..."}]
  // Returns Map<lessonId:number, {name, chapterId, compositeId}>
  function buildLessonMap(catalogue) {
    const map = new Map();
    if (!Array.isArray(catalogue)) return map;
    for (const entry of catalogue) {
      try {
        const parts     = (entry.id || '').split(',');
        const lessonId  = parseInt(parts[2], 10);
        const chapterId = parseInt(parts[1], 10);
        if (!isNaN(lessonId)) {
          map.set(lessonId, { name: entry.name || '', chapterId: chapterId, compositeId: entry.id });
        }
      } catch (_) {}
    }
    return map;
  }

  // ── Group Name Resolver ───────────────────────────────────────────────────────
  // groups   = decryptEndpoint1 output:  [[id, id, ...], ...]
  // lessonMap = buildLessonMap output
  // Keeps only groups where ALL ids are found in the map AND they share the
  // same chapterId as the target lessonId (filters to current lesson's chapter).
  function resolveGroupNames(groups, lessonMap, targetLessonId) {
    const result = [];
    if (!Array.isArray(groups)) return result;
    // Determine which chapterId the target lesson belongs to
    const targetChapter = lessonMap.has(targetLessonId)
      ? lessonMap.get(targetLessonId).chapterId
      : null;
    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];
      if (!Array.isArray(group) || !group.length) continue;
      const infos = group.map(id => lessonMap.get(id)).filter(Boolean);
      if (infos.length !== group.length) continue; // some IDs not in map
      // If we know the target chapter, keep only groups from that chapter
      if (targetChapter !== null) {
        if (!infos.every(info => info.chapterId === targetChapter)) continue;
      }
      const firstName = infos[0].name || '';
      result.push({ groupIndex: gi, ids: group, sectionName: firstName, infos: infos });
    }
    return result;
  }

  // ── Plan Builder from Named Sections ─────────────────────────────────────────
  // named = resolveGroupNames output
  // Returns the same shape as before so applyParasitePlanToForm works correctly.
  function buildPlanFromNamedSections(named, subjectId) {
    const FIXED_THINKING = 'التركيز - التذكر - التحليل - التركيب - الربط - الملاحظة - الاستنتاج - التفكير الإبداعي - العصف الذهني';
    const FIXED_NOTE     = 'بإمكانك الاطلاع على شرح هذا الدرس على منصة عين من خلال رابط الدرس.';
    const FIXED_HOMEWORK = 'حل تمارين الدرس في كتاب التمارين.';

    let prepText  = '';
    let vocabText = '';
    let closeText = '';
    let compositeId = '';

    // Helper: extract label after ' -- ' separator
    function sectionLabel(name) {
      const idx = (name || '').indexOf(' -- ');
      return idx >= 0 ? name.slice(idx + 4).trim() : (name || '').trim();
    }

    // Sort named sections by their group index to preserve order
    const sorted = named.slice().sort((a, b) => a.groupIndex - b.groupIndex);

    // Classify each group
    for (const grp of sorted) {
      const name  = grp.sectionName || '';
      const label = sectionLabel(name);

      if (!compositeId && grp.infos && grp.infos[0]) {
        compositeId = grp.infos[0].compositeId || '';
      }

      // التهيئة → Preparation
      if (!prepText && /تهيئة/.test(label)) {
        prepText = 'نستعرض مع الطلاب درس: ' + name;
        continue;
      }

      // Vocabulary-like groups (stories, vocab, representation …)
      if (!closeText && /قصص|مفردات|تمثيل|جمل|أحرف|أرقام|حروف/.test(label)) {
        if (!vocabText) {
          const allNames = grp.infos.map(info => info.name || '').filter(Boolean);
          vocabText = allNames.join('\n');
        }
        continue;
      }

      // Problem-solving / closure groups
      if (!closeText && /أحل المسألة|مسألة|غلق|ختام|تلخيص|مراجعة/.test(label)) {
        const allLabels = grp.infos.map(info => sectionLabel(info.name || '')).filter(Boolean);
        closeText = 'نختتم الدرس بمراجعة: ' + allLabels.join('، ');
        continue;
      }
    }

    // Fallback: if no prep was tagged, use first group
    if (!prepText && sorted.length > 0) {
      prepText = 'نستعرض مع الطلاب درس: ' + (sorted[0].sectionName || '');
    }

    // Fallback: if no vocab was tagged, use all middle groups
    if (!vocabText && sorted.length > 1) {
      const midGroups = sorted.slice(0, sorted.length > 2 ? sorted.length - 1 : sorted.length);
      const allNames  = midGroups.flatMap(g => (g.infos || []).map(info => info.name || '')).filter(Boolean);
      vocabText = allNames.join('\n');
    }

    // Fallback: if no close was tagged, use last group
    if (!closeText && sorted.length > 1) {
      const lastGrp  = sorted[sorted.length - 1];
      const labels   = (lastGrp.infos || []).map(info => sectionLabel(info.name || '')).filter(Boolean);
      closeText = 'نختتم الدرس بمراجعة: ' + labels.join('، ');
    }

    return {
      LectureClassPreparationText: prepText  || 'تمهيد مناسب لموضوع الدرس.',
      LessonVocabulary:            vocabText || 'مفردات الدرس.',
      ThinkingSkills:              FIXED_THINKING,
      LectureClassCloseText:       closeText || 'تلخيص المفاهيم الرئيسية وتقييم فهم الطلاب.',
      TeacherNote:                 FIXED_NOTE,
      homework:                    FIXED_HOMEWORK,
      compositeId:                 compositeId
    };
  }

  // ── Parasite Form Injector ────────────────────────────────────────────────────
  // Writes each plan field into the matching Madrasati textarea/input by ID.
  // Does NOT call fillLessonFields() — that has AI-specific logic.
  function applyParasitePlanToForm(plan) {
    const lessonRoot = getLessonFormRoot();
    const fieldMap = {
      LectureClassPreparationText: plan.LectureClassPreparationText,
      LessonVocabulary:            plan.LessonVocabulary,
      ThinkingSkills:              plan.ThinkingSkills,
      LectureClassCloseText:       plan.LectureClassCloseText,
      TeacherNote:                 plan.TeacherNote
    };
    for (const fieldId of Object.keys(fieldMap)) {
      const el = lessonRoot.querySelector('#' + CSS.escape(fieldId));
      if (el && isTrulyVisible(el) && !el.disabled && !el.readOnly) {
        setNativeValue(el, fieldMap[fieldId]);
        log('applyParasitePlanToForm: filled #' + fieldId);
      }
    }
    // Homework field: find by id/name/label heuristic
    if (plan.homework) {
      const hwCandidates = Array.from(
        lessonRoot.querySelectorAll('input[type="text"], textarea')
      ).filter(function(el) {
        if (!isTrulyVisible(el) || el.disabled || el.readOnly) return false;
        if (el.closest('#CreateResourceForm')) return false;
        const idName = (el.id || '') + ' ' + (el.name || '');
        if (/واجب|homework/i.test(idName)) return true;
        const lbl = el.id ? document.querySelector('label[for="' + CSS.escape(el.id) + '"]') : null;
        return lbl ? /واجب|homework/i.test(lbl.textContent || '') : false;
      });
      if (hwCandidates.length > 0) setNativeValue(hwCandidates[0], plan.homework);
    }
  }

  // ── Deprecated stub — kept so older call-sites do not throw ──────────────────
  // The parasite strategy replaces this. runQuickPrepStep2Flow no longer calls it.
  async function fetchQuickPrepData(subjectId, lessonId) {
    log('fetchQuickPrepData: deprecated — parasite strategy active');
    return null;
  }
  // DEPRECATED: kept as no-op stub — buildPlanFromNamedSections replaced this.
  function buildLessonPlanFromGoals(goals, books, lessonName, tree2Value) {
    const name = lessonName || "الدرس";
    const einLink = "https://ibs.ien.edu.sa/#/planslessons/" + (tree2Value || "");
    const goalIds = Array.isArray(goals) ? goals.map(function(g) { return g.GoalId; }).filter(Boolean) : [];

    var firstGoalTitle = "";
    var lastGoalTitle = "";
    if (Array.isArray(goals) && goals.length > 0) {
      firstGoalTitle = (goals[0].GoalTitle || "").trim();
      lastGoalTitle  = (goals[goals.length - 1].GoalTitle || "").trim();
    }

    var prepText, closeText, homeworkText;

    if (!Array.isArray(goals) || goals.length === 0) {
      // Zero goals: lesson-name-only templates
      prepText    = "نراجع مع الطلاب المعارف السابقة، ثم نمهد لدرس \"" + name + "\" من خلال طرح موقف يومي مرتبط بموضوع الدرس.";
      closeText   = "نلخص مع الطلاب أهم ما تعلموه في درس \"" + name + "\".";
      homeworkText = "حل تمارين درس \"" + name + "\" في كتاب التمارين.";
    } else if (goals.length === 1) {
      // One goal: different phrasing for prep vs closure so they are not identical
      prepText    = "نراجع مع الطلاب المعارف السابقة، ثم نمهد لدرس \"" + name + "\" من خلال طرح موقف يومي مرتبط بـ " + firstGoalTitle + ".";
      closeText   = "نلخص مع الطلاب أهم ما تعلموه في درس \"" + name + "\"، ونتأكد من تحقق الهدف: " + lastGoalTitle + ".";
      homeworkText = "حل تمارين درس \"" + name + "\" في كتاب التمارين، ومراجعة هدف: " + firstGoalTitle + ".";
    } else {
      // Two or more goals: first → prep, last → closure
      prepText    = "نراجع مع الطلاب المعارف السابقة، ثم نمهد لدرس \"" + name + "\" من خلال طرح موقف يومي مرتبط بـ " + firstGoalTitle + ".";
      closeText   = "نلخص مع الطلاب أهم ما تعلموه في درس \"" + name + "\"، ونتأكد من تحقق الهدف: " + lastGoalTitle + ".";
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
      LessonVocabulary:            vocabularyText,
      ThinkingSkills:              thinkingSkillsText,
      LectureClassCloseText:       closeText,
      TeacherNote:                 teacherNoteText,
      goalIds:                     goalIds,
      einLink:                     einLink,
      homework:                    homeworkText
    };
  }
  // applyQuickPrepToForm is an alias kept for backward compatibility.
  // New code calls applyParasitePlanToForm directly.
  function applyQuickPrepToForm(plan) {
    return applyParasitePlanToForm(plan);
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
    if (!csrfToken || !schoolId || !unitId || !tree2 || !tree3) {
      return buildResult(false, "Missing lesson identifiers for assignment fallback");
    }
    const payload = new URLSearchParams();
    payload.append("SaveButton", "");
    payload.append("IdEnc", "");
    payload.append("Id", "0");
    payload.append("TreeId", "");
    payload.append("IsTreeLevel", "");
    payload.append("IsQuran", "false");
    payload.append("txt_UploadUrl", "/Teacher/Assignments/UploadFile");
    payload.append("SelectedUnitId", unitId);
    payload.append("SelectedTrees_2", tree2);
    payload.append("SelectedTrees_3", tree3);
    if (tree4) payload.append("SelectedTrees_4", tree4);
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
    const saveResponse = await fetchHtml("/Teacher/Assignments/Manage?Length=11", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
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
    if (!settings.skipEnrichment) {
      await handleEnrichmentForm();
      await sleep(1200);
      const afterEnrichmentCounts = getLessonResourceCounts();
      if (afterEnrichmentCounts.hasAny) {
        return buildResult(true, "Lesson resource added through enrichment flow", { counts: afterEnrichmentCounts });
      }
    }
    const projectFlowResult = await handleProjectResourceFlow();
    if (projectFlowResult.ok) {
      return projectFlowResult;
    }
    const activityResult = await createSchoolActivityFallback({ force: settings.forceFallback });
    if (activityResult.ok) {
      return activityResult;
    }
    const assignmentResult = await createAssignmentFallback({ force: settings.forceFallback });
    if (assignmentResult.ok) {
      return assignmentResult;
    }
    return buildResult(false, "Could not add enrichment, assignment, exam, or school activity to the lesson");
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
    const secondPage = document.getElementById("secondPage");
    if (!isTrulyVisible(secondPage)) return buildResult(true, "Enrichment bank page not visible");
    const createButton = findPreferredElement({
      root: secondPage,
      attributes: [
        'a[onclick*="openCreationModal"]',
        'button[onclick*="openCreationModal"]'
      ],
      classes: [".btn-primary"],
      texts: ["\u0625\u0636\u0627\u0641\u0629 \u0625\u062B\u0631\u0627\u0621"]
    });
    const noItemsMessage = findElementByText("div, span, p", "\u0644\u0627\u064A\u0648\u062C\u062F \u0625\u062B\u0631\u0627\u0621\u0627\u062A \u064A\u0645\u0643\u0646 \u0639\u0631\u0636\u0647\u0627", secondPage) || findElementByText("div, span, p", "\u0644\u0627\u064A\u0648\u062C\u062F  \u0625\u062B\u0631\u0627\u0621\u0627\u062A \u064A\u0645\u0643\u0646 \u0639\u0631\u0636\u0647\u0627", secondPage);
    if ((noItemsMessage || createButton) && createButton) {
      activateElementOnce(createButton);
      await sleep(1800);
    }
    const creationRoot = await waitForValue(() => getEnrichmentCreationRoot(), 7e3);
    if (creationRoot) {
      return fillEnrichmentCreationForm(creationRoot);
    }
    await returnToMainLessonPage();
    return buildResult(true, "Teacher enrichment bank is empty, returned to lesson form");
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
      const _snapUnitId  = getFieldValue("#SelectedUnitId");
      const _snapTree2   = getFieldValue("#SelectedTrees_2");
      const _snapTree3   = getFieldValue("#SelectedTrees_3");
      const _snapTree4   = getFieldValue("#SelectedTrees_4");
      const _snapTree5   = getFieldValue("#SelectedTrees_5");
      const _snapPayload = JSON.stringify({
        subjectId:  _snapUnitId,
        tree2:      _snapTree2,
        tree3:      _snapTree3,
        lessonId:   _snapTree4 || _snapTree3,   // tree4 when present, else tree3
        tree5:      _snapTree5
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
    const hasAIStrategies = aiData && aiData.strategies && typeof aiData.strategies === "string" && aiData.strategies.trim().length > 0;

    for (const selector of REQUIRED_LESSON_CHECKBOX_GROUPS) {
      const checkboxes = Array.from(lessonRoot.querySelectorAll(selector)).filter(isCheckboxUsable);

      if (checkboxes.length > 0) {
        let matched = false;

        // AI strategy matching: check if any checkbox label appears in aiData.strategies
        if (aiData && aiData.strategies && Array.isArray(aiData.strategies)) {
          var selectedStrategies = aiData.strategies;
          for (var cb of checkboxes) {
            var labelEl = cb.closest("label") || (cb.id ? document.querySelector('label[for="' + CSS.escape(cb.id) + '"]') : null);
            var labelText = labelEl ? (labelEl.textContent || "").trim() : "";
            if (!labelText) labelText = (cb.parentElement ? cb.parentElement.textContent || "" : "").trim();
            if (labelText && selectedStrategies.includes(labelText)) {
              ensureCheckboxChecked(cb);
              matched = true;
            }
          }
        }

        // Fallback: random 1-3 selections if no AI match or no AI data
        if (!matched) {
          let numberOfSelections = Math.floor(Math.random() * 3) + 1;
          const shuffled = checkboxes.sort(() => 0.5 - Math.random());
          for (let i = 0; i < Math.min(numberOfSelections, shuffled.length); i++) {
            ensureCheckboxChecked(shuffled[i]);
          }
        }
      }

      // match الـ tools لو الـ selector ده teachingTools
      if (selector === 'input[name="teachingTools"]' && aiData && Array.isArray(aiData.tools)) {
        var selectedTools = aiData.tools;
        for (var tcb of checkboxes) {
          var tlabelEl = tcb.closest("label") || (tcb.id ? document.querySelector('label[for="' + CSS.escape(tcb.id) + '"]') : null);
          var tlabelText = tlabelEl ? (tlabelEl.textContent || "").trim() : "";
          if (!tlabelText) tlabelText = (tcb.parentElement ? tcb.parentElement.textContent || "" : "").trim();
          if (tlabelText && selectedTools.includes(tlabelText)) {
            ensureCheckboxChecked(tcb);
          }
        }
      }

      const sample = lessonRoot.querySelector(selector);
      if (sample && sample.name) processedGroups.add(sample.name);
    }

    // باقي كودك زي ما هو للحقول المطلوبة التانية
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
        throw new Error("\u0644\u0645 \u064A\u062A\u0645 \u0627\u0644\u0639\u062B\u0648\u0631 \u0639\u0644\u0649 \u0632\u0631 \u0627\u0644\u062D\u0641\u0638");
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

      // ── Restore IDs from sessionStorage into Step 2 DOM ─────────────────────
      // React wiped the <select> elements during the Step 1 → Step 2 navigation.
      // We must write them back so the native form payload contains a valid path.
      let subjectId  = "";
      let lessonId   = "";
      let tree2Value = "";
      let tree3Value = "";
      let tree5Value = "";
      try {
        const _raw = window.sessionStorage.getItem("tahdiri_quick_ids");
        if (_raw) {
          const _ids = JSON.parse(_raw);
          subjectId  = _ids.subjectId || "";
          lessonId   = _ids.lessonId  || "";
          tree2Value = _ids.tree2     || "";
          tree3Value = _ids.tree3     || "";
          tree5Value = _ids.tree5     || "";
          console.log("[تحضيري] Parasite Step2: IDs from sessionStorage:",
            "subjectId=", subjectId, "lessonId=", lessonId);
          // Inject back into DOM so the form payload is complete
          const _domMap = {
            "SelectedUnitId":   subjectId,
            "SelectedTrees_2":  tree2Value,
            "SelectedTrees_3":  tree3Value,
            "SelectedTrees_4":  lessonId,
            "SelectedTrees_5":  tree5Value
          };
          for (const [_id, _val] of Object.entries(_domMap)) {
            if (!_val) continue;
            const _el = document.getElementById(_id);
            if (_el) {
              setNativeValue(_el, _val);
              log("[Parasite] restored #" + _id + " =", _val);
            }
          }
        } else {
          console.warn("[تحضيري] Parasite Step2: no sessionStorage snapshot, falling back to DOM.");
          subjectId  = getFieldValue("#SelectedUnitId");
          lessonId   = getFieldValue("#SelectedTrees_4") || getFieldValue("#SelectedTrees_3");
          tree2Value = getFieldValue("#SelectedTrees_2");
        }
      } catch (_readErr) {
        console.warn("[تحضيري] Parasite Step2: sessionStorage read error, falling back to DOM.", _readErr);
        subjectId  = getFieldValue("#SelectedUnitId");
        lessonId   = getFieldValue("#SelectedTrees_4") || getFieldValue("#SelectedTrees_3");
        tree2Value = getFieldValue("#SelectedTrees_2");
      }
      // ─────────────────────────────────────────────────────────────────────────

      log("runQuickPrepStep2Flow: subjectId=", subjectId, "lessonId=", lessonId);

      // ── Step B — Parallel fetch via background.js CORS proxy ─────────────────
      let parasitePlanApplied = false;
      if (subjectId) {
        try {
          updateControlStatus("جاري جلب بيانات الدرس من المصدر...", "info");
          console.log("[تحضيري] Parasite: fetching both competitor endpoints for subjectId=", subjectId);

          const ep1Url = "https://k.tahdiri.com/t/getlessonq.php?p_subj=" + encodeURIComponent(subjectId);
          const ep2Url = "https://k.tahdiri.com/public/gets2/lessonsofsubject2.php";
          const ep2Body = "scid=" + encodeURIComponent(subjectId);

          const [raw1, raw2] = await Promise.all([
            fetchViaBackground(ep1Url, "GET", null),
            fetchViaBackground(ep2Url, "POST", ep2Body)
          ]);

          // ── Step C — Decrypt ──────────────────────────────────────────────────
          updateControlStatus("جاري فك تشفير البيانات...", "info");
          const groups    = _decryptEndpoint1(raw1);   // [[id, id, ...], ...]
          const catalogue = _decryptEndpoint2(raw2);   // [{id, name}, ...]
          console.log("[تحضيري] Parasite: decrypted groups=", groups.length, "catalogue=", catalogue.length);

          // ── Step D — Build lesson map ─────────────────────────────────────────
          const lessonMap = buildLessonMap(catalogue);

          // ── Step E — Resolve current lesson's named sections ──────────────────
          const lessonIdNum = parseInt(lessonId, 10);
          const named = resolveGroupNames(groups, lessonMap, isNaN(lessonIdNum) ? null : lessonIdNum);
          console.log("[تحضيري] Parasite: resolved", named.length, "named groups for lessonId=", lessonIdNum);

          if (named.length > 0) {
            // ── Step F — Build plan ─────────────────────────────────────────────
            const plan = buildPlanFromNamedSections(named, subjectId);
            log("runQuickPrepStep2Flow: plan.LectureClassPreparationText=",
              (plan.LectureClassPreparationText || "").substring(0, 80));

            // ── Step G — Inject into form ───────────────────────────────────────
            updateControlStatus("جاري تعبئة حقول التحضير...", "info");
            applyParasitePlanToForm(plan);
            parasitePlanApplied = true;
          } else {
            console.warn("[تحضيري] Parasite: no named groups matched — will use fallback.");
          }

        } catch (parasiteErr) {
          console.warn("[تحضيري] Parasite: competitor API chain failed:", parasiteErr.message || parasiteErr);
          // Fall through to fillLessonFields fallback below
        }
      }

      if (!parasitePlanApplied) {
        updateControlStatus("تعذر جلب بيانات المنافس، يتم استخدام النصوص الافتراضية.", "warning");
        await fillLessonFields(null);
      }

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
      this.mode  = data[AUTOMATION_MODE_KEY]  || "auto";
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
    // Dashboard mode: if on schedule page, inject dashboard UI only
    var bootPageState = detectPageState();
    if (bootPageState === FLOW_STATES.DASHBOARD) {
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
      if (AutomationController.state === FLOW_STATES.DONE || AutomationController.state === FLOW_STATES.ERROR) {
        const currentPathKey = getAutomationActionKey("path-info");
        if (currentPathKey !== data.storedPathKey) {
          AutomationController.state = FLOW_STATES.IDLE;
          return;
        }
        isEnabled = false;
        setButtonsDisabled(false);
        updatePrimaryButton(
          AutomationController.state === FLOW_STATES.DONE ? "\u062A\u0645 \u062A\u062D\u0636\u064A\u0631 \u0627\u0644\u062F\u0631\u0633" : "\u0641\u0634\u0644 \u0627\u0644\u062A\u062D\u0636\u064A\u0631",
          AutomationController.state === FLOW_STATES.DONE ? "success" : "error"
        );
        updateControlStatus("\u062A\u0645 \u0625\u0646\u0647\u0627\u0621 \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0645\u0633\u0628\u0642\u064B\u0627. \u062C\u0627\u0631\u064A \u0645\u0632\u0627\u0645\u0646\u0629 \u0627\u0644\u062D\u0627\u0644\u0629...", "info");
        await sendAutomationStatus(AutomationController.state === FLOW_STATES.DONE ? "DONE" : "ERROR", {
          state: AutomationController.state,
          message: "Stored automation state was already complete."
        });
        await clearSaveSubmittedMarker();
        return;
      }

      // FIX 1: STEP2 resume after page navigation.
      // After Step 1 navigates to the lesson form page, 'isEnabled' is false
      // (it only lives in memory and is lost on navigation). We must explicitly
      // check for a stored STEP2 state and force-enable to run Step 2.
      if (AutomationController.state === FLOW_STATES.STEP2 && detectPageState() === FLOW_STATES.STEP2) {
        console.log('[\u062A\u062D\u0636\u064A\u0631\u064A] boot: detected stored STEP2 state on lesson form page — force-resuming Step 2');
        isEnabled = true;
        setButtonsDisabled(true);
        updatePrimaryButton("\u062C\u0627\u0631\u064D \u0627\u0644\u0627\u0633\u062A\u0626\u0646\u0627\u0641...", "loading");
        updateControlStatus("\u062A\u0645 \u0627\u0643\u062A\u0634\u0627\u0641 \u0646\u0645\u0648\u0630\u062C \u0627\u0644\u062F\u0631\u0633. \u062C\u0627\u0631\u064A \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u062D\u0642\u0648\u0644 \u0648\u062D\u0641\u0638 \u0627\u0644\u062F\u0631\u0633...", "info");
        void AutomationController.run();
        return;
      }

      if (isEnabled && !terminalStates.includes(AutomationController.state)) {
        setButtonsDisabled(true);
        updatePrimaryButton("\u062C\u0627\u0631\u064D \u0627\u0644\u0627\u0633\u062A\u0626\u0646\u0627\u0641...", "loading");
        updateControlStatus("\u064A\u062A\u0645 \u0627\u0633\u062A\u0626\u0646\u0627\u0641 \u0627\u0644\u062A\u062D\u0636\u064A\u0631 \u0628\u0639\u062F \u062A\u062D\u062F\u064A\u062B \u0627\u0644\u0635\u0641\u062D\u0629...", "info");
        void AutomationController.run();
      }
    });
  })();
})();
