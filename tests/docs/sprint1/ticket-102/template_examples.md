# TICKET-102 — Template examples and expected parses

## Valid example (3 required + 1 optional)

Template:
```
Dear {{company_name}} Hiring Team,

I'm {{candidate_name}} applying for {{position_title}}.
Referred by {{referrer_name?}}.
```

Variables:
```json
{
  "company_name": "Acme Corp",
  "candidate_name": "Ada Lovelace",
  "position_title": "Senior ML Engineer",
  "referrer_name": "Grace Hopper"
}
```

Expected output:
```
Dear Acme Corp Hiring Team,

I'm Ada Lovelace applying for Senior ML Engineer.
Referred by Grace Hopper.
```

## Valid example with default and transform

Template:
```
Mission: {{company_mission|default:"To be defined"|upper}}
```

Variables:
```json
{}
```

Expected output:
```
Mission: TO BE DEFINED
```

## Invalid example — missing required variable(s)

Template:
```
Hi {{candidate_name}}, welcome to {{company_name}}. Role: {{position_title}}.
```

Variables:
```json
{
  "candidate_name": "Ada Lovelace",
  "company_name": "Acme Corp"
}
```

Expected error:
```json
{
  "error": "missing_required_variables",
  "missing_keys": ["position_title"]
}
```

## Invalid example — malformed placeholder

Template:
```
Hello {{company_name
```

Expected error:
```json
{
  "error": "malformed_placeholder",
  "span": "{{company_name"
}
```


