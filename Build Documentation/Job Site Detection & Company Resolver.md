# Job Site Detection & Company Resolver

## Supported Job Platforms (initial)
- Workday, Lever, Greenhouse (aka Greenhouse.io), Ashby, Workable.

## Detection Heuristics
- URL patterns: host contains known platforms (e.g., `*.myworkdayjobs.com`, `jobs.lever.co`, `boards.greenhouse.io`, `jobs.ashbyhq.com`, `apply.workable.com`).
- DOM markers: meta generator tags, hidden platform IDs, known CSS class prefixes.
- Fallback: text cues in page like “Powered by …”.

## JD Extraction
- Platform-specific selectors for title, location, description HTML.
- Normalize to markdown/plain text; strip boilerplate (“About us”, legal, benefits) behind toggles.
- Tests: for each platform fixture, assert extraction of title, company (if present), location, and body text length thresholds.

## Company Name & Website Resolution
- Prefer explicit company field from the platform if exposed.
- If not present, derive from:
  - Subdomain mapping (e.g., `company.myworkdayjobs.com` → `company`).
  - Logo/link anchors pointing to external domain (prefer corporate `.com/.io/.ai`).
  - Footer links (“Careers”, “About”).
- Exa search fallback:
  - Query: `"<job title>" site:linkedin.com/company OR "<company>" official site`.
  - Pick the most authoritative domain (homepage) by scoring (brand match, HTTPS, no track params).
- Tests: mapping table fixtures → expected `company_name`, `company_domain`.

## Crawl Strategy (Company Site)
- Entry points: homepage, `/about`, `/careers`, `/blog`, `/press`, `/news`, product overview.
- Respect robots.txt, obey politeness delay, limit to N pages per job (configurable).
- Capture exact quotes and canonical URLs; store evidence snapshots.
- Tests: HTML fixtures to extract quotes with source URLs; verify dedup and canonicalization.

## Output Contracts
- `company_resolve.json`:
  - `{ companyName, homepageUrl, confidence, method: "platform|mapping|search" }`
- `jd_extract.json`:
  - `{ title, location?, descriptionMarkdown }`


