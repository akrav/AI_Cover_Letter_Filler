# TICKET-108 — Prompt example

Inputs:
- style_profile: { "tone":"formal","cadence":{"bucket":"short"} }
- job_description: "We seek an ML engineer to improve inference latency and build robust pipelines."
- quotes:
  - "Our mission is to make AI accessible to every developer." (https://acme.com/about)

Expected JSON (Phase 1):
```json
{
  "variables": [
    {
      "key": "company_name",
      "value": "Acme Corp",
      "status": "ok",
      "citations": [{ "quote": "Our mission is to make AI accessible to every developer.", "url": "https://acme.com/about" }],
      "rationale": "Company name from JD heading",
      "confidence": 0.95
    },
    {
      "key": "position_title",
      "value": "Senior ML Engineer",
      "status": "ok",
      "citations": [],
      "rationale": "From JD title",
      "confidence": 0.9
    },
    {
      "key": "company_mission",
      "value": "Make AI accessible to every developer.",
      "status": "ok",
      "citations": [{ "quote": "Our mission is to make AI accessible to every developer.", "url": "https://acme.com/about" }],
      "rationale": "Direct quote from About page",
      "confidence": 0.92
    },
    {
      "key": "referrer_name",
      "status": "insufficient_evidence",
      "rationale": "No quote or JD reference present"
    }
  ]
}
```

Draft (Phase 2) — snippet:
> Dear Acme Corp Hiring Team, ... (continues in formal tone, grounded to provided variables and quotes)


