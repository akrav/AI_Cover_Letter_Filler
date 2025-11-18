# TICKET-303 — Crawl pages with robots compliance & politeness delay

## What / Why
Crawl a limited set of company pages (about, careers, blog) respecting robots.txt and rate limits.

## Outcome
- Crawler with max pages per job and delay between requests.

## Tests
- `tests/research/sprint3/ticket-303/crawler.spec.md`: simulate robots rules, ensure disallowed paths skipped; delay recorded.

## Acceptance Criteria
- Respects robots; adheres to configured page cap and delay.


