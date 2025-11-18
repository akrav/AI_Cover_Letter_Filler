# TICKET-313 — Robots.txt parser

Checks:
- [x] Parses allow/disallow lines under `User-agent: *`
- [x] `isAllowed(url, rules)` respects last matching rule
- [x] `getCrawlDelay(rules)` returns configured seconds or fallback


