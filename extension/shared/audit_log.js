/* TICKET-506: Override audit log */
(function () {
  function nowIso() { return new Date().toISOString(); }
  function appendAuditLog(entry, cb) {
    chrome.storage.local.get(['audit_log'], (d) => {
      const arr = Array.isArray(d.audit_log) ? d.audit_log : [];
      arr.push({ ...entry, timestamp: nowIso() });
      chrome.storage.local.set({ audit_log: arr }, cb);
    });
  }
  window.AuditLog = { appendAuditLog };
})();


