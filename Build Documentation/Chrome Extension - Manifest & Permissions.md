# Chrome Extension — Manifest & Permissions (MV3)

## Manifest
- manifest_version: 3
- name: AI Cover Letter Filler
- action: popup (optional)
- background: service_worker (TypeScript compiled to JS)
- content_scripts: matches for major job boards/app portals; all_urls toggle for dev
- options_page: settings for API keys, model selection, privacy toggles

## Required Permissions
- "activeTab": read the current page as needed
- "scripting": inject UI/panels and content scripts
- "storage": save tokens/settings locally (consider encrypt-at-rest pattern)
- "downloads": export DOCX/PDF reliably
- "tabs": basic tab metadata for context (optional, if needed)
- Host permissions: narrow allowlist for known job domains; `<all_urls>` in dev
- Optional: "clipboardWrite" (if we support copy-to-clipboard instead of injection)

### Allowlist (production)
- `*://*.workday.com/*`
- `*://*.lever.co/*`
- `*://*.greenhouse.io/*`
- `*://*.ashbyhq.com/*`

Dev mode:
- You may temporarily use `<all_urls>` during early development, but switch to the allowlist for production builds.

## File Save Strategy
- Primary: File System Access API (showDirectoryPicker) from Options/Approval UI to pick a folder.
- Fallback: chrome.downloads.download with `saveAs` suggested filename; user confirms location.

## Security Notes
- Never store provider secrets in code; use `.env.example` guidance and options UI for user-provided keys.
- Prefer per-session ephemeral tokens when possible.
- Avoid broad host permissions in production; document domain allowlist.

## Content Security Policy (MV3)
- Use a restrictive CSP for extension pages:
  - `script-src 'self'`
  - `object-src 'self'`
- Do not use inline scripts or `eval`.
- Sanitize any dynamic content rendered in UI components.


