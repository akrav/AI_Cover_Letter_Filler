# TICKET-615 — Confidence threshold + “retrieved answers” popover

## What / Why
Add a confidence threshold for Q&A matches and a popover showing retrieved answers for user selection.

## Outcome
- Threshold gating; popover lists top‑k with citations.

## Tests
- `tests/ui/sprint6/ticket-615/qa_confidence_popover.spec.md`: low confidence shows popover; user picks/merges answer.

## Acceptance Criteria
- Users can choose/merge retrieved answers before finalizing.


