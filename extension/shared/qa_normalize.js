/* TICKET-602: Question normalization and matching */
(function () {
  const STOP_PHRASES = [
    'please describe', 'tell us about', 'why are you interested in',
    'what is your experience with', 'how do you'
  ];
  function normalizeQuestion(q) {
    let s = String(q || '').toLowerCase().trim();
    s = s.replace(/\s+/g, ' ');
    s = s.replace(/[“”"']/g, '');
    s = s.replace(/[?.!,;:]+/g, '');
    for (const p of STOP_PHRASES) s = s.replace(p, '');
    s = s.replace(/\b(a|an|the)\b/g, ' ');
    s = s.replace(/\s+/g, ' ').trim();
    return s;
  }
  window.QANormalize = { normalizeQuestion };
})();


