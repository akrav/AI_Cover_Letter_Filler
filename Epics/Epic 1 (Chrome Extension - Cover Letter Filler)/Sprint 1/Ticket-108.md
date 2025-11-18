# TICKET-108 — Prompt patterns for style‑preserving, evidence‑bounded fills

## What / Why
Draft system/user prompts and JSON output schema for generating variable fills grounded in evidence.

## Outcome
`Build Documentation/Prompt Patterns.md` with examples for variable table then prose generation.

## Tests
- Add `tests/docs/sprint1/ticket-108/prompt_examples.md` with 1 full example including inputs (JD + quotes) and expected JSON.
- Validate schema completeness for Variable Key, Quote, URL, Rationale, Draft, Final.

## Acceptance Criteria
- System prompt includes “no‑hallucination” and style fidelity requirements.
- JSON schema for variable outputs defined.
- Example prompt/response pair included.


