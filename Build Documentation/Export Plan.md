# Export Plan — DOCX/PDF and folder workflow

## Libraries (decision)
- DOCX: `docx` (npm package) — generate Word documents from HTML/structured content; good MV3 compatibility via bundling.
- PDF:
  - Primary: render HTML in an offscreen document and use `chrome.print()` → Save as PDF (user action), or
  - Backend-assisted: render HTML server-side (Puppeteer) and return PDF blob (later phase), or
  - Client: `pdf-lib` to compose from HTML (limited layout fidelity; acceptable for MVP).

Decision: MVP ships DOCX via `docx` and PDF via `pdf-lib` (acceptable fidelity), with an option to upgrade to server-side render later.

## Filename convention
`<UserFirstName>'s <CompanyName> Cover Letter.{docx,pdf}`

Sanitization:
- Replace invalid characters `[/\\\\?%*:|\"<>]` with `_`
- Collapse whitespace; trim

## Directory Picker vs Downloads fallback
- Directory Picker (preferred):
  - Use the File System Access API from the options page to select a base folder.
  - Persist a handle (via `storage`) with user consent.
  - On export, write directly to the chosen folder (if permission retained).
- Downloads fallback:
  - Use `chrome.downloads.download` with `saveAs: true` to prompt for location.
  - If base folder is set, pre-fill filename and let user confirm.

Decision table:
| Condition | Action |
|---|---|
| Has directory handle (granted) | Save to folder silently |
| Has directory handle (lost permission) | Prompt to re-grant permission |
| No directory handle | Trigger downloads dialog (`saveAs: true`) |
| Offline mode | Queue export and write when permission/connection restored |

## Evidence bundle (saved alongside exports)
- `evidence.json` structure:
```json
{
  "job_session_id": "uuid",
  "variables": [{ "key": "company_mission", "value": "..." }],
  "citations": [{ "variable_key": "company_mission", "quote": "...", "url": "https://..." }],
  "generated_at": "ISO-8601"
}
```

## Render pipeline (MVP)
1) Render Markdown → HTML (style-preserving template).
2) DOCX: convert HTML nodes to `docx` elements; embed basic styles.
3) PDF: render HTML to canvas and write via `pdf-lib` pages.
4) Save using Directory Picker or downloads fallback.


