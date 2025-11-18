# TICKET-222 — Exa resolver stub + scorer

## What / Why
Add Exa search fallback (stubbed) to resolve company homepage and basic scoring for candidates. Split from TICKET-207.

## Outcome
- Resolver returns `{ companyName, homepageUrl, confidence, method: "search" }` when mapping fails.

## Tests
- `tests/extension/sprint2/ticket-222/exa_resolver.spec.md`: stub responses → expected selection and score thresholds.

## Acceptance Criteria
- Search fallback invoked on mapping miss; canonical HTTPS URL chosen; confidence reported.

Status: Completed – 2025-11-18


