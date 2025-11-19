# Pipeline Runner (Node E2E)

Script: `scripts/run_pipeline.mjs`

Usage:
```
node scripts/run_pipeline.mjs \\
  --url "https://jobs.ashbyhq.com/starbridge/117e56db-e1b7-4f83-bc18-44af88efa04e/application?utm_source=Simplify" \\
  --out "./out" \\
  --firstName "Adam" \\
  --styleDir "./samples/style" \\
  --qaManifest "./tests/style/fixtures/dataset_manifest.json" \\
  --topK 5
```

Outputs (in `--out`):
- `<FirstName>'s <CompanyName> Cover Letter.docx`
- `<FirstName>'s <CompanyName> Cover Letter.pdf`
- Optional: `Q&A.docx` and `Q&A.pdf` if a QA manifest is provided
- `evidence.json` bundle with quotes, style profile, and QA results

Notes:
- Uses jsdom + shared modules for extraction, generation, style rewrite, naming, and export.
- Supabase sync is optional and not required for local runs.


