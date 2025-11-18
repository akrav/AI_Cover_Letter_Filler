# TICKET-310 — Per-job caching & snapshot store

## What / Why
Cache research results and store a snapshot bundle for reproducibility.

## Outcome
- Cache keys by `{ companyDomain, jobTitle, timestampBucket }`.
- Snapshot `evidence.json` artifact.

## Tests
- `tests/research/sprint3/ticket-310/cache.spec.md`: demonstrate cache hit/miss; snapshot written once.

## Acceptance Criteria
- Cache reduces repeated calls; snapshot is complete and de-duplicated.


