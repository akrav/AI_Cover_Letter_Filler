# TICKET-111 — Security checklist (auditable)

## Permissions (justify & test)
| Permission | Why | Test |
|---|---|---|
| storage | Persist user settings locally | Verify no secrets stored; can clear |
| scripting | Programmatic injection | Only on user gesture |
| activeTab | Act on current page | Required for on-demand injection |
| downloads | Export fallback | Only when Directory Picker unavailable |

## Host permissions minimization
- [ ] No `<all_urls>` in production
- [ ] Platform allowlist only
- [ ] Optional permissions flow tested

## Tokens & secrets
- [ ] No secrets bundled
- [ ] Tokens redacted in logs
- [ ] Clear-on-logout verified

## PII handling
- [ ] No PII in console/telemetry
- [ ] HTTPS enforced backend
- [ ] “Clear all local data” present

## Provenance
- [ ] Approve disabled without Quote + URL
- [ ] Evidence bundle includes rationale

## CSP
- [ ] No inline scripts
- [ ] No eval / dynamic code
- [ ] Sanitized HTML in panel


