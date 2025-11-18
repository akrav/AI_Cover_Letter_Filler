# TICKET-406 — DOCX rendering pipeline

## What / Why
Render the approved Final values into the DOCX template per the parser spec.

## Outcome
- DOCX generator that replaces variables and saves a file buffer.

## Tests
- `tests/export/sprint4/ticket-406/docx_render.spec.md`: sample template + values → DOCX produced; spot-check replaced fields.

## Acceptance Criteria
- All required variables replaced; missing optional variables handled gracefully.


