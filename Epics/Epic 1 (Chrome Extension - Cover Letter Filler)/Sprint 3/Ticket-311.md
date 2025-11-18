# TICKET-311 — Backoff & retry policy

## What / Why
Implement exponential backoff with jitter for external calls.

## Outcome
- Reusable backoff helper used by search/crawl clients.

## Tests
- `tests/research/sprint3/ticket-311/backoff.spec.md`: simulate transient failures; verify delay schedule and max attempts.

## Acceptance Criteria
- Backoff strategy documented and enforced; prevents hammering endpoints.


