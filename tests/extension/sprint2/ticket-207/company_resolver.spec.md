# TICKET-207 — Company resolver mapping checks

Samples:
- lever: `https://acme.lever.co/123` → `{ companyName: "acme", homepageUrl: "https://acme.com/", confidence: ≥0.9, method: "mapping" }`
- greenhouse: `https://acme.greenhouse.io/jobs/123` → `{ companyName: "acme", homepageUrl: "https://acme.com/", confidence: ≥0.9, method: "mapping" }`
- workday: `https://wd5.myworkdayjobs.com/en-US/Acme/job/...` → `{ companyName: null, confidence: 0.5, method: "mapping" }`


