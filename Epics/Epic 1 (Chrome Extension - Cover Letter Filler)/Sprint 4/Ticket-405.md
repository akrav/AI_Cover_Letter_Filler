# TICKET-405 — Approval state machine & persistence

## What / Why
Implement approval gating: variables must be Approved before export; persist state.

## Outcome
- Approval state machine and storage integration.

## Tests
- `tests/ui/sprint4/ticket-405/approval_state.spec.md`: transitions pending→approved→edited→needs-review; persistence verified.

## Acceptance Criteria
- Exports are disabled until all required variables Approved; edited Final resets approval.


