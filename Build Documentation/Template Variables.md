# Template Variables — Syntax and Parser Spec (MVP)

This document defines the placeholder syntax and parsing rules for Cover Letter templates (plain text and DOCX).

## Placeholder syntax
- Delimiters: `{{` and `}}`
- Key: snake_case identifier `[a-z0-9_]{1,64}`
- Whitespace around keys is ignored: `{{ company_name }}` == `{{company_name}}`
- Optional variables use a `?` suffix: `{{referrer_name?}}`
- Default values (optional) use pipe syntax: `{{company_mission|default:\"mission\"}}`
- Simple transforms (optional) after pipe (applied before default): `upper|lower|title|capitalize`
  - Examples: `{{candidate_name|upper}}`, `{{position_title|title}}`
- Literal braces: escape with backslash `\{{` or use triple braces for literal output `{{{` → `{{`

## Examples
```
Dear {{company_name}} Hiring Team,

I'm {{candidate_name}} applying for {{position_title}}.
I value {{company_value?}} and your mission: {{company_mission|default:"To be defined"}}.
```

## Reserved keys (subject to change)
- Required (MVP):
  - `candidate_name`
  - `position_title`
  - `company_name`
- Optional (MVP):
  - `referrer_name?`
  - `company_value?`
  - `company_mission?`
  - `candidate_pronouns?`
  - `today_date?`

## Validation rules
- Keys must be snake_case `[a-z0-9_]+` and ≤64 chars.
- Duplicate placeholders are allowed in the template; binding must be consistent for the same key.
- Unknown transforms are ignored with a warning.
- Defaults must be wrapped in quotes; nested braces inside defaults are not allowed.
- Optional variables end with `?`. Required variables do not.

## Parser behavior
- Extraction:
  - Identify `{{...}}` tokens even if broken across DOCX runs (normalize and rejoin runs when scanning).
  - Accept and trim internal whitespace: `{{ key }}` → `key`.
- Binding:
  - For each placeholder occurrence, fetch value from the variable map.
  - Apply transforms in order (e.g., `title` then `upper`).
  - If value is missing:
    - If placeholder is optional (has `?`): use empty string unless `default:"..."` is provided.
    - If required: raise a validation error listing missing keys.
  - If default is provided and value missing: substitute default (after transforms, except `default`).
- Deduplication:
  - A single key may appear multiple times; it binds to one value and replaces all occurrences consistently.
- Edge cases:
  - Literal `{{` in text: write as `\{{` or `{{{` → the parser treats it as literal, not a variable.
  - Adjacent punctuation is preserved (e.g., `{{company_name}},`).
  - Nested placeholders are not supported; treat as invalid.

## Error handling
- Missing required variables: return an error with `missing_keys: string[]`.
- Invalid key format: return an error with `invalid_keys: string[]`.
- Unbalanced or malformed delimiters: return an error with the offending spans.
- Unknown transform: emit a non-fatal warning; ignore transform.

## DOCX-specific notes
- DOCX often splits placeholders across text runs. The parser must:
  - Concatenate runs when scanning to reconstruct tokens `{{...}}`.
  - Preserve original formatting when replacing tokens with bound values.
  - Avoid introducing new runs unless necessary for formatting.

## MVP checklist
- Delimiters and key grammar finalized.
- Required vs optional keys documented.
- Transform and default semantics defined.
- Parser error cases defined.
- DOCX run-join strategy described.


