# TICKET-228 — Export/Import settings (JSON)

## What / Why
Let users export Options + style_profile to JSON and re-import on another machine.

## Outcome
- Export button: downloads JSON; Import: validate schema and apply.

## Tests
- `tests/extension/sprint2/ticket-228/export_import.spec.md`: export then import → settings restored; invalid import rejected.

## Acceptance Criteria
- JSON schema validated; secrets handled carefully (never auto-import service role keys).


