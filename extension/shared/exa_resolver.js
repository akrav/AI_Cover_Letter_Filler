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

function scoreCandidate(query, candidate) {
  // Simple heuristic score: name match + domain match + recency (if provided)
  let score = 0;
  const q = String(query || '').toLowerCase();
  const name = String(candidate.name || '').toLowerCase();
  const url = String(candidate.url || '').toLowerCase();
  if (q && name && (name.includes(q) || q.includes(name))) score += 0.5;
  if (q && url && url.includes(q)) score += 0.3;
  if (typeof candidate.recencyDays === 'number') {
    score += Math.max(0, 0.2 - Math.min(candidate.recencyDays, 365) / 365 * 0.2);
  }
  return Math.min(1, score);
}

function searchCompanyStub(query) {
  // Stub results; in future call Exa API via backend
  const base = query.replace(/[^a-z0-9- ]/gi, '').trim().split(/\s+/)[0].toLowerCase() || 'example';
  const candidates = [
    { name: base, url: `https://${base}.com/`, recencyDays: 30 },
    { name: `${base} ai`, url: `https://www.${base}ai.com/`, recencyDays: 120 },
    { name: `${base} careers`, url: `https://careers.${base}.com/`, recencyDays: 10 }
  ];
  for (const c of candidates) c.score = scoreCandidate(query, c);
  candidates.sort((a, b) => b.score - a.score);
  return candidates;
}

function resolveCompanyViaSearch(query) {
  const results = searchCompanyStub(query);
  const top = results[0] || null;
  if (!top) return { companyName: null, homepageUrl: null, confidence: 0, method: 'search' };
  const homepageUrl = canonicalUrl(top.url);
  const companyName = String(top.name || '').split(/\s+/)[0] || null;
  return {
    companyName,
    homepageUrl,
    confidence: top.score,
    method: 'search',
    candidates: results
  };
}

window.ExaResolver = { resolveCompanyViaSearch, searchCompanyStub, scoreCandidate };

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


