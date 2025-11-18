# Testing Strategy

## Categories
- Unit tests: parsers, resolvers, scorers.
- Integration tests: research → evidence extraction → variable candidates.
- UI tests: approval table behavior, state transitions, injection on job pages (DOM fixtures).
- E2E smoke: job page → approval → render → export.
- Docs/fixtures tests: goldens for prompts, evidence JSON, style profiles.

## Conventions
- Place test docs under `tests/docs/<sprint>/ticket-<id>/...`
- Place code tests later under `tests/<area>/...` as implementation lands.
- Keep goldens small and readable; prefer JSON + markdown.

## Continuous Testing
- For each ticket: write tests first (or fixtures for doc tickets), run, and update until green.


