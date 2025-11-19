/* TICKET-504: Composite score & thresholds */
(function () {
  const DEFAULT_WEIGHTS = { stylometry: 0.3, embedding: 0.4, authorship: 0.3 };
  const DEFAULT_THRESHOLDS = { warn: 0.65, block: 0.5 };
  function compositeScore(stylometrySimilarity, embeddingSimilarity, probUserStyle, weights = DEFAULT_WEIGHTS) {
    const s = Math.max(0, Math.min(1, stylometrySimilarity || 0));
    const e = Math.max(0, Math.min(1, embeddingSimilarity || 0));
    const a = Math.max(0, Math.min(1, probUserStyle || 0));
    const total = (weights.stylometry || 0) + (weights.embedding || 0) + (weights.authorship || 0) || 1;
    const wS = (weights.stylometry || 0) / total;
    const wE = (weights.embedding || 0) / total;
    const wA = (weights.authorship || 0) / total;
    return s * wS + e * wE + a * wA;
  }
  function classify(score, thresholds = DEFAULT_THRESHOLDS) {
    if (score < thresholds.block) return 'block';
    if (score < thresholds.warn) return 'warn';
    return 'pass';
  }
  window.StyleComposite = { compositeScore, classify, DEFAULT_WEIGHTS, DEFAULT_THRESHOLDS };
})();


