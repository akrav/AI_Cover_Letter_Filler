# TICKET-508 — Golden fixtures for style eval

## What / Why
Create golden fixtures for “good” vs “bad” style matches to keep evaluation stable over time.

## Outcome
- Good/bad text files and expected score ranges.

## Tests
- `tests/style/sprint5/ticket-508/goldens.spec.md`: assert scores fall within documented ranges.

## Acceptance Criteria
- Goldens allow quick regression detection; documented ranges are sensible.


