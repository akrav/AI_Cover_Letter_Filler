# TICKET-605 — Q&A export (DOCX/PDF) to job folder

## What / Why
Export approved Q&A to DOCX and PDF in the same job folder as the cover letter.

## Outcome
- Q&A render pipeline and filenames: `<FirstName>'s <CompanyName> Q&A.{docx,pdf}`.

## Tests
- `tests/export/sprint6/ticket-605/qa_export.spec.md`: artifacts created; evidence bundle includes Q&A citations.

## Acceptance Criteria
- Q&A files saved next to cover letter and evidence.json updated with Q&A citations.


