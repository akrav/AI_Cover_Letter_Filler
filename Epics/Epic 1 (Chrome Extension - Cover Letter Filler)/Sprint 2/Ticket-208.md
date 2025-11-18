# TICKET-208 — Template variable parser (implementation)

## What / Why
Implement the parser based on the Sprint 1 spec; support `{{variable_key}}` with validation.

## Outcome
- Parser module and unit tests.

## Tests
- `tests/extension/sprint2/ticket-208/template_parser.spec.md`: examples from spec → parsed keys and validation errors.

## Acceptance Criteria
- Detects required/missing/duplicate variables as per spec.
- Ready to use in rendering pipeline later.


