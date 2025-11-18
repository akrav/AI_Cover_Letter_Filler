# TICKET-102 — Template variable syntax and parser spec

## What / Why
Define a consistent placeholder syntax (e.g., `{{variable_key}}`) and parsing rules for DOCX and plain text templates.

## Outcome
`Build Documentation/Template Variables.md` with examples, reserved keys, validation rules, and parser edge cases.

## Tests
- Add `tests/docs/sprint1/ticket-102/template_examples.md` with valid/invalid examples and expected parsed outputs.
- Include a tiny sample template demonstrating 3 required and 1 optional variable.

## Acceptance Criteria
- Syntax chosen and documented with examples.
- List of required vs optional variables for MVP.
- Parser behavior defined for missing/duplicate variables.

Status: Completed – 2025-11-18


