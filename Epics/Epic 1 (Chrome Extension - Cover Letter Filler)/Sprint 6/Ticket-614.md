# TICKET-614 — Clipboard fallback for blocked fields

## What / Why
When scripted injection is blocked, use clipboard write and user paste prompt with clear guidance.

## Outcome
- Clipboard fallback path with UX nudges and safety checks.

## Tests
- `tests/ui/sprint6/ticket-614/clipboard_fallback.spec.md`: blocked injection → clipboard path triggered; user completes paste.

## Acceptance Criteria
- Reliable fallback; no sensitive data leaked; guidance is clear.


