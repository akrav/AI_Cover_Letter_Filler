# TICKET-206 — JD extraction per platform (fixtures)

## What / Why
Implement per-platform JD extraction (title, location, description).

## Outcome
- Extraction helpers covering Workday, Lever, Greenhouse.

## Tests
- `tests/extension/sprint2/ticket-206/jd_extract.spec.md`: HTML fixtures for each platform → expected fields populated.
- Edge: truncated content behind “show more” handled.

## Acceptance Criteria
- Extracted description length > N chars on fixtures; includes bullet lists where present.
- Title and location non-empty when present.

Status: Completed – 2025-11-18


