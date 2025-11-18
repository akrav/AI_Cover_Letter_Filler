# TICKET-110 — Export examples

## Example filenames
- "Adam's Acme Corp Cover Letter.docx"
- "Adam's Acme Corp Cover Letter.pdf"

## Evidence bundle outline
```json
{
  "job_session_id": "a7b8c9d0-1234-5678-9abc-def012345678",
  "variables": [
    { "key": "company_name", "value": "Acme Corp" },
    { "key": "position_title", "value": "Senior ML Engineer" }
  ],
  "citations": [
    { "variable_key": "company_mission", "quote": "Our mission is ...", "url": "https://acme.com/about" }
  ],
  "generated_at": "2025-11-18T00:00:00Z"
}
```

## Directory Picker vs downloads (decision table)
| Condition | Action |
|---|---|
| Has directory handle (granted) | Save to folder silently |
| Has directory handle (lost permission) | Prompt to re-grant permission |
| No directory handle | Trigger downloads dialog (`saveAs: true`) |
| Offline mode | Queue export and write when restored |


