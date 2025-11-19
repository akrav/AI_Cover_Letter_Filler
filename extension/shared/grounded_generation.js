/* TICKET-403: Grounded draft generation (JSON) */
function generateDraft(jdText, quotes, requiredKeys = []) {
  const vars = [];
  // Require at least one quote for grounded draft
  if (!Array.isArray(quotes) || quotes.length === 0) {
    return { error: 'INSUFFICIENT_EVIDENCE', missing: requiredKeys };
  }
  // Simple draft uses best quote joined with JD context
  const best = quotes[0];
  const draft = `${best.quote}\n\n${(jdText||'').slice(0, 500)}`;
  vars.push({ key: 'company_mission', draft, citations: [{ quote: best.quote, url: best.url }], status: 'ok' });
  return { variables: vars };
}
window.GroundedGeneration = { generateDraft };


