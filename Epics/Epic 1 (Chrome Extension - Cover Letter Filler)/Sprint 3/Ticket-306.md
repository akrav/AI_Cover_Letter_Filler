# TICKET-306 — Dedup & clustering (embedding similarity)

## What / Why
Cluster near-duplicate evidence using embeddings; keep the best representative.

## Outcome
- Clusterer returning groups with representative selection.

## Tests
- `tests/research/sprint3/ticket-306/clustering.spec.md`: synthetic examples → expected grouping and kept items.

## Acceptance Criteria
- Duplicate quotes grouped; representative has highest score within cluster.


