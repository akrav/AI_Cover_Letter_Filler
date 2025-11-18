-- TICKET-101: Supabase schema draft for core entities
-- Requires: pgcrypto (for gen_random_uuid), pgvector (for embedding columns)
-- Safe to re-run: uses IF NOT EXISTS where applicable

BEGIN;

CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS vector;

-- users: primary identity record
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- profiles: user profile details (1-1 with users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  bio text,
  resume_text text,
  linkedin_url text,
  website_url text,
  location text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- writing_samples: text samples for style modeling
CREATE TABLE IF NOT EXISTS public.writing_samples (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  embedding vector(1536), -- pgvector
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS writing_samples_user_id_idx ON public.writing_samples(user_id);
CREATE INDEX IF NOT EXISTS writing_samples_embedding_ivfflat_idx
  ON public.writing_samples
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- templates: reusable prompt/output structures
CREATE TABLE IF NOT EXISTS public.templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  content text NOT NULL,
  embedding vector(1536),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS templates_user_name_unique
  ON public.templates(user_id, name);
CREATE INDEX IF NOT EXISTS templates_embedding_ivfflat_idx
  ON public.templates USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- style_profile: derived style representation for a user
CREATE TABLE IF NOT EXISTS public.style_profile (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
  writing_sample_id uuid REFERENCES public.writing_samples(id) ON DELETE SET NULL,
  style_json jsonb NOT NULL,
  embedding vector(1536),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS style_profile_embedding_ivfflat_idx
  ON public.style_profile USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- companies: hiring organizations
CREATE TABLE IF NOT EXISTS public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  domain text,
  website_url text,
  careers_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- jobs: individual job postings
CREATE TABLE IF NOT EXISTS public.jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE SET NULL,
  external_job_id text,
  title text NOT NULL,
  location text,
  description text,
  job_url text,
  embedding vector(1536),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS jobs_company_id_idx ON public.jobs(company_id);
CREATE INDEX IF NOT EXISTS jobs_embedding_ivfflat_idx
  ON public.jobs USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- job_sessions: a user's application attempt to a job
CREATE TABLE IF NOT EXISTS public.job_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'draft', -- draft|approved|exported
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS job_sessions_user_id_idx ON public.job_sessions(user_id);
CREATE INDEX IF NOT EXISTS job_sessions_job_id_idx ON public.job_sessions(job_id);

-- variables: key/value-style variables populated per job_session
CREATE TABLE IF NOT EXISTS public.variables (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_session_id uuid NOT NULL REFERENCES public.job_sessions(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
  key text NOT NULL,
  value text,
  value_type text NOT NULL DEFAULT 'string', -- string|number|date|boolean
  description text,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS variables_session_key_unique
  ON public.variables(job_session_id, key);
CREATE INDEX IF NOT EXISTS variables_user_id_idx ON public.variables(user_id);

-- variable_evidence: citations supporting variable values
CREATE TABLE IF NOT EXISTS public.variable_evidence (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variable_id uuid NOT NULL REFERENCES public.variables(id) ON DELETE CASCADE,
  quote text NOT NULL,
  evidence_url text NOT NULL,
  source_title text,
  source_type text, -- press|blog|site|linkedin|news|other
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS variable_evidence_variable_id_idx
  ON public.variable_evidence(variable_id);

-- outputs: generated artifacts (cover letters, etc.)
CREATE TABLE IF NOT EXISTS public.outputs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_session_id uuid NOT NULL REFERENCES public.job_sessions(id) ON DELETE CASCADE,
  content text NOT NULL,
  format text NOT NULL DEFAULT 'markdown', -- markdown|html|docx|pdf
  version int NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS outputs_job_session_id_idx ON public.outputs(job_session_id);

-- qa_pairs: historical Q&A (embedding-backed for retrieval)
CREATE TABLE IF NOT EXISTS public.qa_pairs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_session_id uuid REFERENCES public.job_sessions(id) ON DELETE CASCADE,
  question text NOT NULL,
  answer text,
  embedding vector(1536),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS qa_pairs_job_session_id_idx ON public.qa_pairs(job_session_id);
CREATE INDEX IF NOT EXISTS qa_pairs_embedding_ivfflat_idx
  ON public.qa_pairs USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- embeddings: generic embeddings store for any entity
CREATE TABLE IF NOT EXISTS public.embeddings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL, -- e.g., 'writing_sample','template','job','qa_pair'
  entity_id uuid NOT NULL,
  embedding vector(1536) NOT NULL,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS embeddings_entity_idx ON public.embeddings(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS embeddings_embedding_ivfflat_idx
  ON public.embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

COMMIT;


