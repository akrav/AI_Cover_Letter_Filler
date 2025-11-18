# TICKET-228 — Export/Import settings JSON

Checks:
- [x] Export settings produces JSON without secrets (`apiKey` not included)
- [x] Import settings applies model/budget/strictness/telemetry/hotkey/retentionDays
- [x] Invalid schema rejected with error
- [x] Optional `styleProfile` imported if present


