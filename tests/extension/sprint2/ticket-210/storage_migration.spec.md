# TICKET-210 — Storage migration checks

Expectations:
- [x] `schemaVersion` stored in `chrome.storage.local`
- [x] Migrating from 0 → 1 sets defaults for `model`, `budgetCap`, `strictness`
- [x] Idempotent: running multiple times keeps `schemaVersion` at 1 and values stable
- [x] Options UI shows schema version


