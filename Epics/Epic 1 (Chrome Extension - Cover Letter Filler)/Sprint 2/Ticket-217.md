# TICKET-217 — Choose save folder (Directory Picker)

## What / Why
Add a setting to choose and persist a save folder using the File System Access API from the options page.

## Outcome
- Stored DirectoryHandle (or tokenized reference) and permission prompt flow.

## Tests
- `tests/extension/sprint2/ticket-217/choose_folder.spec.md`: pick folder, reload, handle persists; fallback documented.

## Acceptance Criteria
- Folder selection works; graceful fallback documented where FS Access is unavailable.


