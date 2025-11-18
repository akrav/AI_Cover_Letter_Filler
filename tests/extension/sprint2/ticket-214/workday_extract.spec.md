# TICKET-214 — Workday extraction checks

Expectations:
- [x] Title from header
- [x] Location from locations section
- [x] Description length > 300 chars; includes bullet items where present

API:
```js
JDExtract.extractJD(document, location.href) // platform === 'workday'
```


