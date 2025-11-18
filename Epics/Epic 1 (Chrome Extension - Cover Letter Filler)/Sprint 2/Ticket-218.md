# TICKET-218 — Downloads fallback + filename suggestion

## What / Why
Implement chrome.downloads fallback to save files with suggested filenames when FS Access isn’t available.

## Outcome
- Fallback path invoked when DirectoryHandle not present; filename suggestion integrated.

## Tests
- `tests/extension/sprint2/ticket-218/downloads_fallback.spec.md`: fallback invoked; user sees save dialog; filenames correct.

## Acceptance Criteria
- Reliable fallback on unsupported browsers; user can still choose save location.


