# TICKET-419 — Template variable replacement engine

## What / Why
Implement variable replacement (`{{key}}`) against approved Final values, separate from DOCX writer.

## Outcome
- Replacement engine with validation errors for missing required keys.

## Tests
- `tests/export/sprint4/ticket-419/replacement_engine.spec.md`: sample template → expected replaced text; errors for missing keys.

## Acceptance Criteria
- All required variables replaced; missing yield clear errors.


