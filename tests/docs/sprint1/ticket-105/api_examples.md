# TICKET-105 — API examples

## /profile
Request:
```json
{
  "userId": "1e3b8dbf-3c2d-46b2-9caa-5fe7df391234",
  "profile": { "fullName": "Ada Lovelace" },
  "writingSamples": [
    { "title": "Sample A", "content": "..." }
  ]
}
```
Response:
```json
{
  "styleProfileId": "d4a7fce6-7a52-4c51-8c61-5a88b7e61234",
  "summary": { "tone": "formal", "cadence": "short", "structure": "narrative" }
}
```

## /research
Request:
```json
{ "userId": "1e3b8dbf-3c2d-46b2-9caa-5fe7df391234", "company": { "name": "Acme Corp" }, "maxPages": 6 }
```
Response:
```json
{ "evidenceBundleId": "f2a6c9a7-b9d1-4c9d-baba-33e88bf81234", "quotes": [] }
```

## /generate
Request:
```json
{
  "jobSessionId": "a7b8c9d0-1234-5678-9abc-def012345678",
  "variables": { "company_name": "Acme Corp", "position_title": "Senior ML Engineer" },
  "styleProfileId": "d4a7fce6-7a52-4c51-8c61-5a88b7e61234",
  "evidenceBundleId": "f2a6c9a7-b9d1-4c9d-baba-33e88bf81234"
}
```
Response:
```json
{
  "draftId": "9012abcd-3456-7890-abcd-ef0123456789",
  "content": "Dear Acme Corp Hiring Team, ...",
  "citations": [{ "quoteId": "..." , "url": "https://..." }],
  "costUsd": 0.07,
  "modelUsed": { "generation": "gpt-4o-mini", "embedding": "text-embedding-3-small" }
}
```

## /render
Request:
```json
{ "draftId": "9012abcd-3456-7890-abcd-ef0123456789", "format": "docx" }
```
Response:
```json
{ "renderId": "f00a12cd-1234-5678-9abc-def012345678", "format": "docx", "downloadUrl": "https://..." }
```

## /export
Request:
```json
{ "renderId": "f00a12cd-1234-5678-9abc-def012345678", "destination": "local", "path": "/Users/you/Downloads" }
```
Response:
```json
{ "exportId": "bbbb12cd-1234-5678-9abc-def012345678", "location": "/Users/you/Downloads/Acme_Letter.docx" }
```

## /qa
Request:
```json
{ "jobSessionId": "a7b8c9d0-1234-5678-9abc-def012345678", "questions": ["Why us?"] }
```
Response:
```json
{ "answers": [{ "question": "Why us?", "answer": "Because ...", "sources": [] }] }
```

## Error examples

INVALID_INPUT:
```json
{ "error": { "code": "INVALID_INPUT", "message": "position_title is required", "retryable": false } }
```

RATE_LIMITED:
```json
{ "error": { "code": "RATE_LIMITED", "message": "Backoff 5s", "retryable": true } }
```

INSUFFICIENT_EVIDENCE:
```json
{ "error": { "code": "INSUFFICIENT_EVIDENCE", "message": "No quotes for company_mission", "retryable": false, "details": { "missing": ["company_mission"] } } }
```


