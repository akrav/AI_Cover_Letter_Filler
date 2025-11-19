/* TICKET-401: Style profile builder */
function analyzeSamples(samples) {
  const texts = (samples || []).map(s => String(s || ''));
  const totalChars = texts.reduce((a, t) => a + t.length, 0);
  const sentences = texts.flatMap(t => t.split(/(?<=[.!?])\s+/));
  const words = texts.flatMap(t => t.split(/\s+/).filter(Boolean));
  const avgSentenceLen = sentences.length ? words.length / sentences.length : 0;
  const sentenceLenStdev = (() => {
    if (!sentences.length) return 0;
    const lengths = sentences.map(s => (s.split(/\s+/).filter(Boolean).length));
    const mean = lengths.reduce((a,b)=>a+b,0) / lengths.length;
    const varc = lengths.reduce((a,b)=>a+Math.pow(b-mean,2),0)/lengths.length;
    return Math.sqrt(varc);
  })();
  const paragraphLens = texts.map(t => (t.split(/\n{2,}/).map(p => p.split(/\s+/).filter(Boolean).length))).flat();
  const paragraphLenSentences = paragraphLens.length ? paragraphLens.reduce((a,b)=>a+b,0)/paragraphLens.length : 0;
  const bulletFrequency = texts.join('\n').match(/^\s*[-*]\s+/gm)?.length || 0;
  const tone = avgSentenceLen > 18 ? 'formal' : avgSentenceLen > 12 ? 'neutral' : 'friendly';
  const cadenceBucket = avgSentenceLen < 12 ? 'short' : avgSentenceLen < 18 ? 'medium' : 'long';
  const usesHeadings = /(^|\n)#+\s|\n[A-Z][A-Za-z0-9 ]+\n[-=]{3,}/.test(texts.join('\n'));
  const domainTerms = Array.from(new Set(words.filter(w => w.length > 6))).slice(0, 12);
  const register = domainTerms.length > 6 ? 'technical' : 'plain';
  return {
    version: '1.0',
    generated_at: new Date().toISOString(),
    source_writing_sample_ids: [],
    tone,
    cadence: {
      avg_sentence_len: Number(avgSentenceLen.toFixed(1)),
      sentence_len_stdev: Number(sentenceLenStdev.toFixed(1)),
      paragraph_len_sentences: Number(paragraphLenSentences.toFixed(1)),
      bucket: cadenceBucket
    },
    structure: {
      pattern: bulletFrequency > 5 ? 'list_heavy' : 'narrative',
      bullet_frequency: Math.min(1, bulletFrequency / (sentences.length || 1)),
      uses_headings: usesHeadings,
      transition_markers: ['therefore','moreover','however'].filter(m => texts.join(' ').toLowerCase().includes(m))
    },
    lexicon: {
      register,
      domain_terms: domainTerms,
      common_verbs: ['build','lead','optimize','ship','design'].filter(v => texts.join(' ').toLowerCase().includes(v)),
      common_adjectives: ['scalable','reliable','measurable','robust'].filter(a => texts.join(' ').toLowerCase().includes(a))
    },
    formatting: {
      bullets: bulletFrequency > 10 ? 'high' : bulletFrequency > 3 ? 'medium' : 'low',
      headings: usesHeadings ? 'medium' : 'low',
      inline_emphasis: 'low'
    },
    exemplars: texts.slice(0, 3).map(t => t.slice(0, 280))
  };
}
function buildStyleProfile(samples) {
  return analyzeSamples(samples);
}
window.StyleProfileBuilder = { buildStyleProfile };


