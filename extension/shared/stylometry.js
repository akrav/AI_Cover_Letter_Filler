/* TICKET-501: Stylometry feature extractor */
(function () {
  const FUNCTION_WORDS = new Set([
    'the','be','to','of','and','a','in','that','have','i','it','for','not','on','with','he','as','you','do','at',
    'this','but','his','by','from','they','we','say','her','she','or','an','will','my','one','all','would','there','their'
  ]);
  function splitSentences(text) {
    return String(text || '')
      .replace(/\s+/g, ' ')
      .split(/[.!?]+/g)
      .map(s => s.trim())
      .filter(Boolean);
  }
  function tokenize(text) {
    return String(text || '')
      .toLowerCase()
      .match(/[a-z0-9']+/g) || [];
  }
  function computeFeatures(text) {
    const sentences = splitSentences(text);
    const tokens = tokenize(text);
    const numSentences = Math.max(1, sentences.length);
    const numTokens = Math.max(1, tokens.length);
    const uniqueTokens = new Set(tokens).size;
    const averageSentenceLength = tokens.length / numSentences; // tokens per sentence
    const typeTokenRatio = uniqueTokens / numTokens;
    const functionWordCount = tokens.reduce((acc, t) => acc + (FUNCTION_WORDS.has(t) ? 1 : 0), 0);
    const functionWordRatio = functionWordCount / numTokens;
    const punctuationCount = (String(text || '').match(/[,:;—\-]/g) || []).length;
    const punctuationPerSentence = punctuationCount / numSentences;
    const averageWordLength = tokens.reduce((acc, t) => acc + t.length, 0) / numTokens;
    const sentenceLengths = sentences.map(s => tokenize(s).length);
    const mean = averageSentenceLength;
    const variance = sentenceLengths.reduce((acc, n) => acc + Math.pow(n - mean, 2), 0) / numSentences;
    const sentenceLengthVariance = variance;
    // Rough readability proxy (lower is easier). Normalize later.
    const readabilityProxy = averageSentenceLength + averageWordLength;
    return {
      averageSentenceLength,
      typeTokenRatio,
      functionWordRatio,
      punctuationPerSentence,
      averageWordLength,
      sentenceLengthVariance,
      readabilityProxy
    };
  }
  function normalize(value, min, max) {
    if (!isFinite(value)) return 0;
    if (max === min) return 0;
    return Math.min(1, Math.max(0, (value - min) / (max - min)));
  }
  function extractFeatureVector(text) {
    const f = computeFeatures(text);
    // Heuristic min/max based on typical English ranges
    return [
      normalize(f.averageSentenceLength, 5, 40),
      normalize(f.typeTokenRatio, 0.2, 0.8),
      normalize(f.functionWordRatio, 0.2, 0.7),
      normalize(f.punctuationPerSentence, 0, 5),
      normalize(f.averageWordLength, 3, 8),
      normalize(f.sentenceLengthVariance, 0, 200),
      normalize(f.readabilityProxy, 10, 60)
    ];
  }
  window.Stylometry = { extractFeatureVector, computeFeatures };
})();


