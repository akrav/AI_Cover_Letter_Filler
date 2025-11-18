# TICKET-613 — Local Q&A ingestion from documents

## What / Why
Scan `Job Applications/` for Q&A in DOCX/PDF, extract pairs, and store with metadata (company/date).

## Outcome
- Ingestion doc with extraction heuristics and storage fields.

## Tests
- `tests/qa/sprint6/ticket-613/local_ingest.spec.md`: sample docs → extracted pairs saved with metadata.

## Acceptance Criteria
- Q&A pairs available for retrieval in later steps.


