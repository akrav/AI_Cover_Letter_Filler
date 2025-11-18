# TICKET-227 — Retention window for local data

## What / Why
Allow users to choose a retention window (e.g., 30/90 days) for cached evidence, job sessions, writing samples indexes, and QA caches.

## Outcome
- Retention setting in Options; background job to prune old entries on interval.

## Tests
- `tests/extension/sprint2/ticket-227/retention.spec.md`: seed timestamps → prune according to setting → expected remaining.

## Acceptance Criteria
- Retention applies to relevant keys; default reasonable (e.g., 90 days); documented in Options.


