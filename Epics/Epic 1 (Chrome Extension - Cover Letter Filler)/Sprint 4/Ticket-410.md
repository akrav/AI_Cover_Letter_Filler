# TICKET-410 — Evidence bundle (evidence.json)

## What / Why
Bundle all evidence used in the final letter into a single `evidence.json` saved alongside outputs.

## Outcome
- Evidence bundle builder with references to variables and URLs.

## Tests
- `tests/export/sprint4/ticket-410/evidence_bundle.spec.md`: sample variables/evidence → expected JSON bundle keys and counts.

## Acceptance Criteria
- Bundle includes all quotes/URLs actually used; easy to audit.


