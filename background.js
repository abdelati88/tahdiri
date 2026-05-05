// Background service worker for تحضيري
// - Handles toolbar action click to toggle automation per-tab
// - Persists state in chrome.storage
// - Relays START/STOP messages to content scripts

importScripts('shared/constants.js');

const STATE_KEY = 'tabStates'; // { [tabId]: { running: boolean, updatedAt: number } }
const START_DEBOUNCE_MS = 2000;

async function getStates() {
  const { [STATE_KEY]: states } = await chrome.storage.local.get(STATE_KEY);
  return states || {};
}

async function setStates(states) {
  await chrome.storage.local.set({ [STATE_KEY]: states });
}

async function setTabState(tabId, running) {
  const states = await getStates();
  states[String(tabId)] = { running, updatedAt: Date.now() };
  await setStates(states);
}

async function getTabState(tabId) {
  const states = await getStates();
  return states[String(tabId)]?.running || false;
}

async function markTabStarting(tabId) {
  const states = await getStates();
  const key = String(tabId);
  const previous = states[key];
  const now = Date.now();
  if (previous?.running && now - (previous.updatedAt || 0) < START_DEBOUNCE_MS) {
    return false;
  }

  states[key] = { running: true, updatedAt: now };
  await setStates(states);
  return true;
}

async function syncBadge(tabId, running) {
  const badgeOptions = tabId ? { tabId, text: running ? 'ON' : '' } : { text: running ? 'ON' : '' };
  const colorOptions = tabId ? { tabId, color: running ? '#0a0' : '#777' } : { color: running ? '#0a0' : '#777' };
  await chrome.action.setBadgeBackgroundColor(colorOptions);
  await chrome.action.setBadgeText(badgeOptions);
}

async function syncBadgeForStatus(tabId, status) {
  if (status === 'START') {
    await chrome.action.setBadgeBackgroundColor(tabId ? { tabId, color: '#0a0' } : { color: '#0a0' });
    await chrome.action.setBadgeText(tabId ? { tabId, text: 'ON' } : { text: 'ON' });
    return;
  }

  if (status === 'ERROR') {
    await chrome.action.setBadgeBackgroundColor(tabId ? { tabId, color: '#c0392b' } : { color: '#c0392b' });
    await chrome.action.setBadgeText(tabId ? { tabId, text: 'ERR' } : { text: 'ERR' });
    return;
  }

  await chrome.action.setBadgeBackgroundColor(tabId ? { tabId, color: '#777' } : { color: '#777' });
  await chrome.action.setBadgeText(tabId ? { tabId, text: '' } : { text: '' });
}

async function toggleForTab(tab) {
  if (!tab || !tab.id) return;
  const isRunning = await getTabState(tab.id);
  const next = !isRunning;
  await setTabState(tab.id, next);
  chrome.tabs.sendMessage(tab.id, { type: next ? 'START' : 'STOP', source: 'background' }, () => void chrome.runtime.lastError);
  await syncBadge(tab.id, next);
}

chrome.action.onClicked.addListener(async (tab) => {
  await toggleForTab(tab);
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg?.type === 'START_ACTIVE_TAB') {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const tab = tabs && tabs[0];
      if (!tab || !tab.id) {
        sendResponse({ success: false });
        return;
      }
      const shouldSendStart = await markTabStarting(tab.id);
      if (shouldSendStart) {
        chrome.tabs.sendMessage(tab.id, { type: 'START', source: 'popup' }, () => void chrome.runtime.lastError);
      }
      await syncBadge(tab.id, true);
      sendResponse({ success: true, alreadyStarting: !shouldSendStart });
    });
    return true;
  }

  if (msg?.type === 'AUTOMATION_STATUS' && sender.tab?.id) {
    const status = msg.status || 'STOP';
    const running = status === 'START';
    setTabState(sender.tab.id, running)
      .then(() => syncBadgeForStatus(sender.tab.id, status))
      .then(() => sendResponse({ success: true }))
      .catch(() => sendResponse({ success: false }));
    return true;
  }

  if (msg?.type === 'STATUS' && sender.tab?.id) {
    const running = !!msg.running;
    setTabState(sender.tab.id, running)
      .then(() => syncBadge(sender.tab.id, running))
      .then(() => sendResponse({ success: true }))
      .catch(() => sendResponse({ success: false }));
    return true;
  }
  if (msg?.type === 'GET_RUNNING' && sender.tab?.id) {
    getTabState(sender.tab.id).then((running) => sendResponse({ running }));
    return true; // async
  }
});

// Optional: initialize badge on install/update
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.action.setBadgeText({ text: '' });
});
