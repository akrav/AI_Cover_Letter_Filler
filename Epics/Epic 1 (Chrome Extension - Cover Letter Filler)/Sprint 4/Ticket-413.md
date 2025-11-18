# TICKET-413 — “Autofill All” button + per-field spinner states

## What / Why
Add a one-click action to generate candidates for all variables and show per-field progress.

## Outcome
- Primary button triggers generation; spinners per row during work.

## Tests
- `tests/ui/sprint4/ticket-413/autofill_all.spec.md`: click → progress indicators; rows populated.

## Acceptance Criteria
- Works on current page; can retry; respects approval gating.


