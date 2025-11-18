# TICKET-305 — Evidence scoring (relevance, recency, authority)

## What / Why
Score evidence to prioritize the most relevant and trustworthy quotes.

## Outcome
- Scorer with weighted components and tunable weights.

## Tests
- `tests/research/sprint3/ticket-305/scoring.spec.md`: sample evidence set → expected order and scores within tolerance.

## Acceptance Criteria
- Top results favor on-domain, recent, and semantically relevant quotes.


