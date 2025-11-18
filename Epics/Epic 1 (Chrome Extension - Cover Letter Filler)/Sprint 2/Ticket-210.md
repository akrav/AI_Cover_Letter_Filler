# TICKET-210 — Storage schema versioning and migrations

## What / Why
Define extension storage keys and introduce a simple versioned migration system.

## Outcome
- Migration runner and initial schema with version `1`.

## Tests
- `tests/extension/sprint2/ticket-210/storage_migration.spec.md`: simulate old -> new migrations, assert data retained.

## Acceptance Criteria
- Migrations are idempotent; failures logged and recoverable.
- Version stored and reported in options.

Status: Completed – 2025-11-18


