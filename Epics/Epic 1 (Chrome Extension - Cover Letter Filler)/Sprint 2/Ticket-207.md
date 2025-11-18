# TICKET-207 — Company resolver (mapping-only)

## What / Why
Resolve company name and homepage from platform context; fallback to Exa search (stub during this sprint).

## Outcome
- Mapping-based resolver returning `{ companyName, homepageUrl, confidence, method: "mapping" }`.

## Tests
- `tests/extension/sprint2/ticket-207/company_resolver.spec.md`: mapping table of sample URLs → expected company and homepage.

## Acceptance Criteria
- Confidence > 0.7 on fixtures; method reflects "mapping".
- Produces canonical HTTPS URLs without tracking params.


