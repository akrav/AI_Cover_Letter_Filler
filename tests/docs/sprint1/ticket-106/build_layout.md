# TICKET-106 — Build layout

## Folder layout (target)
```
extension/
  manifest.json
  src/
    background/index.ts
    content/index.ts
    options/index.tsx
    popup/index.tsx
  public/icons/icon16.png
  public/icons/icon48.png
  public/icons/icon128.png
  dist/
```

## Minimal MV3 manifest.json (example)
```json
{
  "manifest_version": 3,
  "name": "AI Cover Letter Filler",
  "version": "0.1.0",
  "action": { "default_popup": "popup.html" },
  "background": { "service_worker": "background.js" },
  "permissions": ["storage", "scripting", "activeTab"],
  "host_permissions": ["<all_urls>"],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "run_at": "document_idle"
    }
  ],
  "icons": {
    "16": "icons/icon16.png",
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "options_page": "options.html"
}
```


