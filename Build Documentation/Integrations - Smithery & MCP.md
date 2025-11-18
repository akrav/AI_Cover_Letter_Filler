# Integrations — Smithery & MCP

We will leverage Smithery to give the agent access to research and browsing tools while keeping context centralized.

## Planned Integrations (via Smithery)
- Exa Search: fast search + page crawling to discover company facts, quotes, and URLs.
- Browserbase: render and interact with dynamic web pages (JS-heavy sites), capture exact quotes.
- Optional: Gmail/GDrive for saving artifacts or emailing drafts in future phases.
- Optional: Supabase MCP — connect our Supabase project to assistants for schema, SQL, and storage access.

Reference: `https://smithery.ai/`

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


