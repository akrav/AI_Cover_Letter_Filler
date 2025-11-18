/* TICKET-305: Evidence scoring (relevance, recency, authority) */
function wordSet(s) {
  return new Set(String(s || '').toLowerCase().match(/[a-z0-9]+/g) || []);
}
function jaccard(a, b) {
  const A = wordSet(a), B = wordSet(b);
  if (A.size === 0 && B.size === 0) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter += 1;
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}
function domainAuthority(url) {
  try {
    const host = new URL(url).hostname;
    if (host.startsWith('www.')) return 0.7;
    // company roots likely higher
    if (host.split('.').length === 2) return 0.9;
    return 0.6;
  } catch { return 0.5; }
}
function recencyScore(ts) {
  if (!ts) return 0.5;
  const days = (Date.now() - ts) / (24*60*60*1000);
  if (days <= 30) return 1.0;
  if (days <= 180) return 0.8;
  if (days <= 365) return 0.6;
  return 0.4;
}
function scoreEvidence(quote, jdText, sourceUrl, ts) {
  const rel = jaccard(quote, jdText);
  const auth = domainAuthority(sourceUrl);
  const rec = recencyScore(ts);
  const score = 0.5 * rel + 0.3 * auth + 0.2 * rec;
  return Number(score.toFixed(3));
}
window.Scoring = { scoreEvidence, jaccard };


