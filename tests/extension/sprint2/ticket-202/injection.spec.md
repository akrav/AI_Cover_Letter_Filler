# TICKET-202 — Injection bootstrap checks

Checks:
- [x] Content script uses `chrome.runtime.sendMessage` with `{ ready: true, url }`
- [x] Background listens via `chrome.runtime.onMessage.addListener`
- [x] Manifest lists `content.js` and `background.js`


