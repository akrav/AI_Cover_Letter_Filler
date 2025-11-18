# TICKET-601 — Index historical Q&A with embeddings

## What / Why
Index user’s past application Q&A with embeddings for retrieval.

## Outcome
- Ingestion script spec and embedding strategy documented.

## Tests
- `tests/qa/sprint6/ticket-601/index.spec.md`: index sample Q&A; show vector counts and example nearest neighbors.

## Acceptance Criteria
- Q&A entries stored with question normalization and metadata (date, company).


