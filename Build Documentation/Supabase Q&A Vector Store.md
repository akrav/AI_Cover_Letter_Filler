# Supabase Q&A Vector Store (MCP)

Schema:
- Table: `qa_pairs` (id uuid, question text, question_norm text, answer text, company text, date date)
- Table: `embeddings` (id uuid, ref_table text, ref_id uuid, embedding vector(1536))

Workflow:
1) Normalize questions (`QANormalize.normalizeQuestion`)
2) Embed questions (OpenAI `text-embedding-3-small`) and upsert rows
3) Query by cosine similarity for retrieval (top‑k)

MCP Notes:
- Use Supabase MCP to apply migrations and generate TS types
- Keep `vector` extension enabled


