# TICKET-209 — UI panel scaffold and toggle

## What / Why
Add a lightweight in-page panel to start/stop the assistant, show detection status.

## Outcome
- Panel injected by content script; toggle button and status text.

## Tests
- `tests/extension/sprint2/ticket-209/panel.spec.md`: render/unrender panel; CSS collision checks minimal.

## Acceptance Criteria
- Panel can be toggled; persists state per tab.
- No visual overlap with core page elements in fixtures.


