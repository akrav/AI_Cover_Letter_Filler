# TICKET-211 — Telemetry stub + opt-in switch

## What / Why
Add a minimal telemetry event queue (local only) with an explicit opt-in.

## Outcome
- Telemetry module with `emit(event)` guarded by settings.

## Tests
- `tests/extension/sprint2/ticket-211/telemetry.spec.md`: opt-in → events stored; opt-out → events dropped.

## Acceptance Criteria
- No telemetry unless enabled.
- Export events (JSON) for debugging via options page.

Status: Completed – 2025-11-18


