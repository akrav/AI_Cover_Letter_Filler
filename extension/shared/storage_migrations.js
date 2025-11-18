/* TICKET-210: Storage schema versioning and migrations */
(function () {
  const CURRENT_VERSION = 1;
  function getVersion(cb) {
    chrome.storage.local.get(['schemaVersion'], (data) => cb(data.schemaVersion || 0));
  }
  function setVersion(v, cb) {
    chrome.storage.local.set({ schemaVersion: v }, cb);
  }
  function migrateFrom0To1(cb) {
    // Initial baseline — ensure required keys exist
    chrome.storage.local.get(['model', 'budgetCap', 'strictness'], (data) => {
      const updates = {};
      if (!data.model) updates.model = 'gpt-4o-mini';
      if (typeof data.budgetCap !== 'number') updates.budgetCap = 0.10;
      if (!data.strictness) updates.strictness = 'balanced';
      chrome.storage.local.set(updates, () => cb());
    });
  }
  function runMigrations(cb) {
    getVersion((v) => {
      const start = v;
      const next = () => {
        if (v < 1) {
          migrateFrom0To1(() => {
            v = 1;
            setVersion(1, next);
          });
          return;
        }
        // up-to-date
        cb && cb({ from: start, to: v });
      };
      next();
    });
  }
  window.StorageMigrations = { runMigrations, CURRENT_VERSION };
})();


