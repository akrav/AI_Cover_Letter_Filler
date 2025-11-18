# TICKET-229 — Offline / cached-only mode toggle

## What / Why
Add an Options toggle to operate without network calls, using only cached evidence and RAG data; warn when freshness is low.

## Outcome
- Toggle stored; generation/research paths respect offline mode and surface warnings.

## Tests
- `tests/extension/sprint2/ticket-229/offline_mode.spec.md`: offline enabled → no network; cached evidence used; warnings shown.

## Acceptance Criteria
- No outbound calls when enabled; graceful degradation paths present.


