(function initTahdiriConfig(globalScope) {
  if (!globalScope) return;

  globalScope.TAHDIRI_CONFIG = Object.freeze({
    APP_NAME: 'تحضيري',
    VERSION: '10.0.0',
    STORAGE_KEYS: Object.freeze({
      AUTOMATION_STATE: 'automationState',
      DEFAULT_SELECTOR: 'defaultSelector',
      DEFAULT_INTERVAL: 'defaultInterval',
      DEFAULT_MAX_RETRIES: 'defaultMaxRetries',
      SITE_PROFILES: 'siteProfiles',
      DASHBOARD_SELECTIONS: 'dashboardSelections'
    }),
    AUTOCLICK_DEFAULTS: Object.freeze({
      interval: 1200,
      maxRetries: 20
    }),
    SETTINGS_DEFAULTS: Object.freeze({
      defaultSelector: '.submit-form-btn, #sub, a[href="#finish"]',
      siteProfiles: Object.freeze({
        'schools.madrasati.sa': Object.freeze({
          selector: '.submit-form-btn, #sub, a[href="#finish"]',
          interval: 1000,
          maxRetries: 30
        }),
        'external.madrasati.sa': Object.freeze({
          selector: '.submit-form-btn, #sub, a[href="#finish"]',
          interval: 1000,
          maxRetries: 30
        })
      })
    })
  });
})(typeof globalThis !== 'undefined' ? globalThis : this);
