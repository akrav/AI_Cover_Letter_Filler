# TICKET-219 — Ashby page detection

## What / Why
Detect Ashby job pages to support early target coverage (per screenshots).

## Outcome
- Ashby detection heuristic added to platform detector.

## Tests
- `tests/extension/sprint2/ticket-219/ashby_detect.spec.md`: fixture URL/DOM → expected platform `"ashby"`.

## Acceptance Criteria
- Ashby reliably detected on fixtures.


