# TICKET-408 — Directory Picker + downloads fallback

## What / Why
Support choosing a folder via File System Access API; fallback to chrome.downloads.

## Outcome
- Directory selection flow and fallback path with user confirmation.

## Tests
- `tests/export/sprint4/ticket-408/save_flow.spec.md`: mock directory picker success/fail; fallback path invoked; user confirms save.

## Acceptance Criteria
- Folder chosen once per job session unless changed; fallback works on unsupported browsers.


