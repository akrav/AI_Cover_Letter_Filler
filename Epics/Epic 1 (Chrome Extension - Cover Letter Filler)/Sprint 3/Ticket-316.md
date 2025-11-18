# TICKET-316 — HTML sanitizer for crawled content

## What / Why
Sanitize crawled HTML/snippets to an allowlist of tags/attributes; strip scripts and unsafe elements before evidence extraction and prompting.

## Outcome
- Sanitizer utility used by crawler and quote extractor; outputs safe Markdown/plain text.

## Tests
- `tests/research/sprint3/ticket-316/sanitizer.spec.md`: malicious fixtures → sanitized output; scripts/styles removed.

## Acceptance Criteria
- Only allowlisted tags/attrs remain; sanitizer is mandatory for all crawled inputs.


