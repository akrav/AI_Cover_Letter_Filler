# Style Similarity Evaluation — Verifying User-Style Fidelity

## Objective
Quantify how closely generated text matches the user’s style using multiple signals; block exports unless thresholds are met or the user explicitly overrides.

## Signals
1) Stylometry distance
   - Features: sentence length distribution, type-token ratio, function word frequencies, punctuation patterns, POS tag ratios, readability indices.
   - Scoring: Jensen–Shannon divergence over normalized feature vectors → `stylometryScore ∈ [0,1]` (1 = identical).
2) Embedding similarity
   - Average embeddings of the user’s exemplar paragraphs vs generated text (`cosineSimilarity ∈ [-1,1]`).
3) Authorship classifier
   - Lightweight logistic regression or small transformer head trained on user samples vs background corpus; output `probUserStyle ∈ [0,1]`.

## Composite
- `styleConfidence = 0.5*stylometryScore + 0.35*norm(cosineSimilarity) + 0.15*probUserStyle`
- Thresholds:
  - Warn if `< 0.70`, block auto-approve if `< 0.60`.
  - Allow user override with explicit confirmation.

## Test Plan
- Fixtures:
  - `tests/style/fixtures/user_samples/*.txt` (3–5 paragraphs).
  - `tests/style/fixtures/generated_good.txt` (expected pass).
  - `tests/style/fixtures/generated_bad.txt` (expected fail).
- Tests:
  - `tests/style/style_similarity.spec.md`
    - Compute features → expect stylometryScore(good) > 0.75; (bad) < 0.55.
    - Embedding similarity: good > 0.75; bad < 0.55.
    - Classifier: good > 0.65; bad < 0.50.
    - Composite thresholds produce PASS/FAIL as expected.

## UI
- Show a style badge: “Style match: 0.78 (PASS)” with hover to expand per-signal scores.
- Provide “Use anyway” with rationale and confirmation dialog if below thresholds.


