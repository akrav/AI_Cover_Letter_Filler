/* TICKET-410: Evidence bundle (evidence.json) */
function buildEvidenceBundle(jobSessionId, variables, evidence) {
  const usedQuotes = [];
  (variables || []).forEach(v => {
    (v.citations || []).forEach(c => {
      usedQuotes.push({ variable_key: v.key, quote: c.quote, url: c.url });
    });
  });
  return {
    job_session_id: jobSessionId || null,
    variables: (variables || []).map(v => ({ key: v.key, value: v.final || v.value || v.draft || '' })),
    citations: usedQuotes,
    generated_at: new Date().toISOString()
  };
}
window.EvidenceBundle = { buildEvidenceBundle };


