# TICKET-403 — Grounded draft generation (JSON)

## What / Why
Generate variable drafts strictly from JD + evidence; output as JSON matching the Variable Table schema.

## Outcome
- Generation function and schema validation step.

## Tests
- `tests/gen/sprint4/ticket-403/grounded_generation.spec.md`: inputs (JD + quotes) → JSON with Draft present; reject if no evidence.

## Acceptance Criteria
- No hallucinations: drafts only include info derivable from JD/evidence; fails closed on missing evidence.


