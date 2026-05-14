// shared/logger.js
// Fire-and-forget session logger. Never blocks UI. Never throws.
// Webhook URL is set after Simon deploys the Apps Script — see README.
window.KoreanSuiteLogger = (function () {
  const WEBHOOK_URL = 'REPLACE_WITH_DEPLOYED_APPS_SCRIPT_URL';

  function log(appId, payload) {
    if (WEBHOOK_URL.indexOf('REPLACE_') === 0) return;
    try {
      const body = JSON.stringify({
        appId: appId,
        deckId: payload.deckId || null,
        sessionId: payload.sessionId || cryptoRandomId_(),
        timestamp: new Date().toISOString(),
        events: payload.events || []
      });
      fetch(WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: body,
        keepalive: true
      }).catch(function () { /* swallow */ });
    } catch (e) { /* swallow */ }
  }

  function cryptoRandomId_() {
    if (window.crypto && window.crypto.randomUUID) return window.crypto.randomUUID();
    return 'sid-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
  }

  return { log: log };
})();
