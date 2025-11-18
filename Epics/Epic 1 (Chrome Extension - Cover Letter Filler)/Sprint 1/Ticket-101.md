# TICKET-101 — Supabase schema draft for core entities

## What / Why
Document the initial SQL schema for core tables to support profiles, style, jobs, variables, evidence, and outputs.

## Outcome
`Build Documentation/Data Model.sql` with CREATE TABLE statements and brief column docs.

## Tests
- Create `tests/docs/sprint1/ticket-101/validate_schema.md` summarizing tables and relationships.
- Include at least one example row for `variable_evidence` showing Quote, URL, and linkage to a variable.

## Acceptance Criteria
- SQL includes: users, profiles, writing_samples, templates, style_profile, companies, jobs, job_sessions, variables, variable_evidence, outputs, qa_pairs, embeddings.
- Keys, indexes, and pgvector columns on embedding-backed tables.
- Linked in Sprint-Progress.md.

Status: Completed – 2025-11-18


