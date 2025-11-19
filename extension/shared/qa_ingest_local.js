/* TICKET-613: Local Q&A ingestion from documents (spec stub) */
(function () {
  function parsePlainTextToPairs(text) {
    const lines = String(text || '').split(/\r?\n/);
    const pairs = [];
    let curQ = null;
    for (const line of lines) {
      const q = line.match(/^\s*Q:\s*(.+)$/i);
      const a = line.match(/^\s*A:\s*(.+)$/i);
      if (q) { curQ = { question: q[1].trim(), answer: '' }; }
      else if (a && curQ) { curQ.answer = a[1].trim(); pairs.push(curQ); curQ = null; }
    }
    return pairs;
  }
  window.QAIngestLocal = { parsePlainTextToPairs };
})();


