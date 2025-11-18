# LLM & RAG Strategy — Style Fidelity and Zero‑Hallucination

## Objectives
- Replicate the user’s writing style (voice, tone, cadence, structure) across outputs.
- Only include facts supported by captured quotes with URLs.
- Keep costs low while retaining quality and determinism.

## Models
- Generation: OpenAI gpt‑4o‑mini (default; configurable).
- Embeddings: text-embedding-3-small (cost‑efficient) for:
  - Writing sample indexing (style anchors).
  - Prior Q&A retrieval for similar prompts.

## Style Modeling
- Inputs: user writing samples + approved template(s).
- Outputs: style_profile containing:
  - Tone descriptors (formal, warm, concise).
  - Syntax/structure: sentence length distribution, paragraph cadence, transitions.
  - Lexical choices: preferred verbs, domain vocabulary, “signature” phrases to avoid overuse.
  - Formatting: bullet usage, greeting/closing patterns.
- Method:
  1) Extract paragraphs from samples; compute embeddings (vector store).
  2) Use an analysis prompt to summarize style descriptors.
  3) Store both descriptors and a handful of exemplar snippets for few‑shot steering.

## Evidence & No‑Hallucination
- For each variable, the system must present:
  - Quote (exact text) and URL.
  - Rationale linking the quote to the variable.
  - A constrained draft that only uses information derivable from quotes and the JD.
- Guardrails:
  - Reject generations containing named entities not present in evidence/JD (except generic phrasing).
  - Require at least one vetted quote or user override to accept a variable fill.

## RAG for Application Q&A
- Index: historical question/answer pairs with embeddings; normalize questions (lemmatized).
- Retrieval: top‑k similar questions; rank by semantic similarity and recency.
- Synthesis: produce a draft answer grounded in retrieved answers, marked with source references (file name/date).
- Approval: user reviews, edits, and approves. Save final answer and export to DOCX/PDF in the job folder.

## Prompting Patterns
- System: “Mimic the user’s style exactly as described in style_profile. Only include facts supported by provided quotes or the job description. If uncertain, ask for clarification. Never invent facts.”
- User: provide variables, job description, evidence list (quotes+URLs).
- Tool constraints:
  - Require a JSON schema output for the variable table before generating prose.
  - Fail closed on missing evidence (return a helpful error or request more info).

## Cost Controls
- Token budgets per job.
- Evidence strictness levels (strict → requires 2+ sources; balanced → 1; lenient → allows user‑approved manual notes).
- Model override per job/session.


