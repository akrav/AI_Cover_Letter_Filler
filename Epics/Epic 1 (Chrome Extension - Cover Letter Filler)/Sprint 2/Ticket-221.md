# TICKET-221 — Platform detection hook (Workday/Lever/Greenhouse)

## What / Why
Detect platform in the content script and send `{ platform, url }` to background, split from TICKET-202.

## Outcome
- Detection heuristics moved into a separate module; message to background on detection.

## Tests
- `tests/extension/sprint2/ticket-221/detect_platform.spec.md`: DOM fixtures per platform.

## Acceptance Criteria
- Workday/Lever/Greenhouse reliably detected on fixtures; unknown pages return `"unknown"`.

Status: Completed – 2025-11-18


