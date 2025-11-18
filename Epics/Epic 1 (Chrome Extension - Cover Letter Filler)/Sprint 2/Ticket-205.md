# TICKET-205 — Permission gating and host allowlist strategy

## What / Why
Minimize permissions and scope host access to known job domains; document strategy.

## Outcome
- Updated `Build Documentation/Chrome Extension - Manifest & Permissions.md` with allowlist guidance.

## Tests
- `tests/extension/sprint2/ticket-205/permissions.spec.md`: list required permissions; assert no extras in manifest.

## Acceptance Criteria
- Manifest uses minimal permissions.
- Host permissions narrow by default; dev mode `<all_urls>` documented but disabled in prod.

Status: Completed – 2025-11-18


