# TICKET-206 — JD extraction fixtures

Scenarios (manual/fixture-based):
- [x] Workday page fixture → non-empty title/location; description length > 300 chars
- [x] Lever page fixture → non-empty title/location; description includes bullet lines
- [x] Greenhouse page fixture → non-empty title/location; description includes bullet lines
- [x] "Show more" expanded content included in description when visible

API:
```js
// In page context:
JDExtract.extractJD(document, location.href)
// -> { platform, title, location, description }
```


