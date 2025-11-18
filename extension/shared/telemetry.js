/* TICKET-211: Telemetry stub (opt-in) */
const Telemetry = (() => {
  function isOptIn(cb) {
    chrome.storage.local.get(['telemetryOptIn'], (d) => cb(!!d.telemetryOptIn));
  }
  function emit(event, data) {
    isOptIn((ok) => {
      if (!ok) return;
      const entry = { ts: Date.now(), event, data: data || {} };
      chrome.storage.local.get(['telemetryEvents'], (d) => {
        const events = Array.isArray(d.telemetryEvents) ? d.telemetryEvents : [];
        events.push(entry);
        chrome.storage.local.set({ telemetryEvents: events });
      });
    });
  }
  function exportJson(cb) {
    chrome.storage.local.get(['telemetryEvents'], (d) => {
      cb(JSON.stringify(d.telemetryEvents || [], null, 2));
    });
  }
  function clear(cb) {
    chrome.storage.local.remove(['telemetryEvents'], cb);
  }
  return { emit, exportJson, clear };
})();
window.Telemetry = Telemetry;


