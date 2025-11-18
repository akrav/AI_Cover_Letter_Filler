# TICKET-304 — Quote extraction windows & selectors

## What / Why
Extract concise quotes from crawled pages that contain relevant claims; capture context window and canonical URL.

## Outcome
- Extractor that returns `{ quoteText, url, context }`.

## Tests
- `tests/research/sprint3/ticket-304/quote_extract.spec.md`: HTML fixtures → expected quotes and context window.

## Acceptance Criteria
- Quotes are ≤ 300 chars; context includes surrounding sentences; URLs canonicalized.


