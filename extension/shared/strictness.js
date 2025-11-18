/* TICKET-309: Strictness levels & insufficiency handling */
function evaluate(variables, mode = 'balanced') {
  const requiredCitations = mode === 'strict' ? 2 : mode === 'balanced' ? 1 : 0;
  return (variables || []).map(v => {
    const count = Array.isArray(v.citations) ? v.citations.length : 0;
    if ((v.status === 'ok') && count < requiredCitations) {
      return { ...v, status: 'insufficient_evidence', rationale: `Needs >= ${requiredCitations} citations` };
    }
    return v;
  });
}
window.Strictness = { evaluate };


