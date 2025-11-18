# TICKET-418 — Inline edit + persistence for Variable table

## What / Why
Add inline editing for Draft/Final cells and persist edits in background storage.

## Outcome
- Edits saved and restored on reload.

## Tests
- `tests/ui/sprint4/ticket-418/inline_edit.spec.md`: edit then reload → values persist; approval toggles unaffected.

## Acceptance Criteria
- Draft/Final edits are persisted; state consistent across reloads.


