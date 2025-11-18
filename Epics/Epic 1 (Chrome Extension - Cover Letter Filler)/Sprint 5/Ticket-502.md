# TICKET-502 — Embedding similarity calculator

## What / Why
Compute cosine similarity between user exemplar embeddings and generated text.

## Outcome
- Similarity module returning cosine in [-1, 1] and normalized [0,1].

## Tests
- `tests/style/sprint5/ticket-502/embedding_similarity.spec.md`: good vs bad examples → expected separation.

## Acceptance Criteria
- Deterministic results on fixtures; normalization documented.


