# TICKET-222 — Exa resolver stub checks

Expectations:
- [x] When mapping fails, search fallback invoked with host-derived hint
- [x] Chooses canonical HTTPS homepage and returns method "search"
- [x] Reports confidence ≥ 0.7 for root homepage matches

API:
```js
ExaResolver.resolveViaSearch("acme") // => { companyName:"acme", homepageUrl:"https://acme.com/", confidence: >=0.7, method:"search" }
```


