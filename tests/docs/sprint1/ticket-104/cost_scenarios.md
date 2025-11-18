# TICKET-104 — Cost scenarios and expected settings

## Scenario A — Economy ($0.05 cap)
- Generation model: `gpt-4o-mini`
- Embedding model: `text-embedding-3-small`
- Switches:
  - Disable revision pass
  - Shorter draft (target 500–600 words)
- Expected token plan:
  - Input: ~3,600, Output: ~1,200 (≈4,800 total)
- Expected cost: ≤ $0.05

## Scenario B — Default ($0.10 cap)
- Generation model: `gpt-4o-mini`
- Embedding model: `text-embedding-3-small`
- Switches:
  - Enable evidence ingest + grounding
  - Standard draft (650–900 words)
- Expected token plan:
  - Input: ~5,100, Output: ~1,900 (≈7,000 total)
- Expected cost: ≈ $0.10 (hard stop at $0.15)

## Scenario C — Quality ($0.25 cap)
- Generation model: `gpt-4o-mini`
- Embedding model: `text-embedding-3-small`
- Switches:
  - Enable revision pass
  - Style polish pass (minor)
  - Standard or slightly longer draft
- Expected token plan:
  - Input: ~6,300, Output: ~2,400 (≈8,700 total)
- Expected cost: ≤ $0.25

## Token budget worksheet (inputs/outputs)

| Phase | In | Out |
|---|---:|---:|
| Style recall | 1,000 | 0 |
| Evidence ingest | 1,500 | 300 |
| Draft generation | 1,200 | 800 |
| Revision pass | 800 | 500 |
| QA (optional) | 600 | 300 |
| Totals (default) | 5,100 | 1,900 |


