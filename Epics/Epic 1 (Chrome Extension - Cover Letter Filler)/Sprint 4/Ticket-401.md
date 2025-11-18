# TICKET-401 — Style profile builder (implementation)

## What / Why
Implement style profile creation from user samples (features + embeddings) per the rubric.

## Outcome
- `buildStyleProfile(samples[]) -> style_profile`

## Tests
- `tests/style/sprint4/ticket-401/style_profile.spec.md`: given sample texts → expected descriptors populated; stable across runs.

## Acceptance Criteria
- Outputs align with the JSON schema from Sprint 1; includes exemplars for few-shot.


