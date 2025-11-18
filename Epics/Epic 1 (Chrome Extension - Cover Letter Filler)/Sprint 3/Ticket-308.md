# TICKET-308 — JD + evidence consolidation to variable candidates

## What / Why
Generate variable candidates by combining JD content with top evidence items.

## Outcome
- Candidate builder producing `{ variableKey, evidenceRefs[], candidateText }`.

## Tests
- `tests/research/sprint3/ticket-308/candidates.spec.md`: sample JD + evidence → expected candidate fields populated.

## Acceptance Criteria
- At least one candidate per required variable when evidence exists; else mark insufficient.


