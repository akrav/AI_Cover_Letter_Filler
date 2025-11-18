# TICKET-107 — Research pipeline & evidence rules (Exa/Browserbase)

## What / Why
Define how we search, crawl, and extract quotes/URLs with governance (rate limits, robots, caching).

## Outcome
Expand `Build Documentation/Integrations - Smithery & MCP.md` with specific flow charts and constraints.

## Tests
- Add `tests/docs/sprint1/ticket-107/research_flow.md` with a step-by-step sample: JD → queries → results → quotes.
- Include a mock evidence JSON example with Quote + URL + rationale.

## Acceptance Criteria
- Flow: JD → queries → Exa results → optional Browserbase render → quote extraction.
- Evidence scoring (relevance, recency, authoritative domain) documented.
- Caching strategy and retry policy documented.


