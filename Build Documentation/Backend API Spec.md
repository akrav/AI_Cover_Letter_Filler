# Backend API Surface (Spec)

All endpoints are REST over HTTPS, JSON bodies, JSON responses.

- Auth: Bearer token (user/session)
- Idempotency: Endpoints that trigger generation accept `Idempotency-Key` header.
- Errors: Unified error envelope (see Error Model).

## Error Model
```ts
type ApiError = {
  code:
    | 'INVALID_INPUT'
    | 'NOT_FOUND'
    | 'UNAUTHORIZED'
    | 'FORBIDDEN'
    | 'RATE_LIMITED'
    | 'UPSTREAM_TIMEOUT'
    | 'INSUFFICIENT_EVIDENCE'
    | 'COST_CAP_EXCEEDED'
    | 'CONFLICT'
    | 'INTERNAL';
  message: string;
  retryable: boolean;
  details?: Record<string, unknown>;
};
```

Retry semantics:
- RATE_LIMITED, UPSTREAM_TIMEOUT: retryable=true (exponential backoff)
- INVALID_INPUT, INSUFFICIENT_EVIDENCE: retryable=false (user action needed)
- COST_CAP_EXCEEDED: retryable=false unless cap raised

---

## POST /profile
Ingest user profile and writing samples; compute `style_profile`.

Request (Zod-like):
```ts
const ProfileIngestRequest = z.object({
  userId: z.string().uuid(),
  profile: z.object({
    fullName: z.string().min(1),
    links: z.object({
      linkedin: z.string().url().optional(),
      website: z.string().url().optional()
    }).optional()
  }),
  writingSamples: z.array(z.object({
    title: z.string(),
    content: z.string().min(50)
  })).min(1)
});
```

Response:
```ts
const ProfileIngestResponse = z.object({
  styleProfileId: z.string().uuid(),
  summary: z.object({
    tone: z.string(),
    cadence: z.string(),
    structure: z.string()
  })
});
```

## POST /research
Fetch and score evidence from the web (company + job).

Request:
```ts
const ResearchRequest = z.object({
  userId: z.string().uuid(),
  jobUrl: z.string().url().optional(),
  company: z.object({
    name: z.string().min(1),
    website: z.string().url().optional()
  }).optional(),
  maxPages: z.number().int().min(1).max(20).default(8)
});
```

Response:
```ts
const ResearchResponse = z.object({
  evidenceBundleId: z.string().uuid(),
  quotes: z.array(z.object({
    id: z.string().uuid(),
    quote: z.string(),
    url: z.string().url(),
    sourceTitle: z.string().optional(),
    score: z.number().min(0).max(1)
  }))
});
```

## POST /generate
Produce a grounded draft using variables, evidence, and style.

Request:
```ts
const GenerateRequest = z.object({
  jobSessionId: z.string().uuid(),
  variables: z.record(z.string(), z.string()),
  styleProfileId: z.string().uuid(),
  evidenceBundleId: z.string().uuid(),
  budget: z.object({
    capUsd: z.number().min(0.01).max(1.00),
    mode: z.enum(['economy','default','quality']).default('default')
  }).optional()
});
```

Response:
```ts
const GenerateResponse = z.object({
  draftId: z.string().uuid(),
  content: z.string(),
  citations: z.array(z.object({
    quoteId: z.string().uuid(),
    url: z.string().url()
  })),
  costUsd: z.number().min(0),
  modelUsed: z.object({
    generation: z.string(),
    embedding: z.string()
  })
});
```

## POST /render
Render a draft to DOCX or PDF.

Request:
```ts
const RenderRequest = z.object({
  draftId: z.string().uuid(),
  format: z.enum(['docx','pdf']),
  filenameHint: z.string().optional()
});
```

Response:
```ts
const RenderResponse = z.object({
  renderId: z.string().uuid(),
  format: z.enum(['docx','pdf']),
  downloadUrl: z.string().url()
});
```

## POST /export
Persist the rendered file to the chosen destination (local folder or cloud storage).

Request:
```ts
const ExportRequest = z.object({
  renderId: z.string().uuid(),
  destination: z.enum(['local','drive','s3']),
  path: z.string().optional()
});
```

Response:
```ts
const ExportResponse = z.object({
  exportId: z.string().uuid(),
  location: z.string() // path or URL
});
```

## POST /qa
Retrieve and/or generate answers for application questions.

Request:
```ts
const QARequest = z.object({
  jobSessionId: z.string().uuid(),
  questions: z.array(z.string()).min(1)
});
``]

Response:
```ts
const QAResponse = z.object({
  answers: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    sources: z.array(z.object({
      type: z.enum(['history','document']),
      id: z.string().uuid()
    }))
  }))
});
```


