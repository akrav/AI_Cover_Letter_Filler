# TICKET-230 — CSP & host allowlist hardening

Checks:
- [x] Manifest includes `content_security_policy.extension_pages` with `script-src 'self'; object-src 'self'`
- [x] Host permissions restricted to Workday/Lever/Greenhouse/Ashby (no `<all_urls>` in prod)
- [x] No unsafe HTML injection in UI (use `textContent`, not `innerHTML`)


