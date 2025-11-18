# TICKET-202 — Content script injection (bootstrap only)

## What / Why
Inject a content script and post a “ready” message to the background worker. Platform detection moves to a separate ticket.

## Outcome
- Minimal content script injection.
- Background receives `{ ready: true, url }`.

## Tests
- `tests/extension/sprint2/ticket-202/injection.spec.md`: confirm script injects and background receives a ready ping.

## Acceptance Criteria
- Content script loads reliably and sends the ready message.

Status: Completed – 2025-11-18


