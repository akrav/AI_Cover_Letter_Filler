/* TICKET-313: Robots.txt allow/deny parser (simplified) */
function parseRobotsTxt(text) {
  const lines = String(text || '').split(/\r?\n/);
  const rules = [];
  let userAgentSection = false;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith('#')) continue;
    const [keyRaw, ...rest] = line.split(':');
    if (!keyRaw || rest.length === 0) continue;
    const key = keyRaw.trim().toLowerCase();
    const value = rest.join(':').trim();
    if (key === 'user-agent') {
      // consider only * section for simplicity
      userAgentSection = (value === '*' || value === '"*"');
    } else if (userAgentSection && (key === 'allow' || key === 'disallow')) {
      rules.push({ type: key, path: value });
    } else if (userAgentSection && key === 'crawl-delay') {
      const n = parseFloat(value);
      if (!Number.isNaN(n)) rules.push({ type: 'crawl-delay', seconds: n });
    }
  }
  return rules;
}

function isAllowed(url, rules) {
  try {
    const u = new URL(url);
    const path = u.pathname || '/';
    // Specificity: last matching rule wins (basic behavior)
    let decision = true; // default allow
    for (const r of rules) {
      if (r.type === 'allow' && path.startsWith(r.path)) decision = true;
      if (r.type === 'disallow' && path.startsWith(r.path)) decision = false;
    }
    return decision;
  } catch {
    return true;
  }
}

function getCrawlDelay(rules, fallbackSeconds = 2) {
  for (const r of rules) {
    if (r.type === 'crawl-delay' && typeof r.seconds === 'number') {
      return Math.max(0, r.seconds);
    }
  }
  return fallbackSeconds;
}

window.RobotsParser = { parseRobotsTxt, isAllowed, getCrawlDelay };


