# TICKET-101 — Schema validation snapshot

This document summarizes the core tables and relationships introduced by TICKET-101 and provides a concrete example for `variable_evidence`.

## Tables
- users
- profiles
- writing_samples (embedding: vector(1536), ivfflat index)
- templates (embedding: vector(1536), ivfflat index)
- style_profile (embedding: vector(1536), ivfflat index)
- companies
- jobs (embedding: vector(1536), ivfflat index)
- job_sessions
- variables
- variable_evidence
- outputs
- qa_pairs (embedding: vector(1536), ivfflat index)
- embeddings (embedding: vector(1536), ivfflat index)

## Relationships (selected)
- profiles.user_id → users.id (1–1)
- writing_samples.user_id → users.id (N–1)
- templates.user_id → users.id (N–1)
- style_profile.user_id → users.id (1–1)
- jobs.company_id → companies.id (N–1)
- job_sessions.user_id → users.id (N–1)
- job_sessions.job_id → jobs.id (N–1)
- variables.job_session_id → job_sessions.id (N–1)
- variable_evidence.variable_id → variables.id (N–1)
- outputs.job_session_id → job_sessions.id (N–1)
- qa_pairs.job_session_id → job_sessions.id (N–1)

## Example row — variable_evidence

```json
{
  "id": "6c8a6f06-2f1b-4f9b-9f50-3c6d9c4bc111",
  "variable_id": "7b4f7c2e-1a5c-4b2f-9d3c-2f8e7b6a2d90",
  "quote": "We recently raised a $30M Series B led by Example Capital to expand our AI platform.",
  "evidence_url": "https://example.com/press/series-b-30m",
  "source_title": "ExampleCo raises $30M Series B",
  "source_type": "press",
  "created_at": "2025-11-18T00:00:00Z"
}
```


