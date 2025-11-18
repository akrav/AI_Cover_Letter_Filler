/* TICKET-222: Exa resolver stub + scorer */
function canonicalUrl(url) {
  try {
    const u = new URL(url);
    u.protocol = 'https:';
    u.search = '';
    u.hash = '';
    return u.toString();
  } catch {
    return url;
  }
}

// Simple scorer: prefer root homepage domains, shorter paths, higher provided score
function scoreCandidate(c) {
  let s = 0;
  try {
    const u = new URL(c.url);
    if (u.pathname === '/' || u.pathname === '') s += 0.4;
    if (u.hostname.split('.').length <= 3) s += 0.2; // simple domain
  } catch {
    // ignore
  }
  s += Math.min(Math.max(c.score || 0, 0), 1) * 0.4;
  return s;
}

function chooseBest(candidates) {
  const withScores = (candidates || []).map(c => ({ ...c, _s: scoreCandidate(c) }));
  withScores.sort((a, b) => b._s - a._s);
  return withScores[0];
}

// Stubbed "search" — in future, call Exa; for now accept a hint or URL and return guessed results
function exaSearchCompany(hint) {
  const name = String(hint || '').trim().toLowerCase().replace(/[^a-z0-9-]/g, '');
  if (!name) return [];
  return [
    { title: `${name}.com`, url: `https://${name}.com/`, score: 0.9 },
    { title: `Careers - ${name}`, url: `https://careers.${name}.com/`, score: 0.6 }
  ];
}

function resolveViaSearch(hint) {
  const results = exaSearchCompany(hint);
  const best = chooseBest(results);
  if (!best) return { companyName: null, homepageUrl: null, confidence: 0.0, method: 'search' };
  const homepageUrl = canonicalUrl(best.url);
  const companyName = hint || null;
  const confidence = Math.min(1, scoreCandidate(best));
  return { companyName, homepageUrl, confidence, method: 'search' };
}

window.ExaResolver = { resolveViaSearch };


