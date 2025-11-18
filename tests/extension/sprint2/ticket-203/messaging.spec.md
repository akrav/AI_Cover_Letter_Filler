# TICKET-203 — Messaging bus checks

Expectations:
- [x] Messages include correlation IDs (`id`)
- [x] Background responds to `ping` with `pong`
- [x] Unknown type returns `{ ok: false, error: 'UNKNOWN_TYPE' }`
- [x] Timeout error `BACKGROUND_TIMEOUT` when no response within 5s

Manual dev check (optional):
```js
// In devtools on a page with extension loaded:
MessagingBus.send('ping', {}).then(console.log).catch(console.error);
```


