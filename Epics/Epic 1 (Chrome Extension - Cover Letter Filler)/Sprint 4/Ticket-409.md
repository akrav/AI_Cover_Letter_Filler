# TICKET-409 — File naming & sanitization

## What / Why
Generate filenames per convention and sanitize unsafe characters.

## Outcome
- Naming utility returning `<FirstName>'s <CompanyName> Cover Letter.{docx,pdf}`.

## Tests
- `tests/export/sprint4/ticket-409/naming.spec.md`: various inputs → expected sanitized names.

## Acceptance Criteria
- Filenames safe across macOS/Windows; length limits respected; unicode normalized.


