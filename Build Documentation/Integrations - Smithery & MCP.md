# Integrations — Smithery & MCP

We will leverage Smithery to give the agent access to research and browsing tools while keeping context centralized.

## Planned Integrations (via Smithery)
- Exa Search: fast search + page crawling to discover company facts, quotes, and URLs.
- Browserbase: render and interact with dynamic web pages (JS-heavy sites), capture exact quotes.
- Optional: Gmail/GDrive for saving artifacts or emailing drafts in future phases.
- Optional: Supabase MCP — connect our Supabase project to assistants for schema, SQL, and storage access.

Reference: `https://smithery.ai/`

## Research Flow (JD → queries → results → quotes)
1) Inputs:
   - Job description (JD), company name/domain (if available), role title.
2) Query generation:
   - Produce scoped queries: `<company> mission`, `about <company>`, `<company> press`, `<company> values`, `<company> careers`.
3) Search (Exa):
   - Fetch top‑k results (k≈10) with metadata (title, URL, snippet, date).
   - Filter by domain allowlist (company site, reputable press) and freshness (≤24 months).
4) Fetch:
   - Use Exa page fetch for static pages.
   - Fallback to Browserbase render for dynamic pages (JS dependent).
5) Extraction:
   - Extract candidate quotes (≤300 chars) with canonical URL; prefer sections near headings like “Mission”, “Values”.
   - Normalize URL (canonical if provided), strip tracking params.
6) Scoring:
   - Relevance (embedding similarity to variable description), recency (newer is better), authority (domain score).
   - Score = 0.5·relevance + 0.3·authority + 0.2·recency (0–1).
7) Dedup & caching:
   - Deduplicate by normalized quote text hash and canonical URL.
   - Cache page snapshots per job_session to avoid re‑fetch; TTL 7 days.
8) Governance:
   - Respect robots.txt (deny → skip); crawl delay 2–5s between same‑domain requests.
   - Rate limit external calls; exponential backoff on 429/5xx.
9) Persistence:
   - Store quotes as `variable_evidence` with `quote`, `evidence_url`, `source_title`, `score`.

## Usage Model
- Backend calls Smithery server endpoints as tools from a single MCP connection (one catalog).
- Tool outputs (quotes, URLs, screenshots) are persisted alongside evidence records for each variable.
- Evidence includes a verbatim snippet and canonical URL to support “no‑hallucination” constraints.

## Governance
- Rate-limit external calls; retry with backoff.
- Respect robots.txt and add a politeness delay for crawling.
- Cache page snapshots for a job session to keep costs down.

## Supabase MCP (optional)
Repository: `https://github.com/supabase-community/supabase-mcp`

What it provides:
- Tool groups like `database`, `docs`, `development`, `functions`, `branching`, and `storage` that assistants can call.
- Ability to scope to a specific project (`project_ref`) and enable read-only behavior.

Setup (high level):
1) Create a Supabase project (enable `pgvector`).
2) Obtain credentials:
   - Either `SUPABASE_ACCESS_TOKEN` (account scope) or project-scoped `SUPABASE_URL` + keys.
3) Run the Supabase MCP server (per README):
   - Enable tool groups you need (e.g., `features=database,docs`).
   - Prefer read-only until development stabilizes.
4) Register the MCP server in your agent (Cursor/Smithery) so tools appear in the catalog.

Security recommendations (from the project docs):
- Prefer non-production projects.
- Consider read-only mode where possible.
- Narrow enabled tool groups to reduce attack surface.


