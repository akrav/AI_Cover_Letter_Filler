# TICKET-317 — Prompt/data safety tests (sanitized-only path)

## What / Why
Ensure only sanitized content reaches prompts and UI components; add regression tests for unsafe input paths.

## Outcome
- Test suite that feeds unsafe inputs end-to-end and asserts safe serialization only.

## Tests
- `tests/research/sprint3/ticket-317/prompt_safety.spec.md`: unsafe inputs → no scripts; prompt bodies verified.

## Acceptance Criteria
- All paths use sanitized content; tests fail if any unsafe content leaks.


