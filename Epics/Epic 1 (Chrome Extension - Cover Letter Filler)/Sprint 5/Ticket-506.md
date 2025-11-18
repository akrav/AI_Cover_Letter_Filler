# TICKET-506 — Override dialog & audit log

## What / Why
Allow user to override low styleConfidence with a confirmation dialog and record the decision.

## Outcome
- Override dialog; audit log stored in snapshot.

## Tests
- `tests/ui/sprint5/ticket-506/override_dialog.spec.md`: low score triggers dialog; “Use anyway” records reason.

## Acceptance Criteria
- Override possible only below threshold; audit log includes timestamp, user note, variables affected.


