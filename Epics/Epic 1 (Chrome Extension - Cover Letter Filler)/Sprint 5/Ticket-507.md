# TICKET-507 — Style eval dataset curation

## What / Why
Curate a small internal dataset of user-style samples and neutral/background texts for evaluation.

## Outcome
- `tests/style/fixtures/dataset_manifest.json` listing sample files and labels.

## Tests
- `tests/style/sprint5/ticket-507/dataset.spec.md`: manifest validation; ensure min counts per class.

## Acceptance Criteria
- Dataset is anonymized; sufficient for baseline evaluation.


