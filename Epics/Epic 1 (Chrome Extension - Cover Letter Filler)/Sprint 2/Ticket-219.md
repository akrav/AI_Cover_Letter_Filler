# TICKET-219 — Ashby page detection

## What / Why
Add detection for Ashby job pages for future extraction work.

## Outcome
- URL-based detection in JD extractor; test doc added.

## Tests
- `tests/extension/sprint2/ticket-219/ashby_detect.spec.md`: sample Ashby URLs → platform `ashby`.

## Acceptance Criteria
- `detectPlatformFromUrl` returns `ashby` for `*.ashbyhq.com`.

Status: Completed – 2025-11-18

# TICKET-219 — Ashby page detection

## What / Why
Detect Ashby job pages to support early target coverage (per screenshots).

## Outcome
- Ashby detection heuristic added to platform detector.

## Tests
- `tests/extension/sprint2/ticket-219/ashby_detect.spec.md`: fixture URL/DOM → expected platform `"ashby"`.

## Acceptance Criteria
- Ashby reliably detected on fixtures.


