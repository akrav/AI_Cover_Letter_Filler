# TICKET-309 — Strictness levels & insufficiency handling

## What / Why
Implement strict/balanced/lenient modes that affect how much evidence is required per variable.

## Outcome
- Mode-aware candidate acceptance rules and user prompts for missing evidence.

## Tests
- `tests/research/sprint3/ticket-309/strictness.spec.md`: same inputs under different modes → expected accept/reject outcomes.

## Acceptance Criteria
- Strict: require ≥2 sources; Balanced: ≥1; Lenient: allow user note override.


