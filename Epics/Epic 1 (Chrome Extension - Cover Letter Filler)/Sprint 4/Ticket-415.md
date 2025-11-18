# TICKET-415 — Textarea injection (Platform A)

## What / Why
Implement injection for platform A (Workday) cover letter fields.

## Outcome
- Helper that finds textarea/field and injects text, with throttled typing if needed.

## Tests
- `tests/ui/sprint4/ticket-415/injection_workday.spec.md`: fixture → field populated.

## Acceptance Criteria
- Injection reliable on Workday fixtures; clipboard fallback documented.


