# TICKET-226 — Options: “Clear all local data”

## What / Why
Provide a single action in Options to remove all locally stored data (settings, caches, telemetry, table state), with a confirmation dialog.

## Outcome
- “Clear all data” button with confirm step; calls storage clear routines (including migrations state).

## Tests
- `tests/extension/sprint2/ticket-226/clear_all.spec.md`: seed storage → clear action → storage empty; confirmation required.

## Acceptance Criteria
- All local keys removed; success toast shown; no secrets or artifacts remain.


