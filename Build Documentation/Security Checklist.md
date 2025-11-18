# Security & Permissions Checklist

## Permissions (MV3)
- Request only what we need:
  - `permissions`: `storage`, `scripting`, `activeTab`, `downloads` (fallback)
  - `host_permissions`: platform allowlist (Workday/Lever/Greenhouse/Ashby/etc.) — minimize wildcards
- Justification:
  - `activeTab`: inject content script only when user activates
  - `scripting`: programmatic injection
  - `storage`: user settings and cached data (non-sensitive)
  - `downloads`: export fallback

## Host permission minimization
- Default to no `<all_urls>`. Add hosts as detection confirms platform.
- Gate privileged actions behind explicit user gestures.
- Consider optional host permissions with runtime request.

## Tokens & secrets
- Do not store provider secrets in the extension. Prefer backend proxy or user-provided keys.
- If user keys are stored, use `chrome.storage.session` where possible; otherwise `chrome.storage.local` with minimal scope and clear-on-logout.
- Never log tokens. Redact in error reports.

## PII handling
- Do not log PII (name, email, resumes) in console or telemetry.
- Local processing where possible; when sending to backend, encrypt in transit (HTTPS) and avoid storing raw PII.
- Provide a “Clear all local data” option.

## Evidence provenance (mandatory)
- Every approved variable must have:
  - Quote (verbatim)
  - URL (canonical)
  - Rationale
- Approve toggle disabled without provenance.

## CSP & sandbox
- MV3 CSP prohibits inline scripts — bundle all scripts.
- Avoid `eval` and dynamic code.
- Sanitize any HTML rendering (approval panel) and avoid unsafe innerHTML.

## Data retention
- Respect retention windows for cached pages and local data (configurable).
- Provide user controls to purge data.

## Review items (per release)
- [ ] permissions scope reviewed
- [ ] host_permissions list reviewed
- [ ] tokens redaction verified
- [ ] PII redaction verified
- [ ] provenance checks enforced
- [ ] CSP checks (no inline/eval)
- [ ] data retention policy verified


