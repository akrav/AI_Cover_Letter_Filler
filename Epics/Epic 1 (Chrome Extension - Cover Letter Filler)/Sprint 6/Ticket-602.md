# TICKET-602 — Question normalization and matching

## What / Why
Normalize incoming questions (lemmatize, remove boilerplate) and match to indexed Q&A.

## Outcome
- Normalizer + retriever returning top‑k similar questions with scores.

## Tests
- `tests/qa/sprint6/ticket-602/normalize_match.spec.md`: variations of a question → same canonical form; expected top‑k results.

## Acceptance Criteria
- Normalized forms stable; retrieval accurate on fixtures.


