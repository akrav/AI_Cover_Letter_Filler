/* TICKET-601/616: Q&A indexing and vector upsert (stub) */
(function () {
  function simpleHashEmbedding(text, dim = 64) {
    const v = new Array(dim).fill(0);
    const s = String(text || '');
    for (let i = 0; i < s.length; i++) {
      const idx = s.charCodeAt(i) % dim;
      v[idx] += 1;
    }
    const n = Math.sqrt(v.reduce((a, x) => a + x * x, 0)) || 1;
    return v.map(x => x / n);
  }
  function indexQAPairs(pairs) {
    const entries = (pairs || []).map(p => {
      const question_norm = (window.QANormalize && window.QANormalize.normalizeQuestion(p.question)) || p.question;
      const emb = simpleHashEmbedding(question_norm);
      return {
        id: p.id || `${question_norm}:${(p.company||'')}:${(p.date||'')}`,
        question: p.question,
        question_norm,
        answer: p.answer,
        company: p.company || null,
        date: p.date || null,
        embedding: emb
      };
    });
    chrome.storage.local.get(['qa_index'], (d) => {
      const cur = Array.isArray(d.qa_index) ? d.qa_index : [];
      const map = new Map(cur.map(e => [e.id, e]));
      for (const e of entries) map.set(e.id, e);
      const merged = Array.from(map.values());
      chrome.storage.local.set({ qa_index: merged });
    });
    return entries;
  }
  function searchNearest(query, topK = 5) {
    const qn = (window.QANormalize && window.QANormalize.normalizeQuestion(query)) || query;
    const qv = simpleHashEmbedding(qn);
    return new Promise((resolve) => {
      chrome.storage.local.get(['qa_index'], (d) => {
        const arr = Array.isArray(d.qa_index) ? d.qa_index : [];
        const scored = arr.map(e => {
          const sim = (window.EmbeddingSim && window.EmbeddingSim.normalizedSimilarity(e.embedding, qv)) || 0;
          return { ...e, score: sim };
        }).sort((a, b) => b.score - a.score).slice(0, topK);
        resolve(scored);
      });
    });
  }
  window.QAIndex = { indexQAPairs, searchNearest, simpleHashEmbedding };
})();


