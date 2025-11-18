/* TICKET-301: Exa search client (stub with retry & rate limit) */
const ExaClient = (() => {
  let tokens = 5;
  const capacity = 5;
  const refillMs = 2000;
  setInterval(() => {
    tokens = Math.min(capacity, tokens + 1);
  }, refillMs);

  function canSend() {
    return tokens > 0;
  }
  function takeToken() {
    if (tokens > 0) tokens -= 1;
  }

  function backoffDelay(attempt) {
    const base = 200;
    const jitter = Math.floor(Math.random() * 100);
    return base * Math.pow(2, Math.min(attempt, 4)) + jitter;
  }

  async function search(query, options = {}) {
    const maxAttempts = options.maxAttempts ?? 4;
    for (let attempt = 0; attempt <= maxAttempts; attempt++) {
      if (!canSend()) {
        await new Promise(r => setTimeout(r, 250));
        continue;
      }
      takeToken();
      try {
        // Stubbed response: simulate success with candidates
        const base = String(query || '').trim().split(/\s+/)[0] || 'example';
        const now = Date.now();
        return {
          ok: true,
          query,
          candidates: [
            { title: `${base} — Home`, url: `https://${base}.com/`, ts: now },
            { title: `${base} Careers`, url: `https://careers.${base}.com/`, ts: now - 86400000 }
          ],
          rate: { remaining: tokens, capacity }
        };
      } catch (err) {
        if (attempt === maxAttempts) {
          return { ok: false, error: 'EXA_STUB_ERROR', message: String(err && err.message || err) };
        }
        await new Promise(r => setTimeout(r, backoffDelay(attempt)));
      }
    }
    return { ok: false, error: 'EXA_RETRY_EXHAUSTED' };
  }

  return { search };
})();

window.ExaClient = ExaClient;


