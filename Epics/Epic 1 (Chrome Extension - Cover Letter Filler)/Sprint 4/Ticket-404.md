# TICKET-404 — In‑style rewrite using style_profile

## What / Why
Rewrite Draft into Final using the user’s style profile while preserving grounded facts.

## Outcome
- Style-aware rewrite function with guardrails and evaluation hook.

## Tests
- `tests/gen/sprint4/ticket-404/style_rewrite.spec.md`: given Draft + style_profile → Final that passes style similarity thresholds from the evaluation doc.

## Acceptance Criteria
- Final maintains factual fidelity; meets style thresholds or shows override dialog.


