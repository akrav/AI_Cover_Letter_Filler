# TICKET-220 — Vite/TS build scripts and dev workflow

## What / Why
Add Vite + TypeScript build pipeline and npm scripts for dev/build, split from TICKET-201.

## Outcome
- Build scripts documented in `Build Documentation/Extension Build.md`.

## Tests
- `tests/extension/sprint2/ticket-220/build_outputs.md`: build artifacts listed and sizes recorded.

## Acceptance Criteria
- `npm run build:ext` produces artifacts; `npm run dev:ext` serves for hot-reload where supported.


