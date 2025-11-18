# TICKET-501 — Stylometry feature extractor

## What / Why
Extract stylometric features from text to quantify style characteristics.

## Outcome
- Feature extractor module producing normalized vectors.

## Tests
- `tests/style/sprint5/ticket-501/stylometry.spec.md`: compute features on fixtures; check stability and bounds.

## Acceptance Criteria
- Features include sentence length, TTR, function words, punctuation, POS ratios, readability.


