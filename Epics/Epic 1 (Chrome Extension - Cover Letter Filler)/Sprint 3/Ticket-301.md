# TICKET-301 — Exa search client (retry, rate limit, stubs)

## What / Why
Add an Exa client wrapper with retries, backoff, and rate-limit guard. Start with stub responses.

## Outcome
- Exa client module with `search(query): Results`.

## Tests
- `tests/research/sprint3/ticket-301/exa_client.spec.md`: stub results, retry scenarios, backoff timings (documented).

## Acceptance Criteria
- Deterministic stubs for tests; retry policy documented.


