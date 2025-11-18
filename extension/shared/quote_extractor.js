/* TICKET-304: Quote extraction windows & selectors */
function extractText(node) {
  return (node && node.textContent || '').replace(/\s+/g, ' ').trim();
}

function truncate(s, maxLen) {
  if (!s) return s;
  if (s.length <= maxLen) return s;
  return s.slice(0, maxLen - 1) + '…';
}

function extractQuotesFromHtml(html, options = {}) {
  const maxLen = options.maxLen ?? 300;
  const parser = new DOMParser();
  const doc = parser.parseFromString(String(html || ''), 'text/html');
  const quotes = [];
  // 1) Blockquotes
  doc.querySelectorAll('blockquote').forEach(bq => {
    const q = truncate(extractText(bq), maxLen);
    if (q) quotes.push({ quote: q, context: 'blockquote' });
  });
  // 2) Headings + following paragraph
  doc.querySelectorAll('h1,h2,h3').forEach(h => {
    let sib = h.nextElementSibling;
    while (sib && sib.tagName && !/^P|DIV$/i.test(sib.tagName)) {
      sib = sib.nextElementSibling;
    }
    const heading = extractText(h);
    const para = extractText(sib);
    const combined = truncate([heading, para].filter(Boolean).join('. '), maxLen);
    if (combined) quotes.push({ quote: combined, context: 'heading+para' });
  });
  // 3) Bulleted lists
  doc.querySelectorAll('li').forEach(li => {
    const q = truncate(extractText(li), maxLen);
    if (q && q.length > 20) quotes.push({ quote: q, context: 'list-item' });
  });
  // Deduplicate exact matches
  const seen = new Set();
  return quotes.filter(q => {
    const key = q.quote;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

window.QuoteExtractor = { extractQuotesFromHtml };


