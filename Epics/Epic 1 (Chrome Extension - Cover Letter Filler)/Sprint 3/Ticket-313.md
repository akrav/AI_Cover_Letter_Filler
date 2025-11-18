# TICKET-313 — Robots.txt allow/deny parser

## What / Why
Parse robots.txt and return allow/deny for candidate paths to guide the crawler.

## Outcome
- Parser with caching; integrates with crawler.

## Tests
- `tests/research/sprint3/ticket-313/robots_parser.spec.md`: sample robots files → expected rules applied.

## Acceptance Criteria
- Disallowed paths skipped; user can override in dev mode.


