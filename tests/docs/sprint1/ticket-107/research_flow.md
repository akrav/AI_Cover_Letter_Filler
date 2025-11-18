# TICKET-107 — Research flow example

## Step-by-step
1. JD parsed for company: "Acme Corp", role: "Senior ML Engineer".
2. Queries generated: ["Acme Corp mission", "about Acme Corp", "Acme Corp press", "Acme Corp values"].
3. Exa returns results; filter to acme.com and reputable press domains.
4. Fetch pages; one page requires Browserbase render (JS-heavy).
5. Extract quotes from sections labeled "Mission" and "Values".
6. Score quotes (relevance, authority, recency). Keep top 3 per variable.
7. Deduplicate and cache snapshot for this job_session.

## Mock evidence JSON
```json
{
  "variable_evidence": [
    {
      "id": "e1b4a0d6-3236-4f74-9e35-12f5b2a11111",
      "variable_id": "7b4f7c2e-1a5c-4b2f-9d3c-2f8e7b6a2d90",
      "quote": "Our mission is to make AI accessible to every developer.",
      "evidence_url": "https://www.acme.com/about",
      "source_title": "About Acme",
      "source_type": "site",
      "score": 0.82,
      "rationale": "Direct mission statement on About page"
    }
  ]
}
```


