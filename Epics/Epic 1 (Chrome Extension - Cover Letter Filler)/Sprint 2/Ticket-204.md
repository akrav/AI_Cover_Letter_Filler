# TICKET-204 — Options page: API keys and settings (storage)

## What / Why
Create an options page to store API keys and settings (LLM model, budgets, strictness).

## Outcome
- `/extension/options/` page with form and save/load logic.

## Tests
- `tests/extension/sprint2/ticket-204/options.spec.md`: save, reload, validate fields persisted; empty fields show warnings.

## Acceptance Criteria
- Keys/settings saved to chrome.storage; redact in logs.
- Validation errors shown inline.

Status: Completed – 2025-11-18


