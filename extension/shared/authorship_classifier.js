/* TICKET-503: Authorship classifier baseline */
(function () {
  // Simple baseline: linear combination of signals -> logistic
  function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
  function predictProbUserStyle(features, embeddingScore) {
    const f = Array.isArray(features) ? features : [];
    const w = [0.8, 1.2, 0.6, -0.2, 0.5, -0.3, -0.4]; // heuristic weights
    let z = 0;
    for (let i = 0; i < Math.min(f.length, w.length); i++) z += f[i] * w[i];
    z += (typeof embeddingScore === 'number' ? embeddingScore : 0.5) * 1.5;
    z += -1.0; // bias
    return sigmoid(z); // [0,1]
  }
  window.AuthorshipClassifier = { predictProbUserStyle };
})();


