# TICKET-104 — Model selection and cost plan

## What / Why
Choose default generation and embedding models and document a cost control plan per job.

## Outcome
Update `Build Documentation/LLM & RAG Strategy.md` with model choices and cost caps.

## Tests
- Add `tests/docs/sprint1/ticket-104/cost_scenarios.md` with 3 budget scenarios and expected model settings.
- Include a token budget worksheet table (inputs/outputs).

## Acceptance Criteria
- Default: gpt‑4o‑mini for generation; text-embedding-3-small for embeddings.
- Per‑job token budget strategy documented.
- Model override setting noted for later implementation.


