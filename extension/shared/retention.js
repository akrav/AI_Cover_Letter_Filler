/* TICKET-227: Retention window pruning */
const Retention = (() => {
  const DEFAULT_DAYS = 90;
  function getRetentionDays(cb) {
    chrome.storage.local.get(['retentionDays'], (d) => cb(d.retentionDays || DEFAULT_DAYS));
  }
  function pruneTelemetry(nowMs, days, cb) {
    chrome.storage.local.get(['telemetryEvents'], (d) => {
      const events = Array.isArray(d.telemetryEvents) ? d.telemetryEvents : [];
      const cutoff = nowMs - days * 24 * 60 * 60 * 1000;
      const kept = events.filter(e => typeof e.ts === 'number' ? e.ts >= cutoff : true);
      if (kept.length !== events.length) {
        chrome.storage.local.set({ telemetryEvents: kept }, cb);
      } else {
        cb && cb();
      }
    });
  }
  function runOnce(cb) {
    getRetentionDays((days) => {
      const now = Date.now();
      pruneTelemetry(now, days, () => cb && cb());
    });
  }
  function schedule() {
    // Best-effort interval (service worker may sleep)
    setInterval(() => runOnce(() => {}), 6 * 60 * 60 * 1000);
  }
  return { runOnce, schedule, getRetentionDays };
})();
window.Retention = Retention;


