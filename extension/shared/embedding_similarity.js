/* TICKET-502: Embedding similarity calculator */
(function () {
  function dot(a, b) {
    let s = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) s += a[i] * b[i];
    return s;
  }
  function norm(a) {
    return Math.sqrt(a.reduce((acc, x) => acc + x * x, 0));
  }
  function cosineSimilarity(a, b) {
    const na = norm(a), nb = norm(b);
    if (na === 0 || nb === 0) return 0;
    return dot(a, b) / (na * nb);
  }
  function normalizedSimilarity(a, b) {
    const c = cosineSimilarity(a, b); // [-1, 1]
    return (c + 1) / 2; // [0, 1]
  }
  window.EmbeddingSim = { cosineSimilarity, normalizedSimilarity };
})();


