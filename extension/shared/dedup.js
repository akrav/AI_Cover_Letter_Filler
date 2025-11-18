/* TICKET-306: Dedup & clustering (text similarity) */
function normalize(s) {
  return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();
}
function jaccard(a, b) {
  const A = new Set(normalize(a).split(/\W+/).filter(Boolean));
  const B = new Set(normalize(b).split(/\W+/).filter(Boolean));
  if (A.size === 0 && B.size === 0) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter += 1;
  const union = A.size + B.size - inter;
  return union ? inter / union : 0;
}
function deduplicate(quotes, threshold = 0.9) {
  const result = [];
  for (const q of quotes || []) {
    if (!result.some(r => jaccard(r.quote, q.quote) >= threshold)) {
      result.push(q);
    }
  }
  return result;
}
function cluster(quotes, threshold = 0.6) {
  const clusters = [];
  for (const q of quotes || []) {
    let placed = false;
    for (const c of clusters) {
      if (jaccard(c[0].quote, q.quote) >= threshold) {
        c.push(q); placed = true; break;
      }
    }
    if (!placed) clusters.push([q]);
  }
  return clusters;
}
window.Dedup = { deduplicate, cluster, jaccard };


