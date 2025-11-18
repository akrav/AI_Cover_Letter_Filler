# TICKET-503 — Authorship classifier baseline

## What / Why
Train a lightweight classifier to distinguish user-style vs background samples.

## Outcome
- Classifier that outputs `probUserStyle ∈ [0,1]` with config for thresholds.

## Tests
- `tests/style/sprint5/ticket-503/authorship_classifier.spec.md`: confusion matrix on fixtures; target metrics documented.

## Acceptance Criteria
- Baseline accuracy/ROC documented; reproducible on fixtures.


