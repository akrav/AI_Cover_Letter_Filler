# TICKET-606 — Q&A field injection on platforms

## What / Why
Detect Q&A textareas/questions on platforms and inject approved answers.

## Outcome
- Injection helpers with mapping from questions to fields.

## Tests
- `tests/ui/sprint6/ticket-606/qa_injection.spec.md`: DOM fixtures → expected fields populated with Final answers.

## Acceptance Criteria
- Injection succeeds on fixtures; avoids overwriting unrelated fields.


