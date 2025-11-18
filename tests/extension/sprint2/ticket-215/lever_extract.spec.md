# TICKET-215 — Lever extraction checks

Expectations:
- [x] Title from `.posting-headline h1/h2`
- [x] Location from `.posting-headline .location`
- [x] Description includes bullet items

API:
```js
JDExtract.extractJD(document, location.href) // platform === 'lever'
```


