# Architecture — AI Cover Letter Filler (Chrome Extension MVP)

## Overview
Goal: A Chrome Extension that fills a user’s cover letter template using their own writing style, pulling only verifiable facts from the job description and the company’s site. The extension creates an approval table with quotes, URLs, rationale, a draft, and a final in‑style fill for each variable before exporting DOCX/PDF to a user‑chosen folder.

Key inspirations and tools:
- Reference UX inspiration: `https://simplify.jobs/preferences`
- Smithery integrations (Exa search, Browserbase, Gmail MCP, etc.): `https://smithery.ai/`
- Workflow reference chat: `https://chatgpt.com/share/691b9cc1-5f44-8003-98d5-482e4ee822d3`

## High-Level System
- Chrome Extension (Manifest V3)
  - Content script: detects job application pages, extracts job description, finds cover letter inputs, injects UI panel.
  - Background service worker: coordinates research jobs, calls backend, manages downloads, telemetry.
  - Options page: sign in, connect Supabase, choose LLM model, toggles, privacy.
  - Approval modal: variable evidence table (Quote, URL, Rationale, Draft, Final in‑style).
- Backend API (Node/TypeScript; deploy anywhere)
  - Endpoints: profile/style analysis, research & evidence generation, template rendering, export.
  - RAG store (Supabase pgvector) of previous Q&A and writing samples.
  - Storage: metadata and artifacts (JSON/HTML/MD previews).
- Supabase
  - Postgres + pgvector: profiles, writing_samples, templates, style_profile, jobs, variables, evidence, outputs.
  - Auth (if used) and object storage (optional) for artifacts.
- LLM Provider
  - Default: OpenAI “mini” tier for cost efficiency (e.g., gpt‑4o‑mini) with option to switch.
  - Embeddings: text-embedding-3-small (cost-effective) for RAG.
- Web Research
  - Exa Search (via Smithery) for company info and precise source snippets.
  - Browserbase (via Smithery) or lightweight crawler for site snapshots when needed.

## Flow (Happy Path)
1) User opens a job application page; content script detects site and extracts JD + company domain.
2) Extension sends context (JD, company) to backend.
3) Backend uses Exa (and optional crawl) to gather facts → build evidence candidates per variable.
4) LLM drafts fill proposals constrained to cited quotes; never introduce uncited facts.
5) Extension shows Approval Table for each variable:
   - Variable Key | Quote | URL | Rationale | Draft | Final (in user style)
6) User reviews/edits/approves; backend renders template with Final values.
7) Export DOCX + PDF. Extension prompts for a folder (Directory Picker) and saves:
   - Folder: `<Company Name>/`
   - Files: `<UserFirstName>'s <CompanyName> Cover Letter.docx` and `.pdf`
8) For application Q&A fields, reuse RAG store of past answers → propose an answer with citations → approval → save alongside cover letter.

## Core Constraints
- No hallucinations: all claims tied to a captured Quote + URL.
- User style fidelity: style profile constructed from user samples; generation must respect it.
- Approval gate: nothing is written until user approves each variable.
- Reproducibility: evidence and prompts stored per job session.

## Component Responsibilities
- Content Script
  - Site detection, JD extraction, textarea detection for cover letter and Q&A fields.
  - Injects UI (panel/modal) to show variable table and controls.
- Background Worker
  - Message hub; orchestrates backend calls; manages downloads/exports.
  - Caches per‑tab/company context; rate-limits research tasks.
- Options Page
  - Sign-in / API keys (stored via chrome.storage with encryption caveats).
  - Model selection, cost caps, evidence strictness level, approval policy.
- Backend
  - Profile ingestion: parse DOCX templates, index writing samples, compute style descriptors.
  - Research: Exa/Browserbase search, snippet selection, evidence scoring, de-duplication.
  - Generation: style‑constrained, evidence‑constrained fills with quote‑backed rationales.
  - Rendering: template engine for DOCX/HTML/PDF; artifact persistence.
- Supabase
  - Tables: users, profiles, style_profile, writing_samples, templates, jobs, variables, variable_evidence, outputs, qa_pairs (RAG).
  - Vector index: embeddings for writing samples and Q&A.

## Tech Decisions (initial)
- Extension build: Vite + TypeScript + MV3.
- Backend: Node/Express (or Next.js API routes) + Zod schemas.
- LLM: OpenAI gpt‑4o‑mini (default) with configurable model id; embeddings: text-embedding-3-small.
- Template rendering: docx (Pavel’s docx library) for DOCX; html‑to‑pdf (e.g., html2pdf or pdf‑lib) for PDF.
- Directory selection: File System Access API (showDirectoryPicker) with Downloads API fallback.

## Risk & Mitigations
- Detection variance across job sites → layered heuristics; manual override UI.
- Broken links or paywalled sources → evidence fallback, user-supplied links, and retry controls.
- Style drift → style eval rubric + small reference snippets regenerated from user RAG.
- Cost creep → per‑job token budget, model override, and evidence strictness settings.

## References
- Simplify Preferences (inspiration): `https://simplify.jobs/preferences`
- Smithery (skills/integrations): `https://smithery.ai/`
- Reference chat: `https://chatgpt.com/share/691b9cc1-5f44-8003-98d5-482e4ee822d3`


