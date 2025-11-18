# TICKET-423 — Char-limit awareness and counter for injectors

## What / Why
Detect textarea/input max length; show remaining characters; pre-truncate Final text with smart ellipsis before injection.

## Outcome
- Helper to read maxlength/ARIA hints; counter UI in panel; truncation with word boundary and ellipsis.

## Tests
- `tests/ui/sprint4/ticket-423/char_limit.spec.md`: fields with/without maxlength → counter correct; injected text length ≤ limit; ellipsis applied when needed.

## Acceptance Criteria
- No overflows; users see remaining chars; truncation preserves readability.


