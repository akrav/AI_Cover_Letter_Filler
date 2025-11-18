# TICKET-603 — Grounded Q&A draft with citations

## What / Why
Draft answers grounded in retrieved Q&A and evidence with explicit citations.

## Outcome
- Q&A generator producing `{ question, draft, citations[] }`.

## Tests
- `tests/qa/sprint6/ticket-603/qa_generation.spec.md`: given question + retrieved answers → draft with citations; reject when insufficient.

## Acceptance Criteria
- No hallucinations; at least one citation required unless user overrides.


