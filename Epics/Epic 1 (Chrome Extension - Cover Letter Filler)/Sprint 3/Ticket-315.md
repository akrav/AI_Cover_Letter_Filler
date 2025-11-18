# TICKET-315 — Canonical URL normalizer

## What / Why
Normalize URLs (remove tracking params, enforce HTTPS, pick canonical) for evidence and homepage detection.

## Outcome
- URL normalizer utility used in resolver and quote extractor.

## Tests
- `tests/research/sprint3/ticket-315/canonicalizer.spec.md`: messy URLs → canonicalized outputs.

## Acceptance Criteria
- Deterministic canonical URLs used across artifacts.


