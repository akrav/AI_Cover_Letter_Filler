/* TICKET-607: Cost guardrails & rate limits */
(function () {
  const DEFAULTS = { budgetTokens: 20000, ratePerMin: 30 };
  function withCostGuard(fn, options = {}) {
    const cfg = { ...DEFAULTS, ...options };
    return (...args) => new Promise((resolve, reject) => {
      chrome.storage.local.get(['cost_state'], (d) => {
        const state = d.cost_state || { usedTokens: 0, lastCalls: [] };
        const now = Date.now();
        state.lastCalls = (state.lastCalls || []).filter(ts => now - ts < 60 * 1000);
        if (state.usedTokens >= cfg.budgetTokens) {
          const proceed = confirm('Budget reached. Continue anyway?');
          if (!proceed) return reject(new Error('BUDGET_REACHED'));
        }
        if (state.lastCalls.length >= cfg.ratePerMin) {
          const proceed = confirm('Rate limit reached. Continue anyway?');
          if (!proceed) return reject(new Error('RATE_LIMIT'));
        }
        state.lastCalls.push(now);
        chrome.storage.local.set({ cost_state: state }, async () => {
          const res = await fn(...args);
          const used = (res && res.usageTokens) || 0;
          chrome.storage.local.get(['cost_state'], (d2) => {
            const st = d2.cost_state || { usedTokens: 0, lastCalls: [] };
            st.usedTokens += used;
            chrome.storage.local.set({ cost_state: st }, () => resolve(res));
          });
        });
      });
    });
  }
  window.CostGuard = { withCostGuard, DEFAULTS };
})();


