# Extension Build — MV3 structure and workflow

Decision: Vite + TypeScript + MV3, multi‑entry build (background, content scripts, options, popup).

## Directory structure (target)
```
extension/
  manifest.json
  src/
    background/
      index.ts
    content/
      index.ts
    options/
      index.tsx
      OptionsApp.tsx
    popup/
      index.tsx
      PopupApp.tsx
    shared/
      messaging.ts
      types.ts
  public/
    icons/
      icon16.png
      icon48.png
      icon128.png
  dist/
```

## Vite config (conceptual)
- Multi‑entry: background, content, options, popup
- Outputs to `extension/dist`
- Copies `manifest.json` and `public/` into `dist`

## NPM scripts (planned)
- `dev:ext`: watch build into `extension/dist` with HMR for options/popup (stubbed for now)
- `build:ext`: production build to `extension/dist` (copies assets; Vite to be added)
- `zip`: package `extension/dist` into `extension.zip` (later)

## Dev workflow
1. Run `npm run dev` to watch and rebuild assets.
2. Load unpacked extension from `extension/dist` in Chrome.
3. For content script changes, reload tab or use simple hot‑reload (message‑based).
4. For options/popup, Vite HMR works with MV3 pages via `chrome-extension://` served assets.

## Notes
- Background script is a MV3 service worker (TypeScript → JS).
- Strict CSP: all scripts must be bundled (no inline scripts).
- Messaging bus between content ⇄ background ⇄ options/popup via `chrome.runtime.sendMessage`.


