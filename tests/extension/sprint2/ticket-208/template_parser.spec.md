# TICKET-208 — Template parser checks

Cases:
- [x] Extracts keys: `{{company_name}}`, `{{position_title}}`, `{{referrer_name?}}`
- [x] Reports invalid keys and missing required variables
- [x] Applies transforms (`upper`, `lower`, `title`, `capitalize`) and defaults

Example:
```
TemplateParser.replaceVariables(
  "Dear {{company_name|upper}} — {{company_mission|default:\"To be defined\"}}",
  { company_name: "Acme Corp" }
)
// => content contains "Dear ACME CORP — To be defined"
```


