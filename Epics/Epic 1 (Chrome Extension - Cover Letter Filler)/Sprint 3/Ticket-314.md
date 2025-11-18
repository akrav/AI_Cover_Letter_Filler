# TICKET-314 — Crawl delay + page cap knobs

## What / Why
Introduce politeness delay and per-job page cap; configurable via options.

## Outcome
- Delay and cap enforced in crawler; surfaced in logs.

## Tests
- `tests/research/sprint3/ticket-314/politeness.spec.md`: delays observed; cap stops further fetches.

## Acceptance Criteria
- Defaults applied; user can adjust; prevents hammering sites.


