# TICKET-205 — Permissions and host allowlist checks

Expectations:
- [x] permissions limited to: storage, scripting, activeTab (downloads optional later)
- [x] host_permissions allowlist (no `<all_urls>` in production):
  - `*://*.workday.com/*`
  - `*://*.lever.co/*`
  - `*://*.greenhouse.io/*`
  - `*://*.ashbyhq.com/*`
- [x] content_scripts matches restricted to same allowlist


