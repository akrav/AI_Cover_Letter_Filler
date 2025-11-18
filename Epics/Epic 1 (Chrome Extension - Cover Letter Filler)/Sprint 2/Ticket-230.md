# TICKET-230 — MV3 CSP & host allowlist hardening

## What / Why
Tighten the extension’s Content Security Policy and limit host permissions beyond dev; document and test unsafe HTML never reaches UI/prompts.

## Outcome
- Updated manifest CSP; host permissions narrowed; documentation in Manifest & Permissions.

## Tests
- `tests/extension/sprint2/ticket-230/csp_allowlist.spec.md`: assert CSP/hosts; attempt to inject unsafe HTML into UI → sanitized/blocked.

## Acceptance Criteria
- Minimal host permissions in prod build; unsafe HTML blocked; docs updated.


