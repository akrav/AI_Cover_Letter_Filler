# Style Modeling Rubric (MVP)

This rubric defines how we describe a writer’s style for in‑style rewriting and generation.

## Dimensions

- Tone:
  - Values: formal, neutral, friendly, enthusiastic, confident, humble
  - Signals: contractions usage, sentiment, hedging, exclamation marks
- Cadence:
  - Metrics: average sentence length (words), sentence length variability (stdev), paragraph length (sentences)
  - Values: short, medium, long
- Structure:
  - Values: narrative, list‑heavy, mixed
  - Signals: bullet list frequency, section headings, transitions
- Lexicon:
  - Metrics: domain terms (top‑N TF‑IDF terms), common verbs and adjectives
  - Values: plain, technical, marketing
- Formatting:
  - Values: bullets_low|medium|high, headings_low|medium|high, inline_emphasis_low|medium|high

## JSON Schema (style_profile)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "title": "StyleProfile",
  "type": "object",
  "required": ["version", "tone", "cadence", "structure", "lexicon", "formatting"],
  "properties": {
    "version": { "type": "string", "const": "1.0" },
    "generated_at": { "type": "string", "format": "date-time" },
    "source_writing_sample_ids": {
      "type": "array",
      "items": { "type": "string", "format": "uuid" }
    },
    "tone": {
      "type": "string",
      "enum": ["formal", "neutral", "friendly", "enthusiastic", "confident", "humble"]
    },
    "cadence": {
      "type": "object",
      "required": ["avg_sentence_len", "sentence_len_stdev", "paragraph_len_sentences", "bucket"],
      "properties": {
        "avg_sentence_len": { "type": "number", "minimum": 1 },
        "sentence_len_stdev": { "type": "number", "minimum": 0 },
        "paragraph_len_sentences": { "type": "number", "minimum": 1 },
        "bucket": { "type": "string", "enum": ["short", "medium", "long"] }
      }
    },
    "structure": {
      "type": "object",
      "required": ["pattern"],
      "properties": {
        "pattern": { "type": "string", "enum": ["narrative", "list_heavy", "mixed"] },
        "bullet_frequency": { "type": "number", "minimum": 0, "maximum": 1 },
        "uses_headings": { "type": "boolean" },
        "transition_markers": { "type": "array", "items": { "type": "string" } }
      }
    },
    "lexicon": {
      "type": "object",
      "required": ["register"],
      "properties": {
        "register": { "type": "string", "enum": ["plain", "technical", "marketing"] },
        "domain_terms": { "type": "array", "items": { "type": "string" } },
        "common_verbs": { "type": "array", "items": { "type": "string" } },
        "common_adjectives": { "type": "array", "items": { "type": "string" } }
      }
    },
    "formatting": {
      "type": "object",
      "required": ["bullets", "headings", "inline_emphasis"],
      "properties": {
        "bullets": { "type": "string", "enum": ["low", "medium", "high"] },
        "headings": { "type": "string", "enum": ["low", "medium", "high"] },
        "inline_emphasis": { "type": "string", "enum": ["low", "medium", "high"] }
      }
    }
  },
  "additionalProperties": false
}
```

## Notes
- The `embedding` for style is stored in the database (pgvector) and not part of the JSON; the JSON captures interpretable descriptors.
- Version this schema as it evolves to avoid breaking changes.


