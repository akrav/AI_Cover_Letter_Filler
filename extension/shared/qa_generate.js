/* TICKET-603: Grounded Q&A draft with citations (stub) */
(function () {
  function generateDraft(question, retrieved) {
    const items = Array.isArray(retrieved) ? retrieved : [];
    if (items.length === 0) {
      return { question, draft: '', citations: [], error: 'INSUFFICIENT_EVIDENCE' };
    }
    // Simple extractive: pick best answer as base, include citations
    const best = items[0];
    const draft = best.answer || '';
    const citations = items.map(it => ({ url: it.url || it.source || null, text: (it.answer || '').slice(0, 120) })).filter(c => c.url || c.text);
    return { question, draft, citations };
  }
  window.QAGenerate = { generateDraft };
})();


