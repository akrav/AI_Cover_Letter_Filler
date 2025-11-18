# TICKET-607 — Cost guardrails & rate limits integration

## What / Why
Enforce per-job token budgets and rate limits across research and generation.

## Outcome
- Budget tracker with per-step caps; hard stops with user prompt to continue.

## Tests
- `tests/qa/sprint6/ticket-607/cost_guard.spec.md`: simulated costs → budget warnings → stop/continue behavior.

## Acceptance Criteria
- Default budgets applied; user can adjust in options; logs include cost summary.


