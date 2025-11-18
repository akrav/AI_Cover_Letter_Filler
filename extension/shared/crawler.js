/* TICKET-303/314: Robots-compliant crawler (stub) with crawl delay & page cap */
const Crawler = (() => {
  async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function fetchText(url) {
    // Stub: In MV3 content context we rely on fetch() availability
    const resp = await fetch(url, { credentials: 'omit' });
    if (!resp.ok) throw new Error('HTTP_' + resp.status);
    return await resp.text();
  }

  function robotsUrlFor(u) {
    const url = new URL(u);
    url.pathname = '/robots.txt';
    url.search = '';
    url.hash = '';
    return url.toString();
  }

  async function getRobotsRules(startUrl) {
    try {
      const txt = await fetchText(robotsUrlFor(startUrl));
      return window.RobotsParser.parseRobotsTxt(txt);
    } catch {
      return [];
    }
  }

  async function crawl(startUrl, options = {}) {
    const maxPages = options.maxPages ?? 10;
    const visited = new Set();
    const queue = [startUrl];
    const results = [];
    const rules = await getRobotsRules(startUrl);
    const delaySeconds = window.RobotsParser.getCrawlDelay(rules, options.defaultDelaySeconds ?? 2);
    const delayMs = delaySeconds * 1000;

    while (queue.length && results.length < maxPages) {
      const url = queue.shift();
      if (visited.has(url)) continue;
      visited.add(url);
      if (!window.RobotsParser.isAllowed(url, rules)) {
        continue;
      }
      try {
        const html = await fetchText(url);
        results.push({ url, html });
        // Very simple link discovery (same-origin only)
        if (results.length < maxPages) {
          const origin = new URL(startUrl).origin;
          const links = Array.from(html.matchAll(/href="([^"]+)"/g)).map(m => m[1]);
          for (const href of links) {
            try {
              const abs = new URL(href, url).toString();
              if (abs.startsWith(origin) && !visited.has(abs)) {
                queue.push(abs);
              }
            } catch {}
          }
        }
        if (delayMs > 0) await sleep(delayMs);
      } catch {
        // Ignore fetch errors, continue
      }
    }
    return { pages: results, rules, delaySeconds, capped: results.length >= maxPages };
  }

  return { crawl };
})();

window.Crawler = Crawler;


