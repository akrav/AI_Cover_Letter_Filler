# TICKET-411 — Textarea injection on supported platforms

## What / Why
Inject the approved Final cover letter into the cover letter textarea or upload slot on supported platforms.

## Outcome
- Injection helpers per platform with field detection and focus.

## Tests
- `tests/ui/sprint4/ticket-411/injection.spec.md`: DOM fixtures → expected textarea populated; upload flow stubbed if required.

## Acceptance Criteria
- Injection succeeds on fixtures for Workday/Lever/Greenhouse without breaking the page.


