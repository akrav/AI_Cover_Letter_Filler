# Epic 1 — Chrome Extension: AI Cover Letter Filler (MVP)

> One‑liner: A Chrome Extension that fills a user’s cover letter template with company‑specific lines in the user’s exact writing style, grounded by verifiable quotes and links, and exported as DOCX/PDF to a chosen folder.

## Goals
1) Respect the user’s writing style and voice via a profile built from their samples.
2) Zero‑hallucination: every claim backed by a Quote + URL and user approval.
3) Smooth UX on major job sites; exports saved into user‑chosen company folder.
4) Extend the same approach to application Q&A using RAG of the user’s prior answers.

## Non‑Goals (MVP)
- Chrome Web Store publishing and monetization.
- Multi‑provider orchestration beyond a single LLM (configurable later).
- Enterprise SSO or team workflows.

## Milestones
- Sprint 1: Profile & style modeling docs/spec; data model and pipelines defined.
- Sprint 2: MV3 scaffold; detection, options page, and approval UI skeleton.
- Sprint 3: Research pipeline (Exa/Browserbase), evidence scoring, approval table end‑to‑end.
- Sprint 4: Generation, approval gating, rendering to DOCX/PDF, folder save flow.
- Sprint 5: Style similarity evaluation, acceptance thresholds, and QA benchmarks.
- Sprint 6: Q&A RAG with citations and export; multi‑site injection polish.

## Acceptance Criteria (Epic)
- User can create a profile from writing samples and a DOCX template; style descriptors stored.
- On a job page, extension generates evidence-backed fills; user approves each variable.
- Exports DOCX + PDF to a chosen folder named after the company.
- Optional Q&A answers produced with citations and approval, saved alongside the cover letter.

## References
- Inspiration: `https://simplify.jobs/preferences`
- Smithery integrations: `https://smithery.ai/`
- Workflow reference chat: `https://chatgpt.com/share/691b9cc1-5f44-8003-98d5-482e4ee822d3`


