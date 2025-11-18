/* TICKET-308: JD + evidence consolidation to variable candidates */
function consolidate(jdText, evidence, options = {}) {
  const vars = [];
  // company_mission candidate: pick highest score quote containing 'mission'
  const mission = (evidence || []).filter(e => /mission/i.test(e.quote))
    .sort((a,b) => (b.score||0) - (a.score||0))[0];
  if (mission) {
    vars.push({
      key: 'company_mission',
      value: mission.quote.replace(/^["“]/,'').replace(/["”]$/,''),
      citations: [{ quote: mission.quote, url: mission.url, source_title: mission.source_title }],
      rationale: 'Highest scoring mission-related quote',
      confidence: mission.score || 0.7,
      status: 'ok'
    });
  } else {
    vars.push({ key: 'company_mission', status: 'insufficient_evidence', rationale: 'No mission quote found' });
  }
  // company_name from JD heading heuristic
  const m = String(jdText || '').match(/at\s+([A-Z][A-Za-z0-9.&-]+)/);
  if (m && m[1]) {
    vars.push({ key: 'company_name', value: m[1], status: 'ok', confidence: 0.8, citations: [] });
  }
  return vars;
}
window.Consolidation = { consolidate };


