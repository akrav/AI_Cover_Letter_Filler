# TICKET-103 — Style rubric examples

## Sample A (expected: formal, short, narrative, bullets_low)
Text:
> I am writing to express interest in the Senior ML Engineer role. I have led production deployments and improved latency significantly. I look forward to contributing to your mission.

Expected descriptors:
```json
{
  "tone": "formal",
  "cadence": { "bucket": "short" },
  "structure": { "pattern": "narrative" },
  "formatting": { "bullets": "low" },
  "lexicon": { "register": "technical" }
}
```

## Sample B (expected: friendly, medium, list_heavy, bullets_high)
Text:
> I'm excited about this role! Highlights:\n- Shipped 3 features with measurable impact\n- Built an A/B testing platform\n- Mentored 2 engineers

Expected descriptors:
```json
{
  "tone": "friendly",
  "cadence": { "bucket": "medium" },
  "structure": { "pattern": "list_heavy", "uses_headings": false },
  "formatting": { "bullets": "high" },
  "lexicon": { "register": "plain" }
}
```


