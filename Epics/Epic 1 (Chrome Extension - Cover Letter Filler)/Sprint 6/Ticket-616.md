# TICKET-616 — Embed + upsert Q&A into vector store

## What / Why
Embed extracted Q&A and upsert into the vector store with upsert keys and metadata.

## Outcome
- Embedding + upsert script spec; idempotent writes.

## Tests
- `tests/qa/sprint6/ticket-616/embed_upsert.spec.md`: upserted vectors count and sample nearest neighbors.

## Acceptance Criteria
- Duplicate prevention; retrieval returns expected results.


