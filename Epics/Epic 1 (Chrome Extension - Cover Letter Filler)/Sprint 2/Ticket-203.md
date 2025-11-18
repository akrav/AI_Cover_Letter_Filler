# TICKET-203 — Background service worker messaging bus

## What / Why
Set up a robust message bus between content scripts and the background worker.

## Outcome
- Request/response pattern with timeouts and error handling.

## Tests
- `tests/extension/sprint2/ticket-203/messaging.spec.md`: simulate content→background calls, expect timeouts on no response.

## Acceptance Criteria
- Messages round-trip with correlation IDs.
- Timeouts and errors surfaced to content script cleanly.


