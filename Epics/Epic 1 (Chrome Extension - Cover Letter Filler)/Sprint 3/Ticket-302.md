# TICKET-302 — Homepage detection & canonical URL finder

## What / Why
Given multiple candidate domains, pick the canonical company homepage.

## Outcome
- `selectHomepage(candidates)` returning canonical HTTPS URL.

## Tests
- `tests/research/sprint3/ticket-302/homepage_select.spec.md`: ranking rules and tie-breakers; strip tracking params.

## Acceptance Criteria
- Prefers brand-matching apex domain with HTTPS; stable across fixtures.


