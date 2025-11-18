/* TICKET-206: JD extraction helpers (Workday, Lever, Greenhouse) */
function text(el) {
  return (el && el.textContent || '').trim();
}

function joinParagraphs(container) {
  if (!container) return '';
  const parts = [];
  container.querySelectorAll('p, li, div').forEach((node) => {
    const t = node.textContent.trim();
    if (t) parts.push(t);
  });
  return parts.join('\n');
}

function extractWorkday(doc) {
  const title = text(doc.querySelector('h1, h2'));
  const location = text(doc.querySelector('[data-automation*="locations"], [data-automation*="locationsSection"], [data-automation*="jobLocation"]'));
  const descContainer = doc.querySelector('[data-automation*="jobPostingDescription"], [data-automation*="jobPosting"]') || doc.body;
  const description = joinParagraphs(descContainer);
  return { platform: 'workday', title, location, description };
}

function extractLever(doc) {
  const title = text(doc.querySelector('.posting-headline h2, .posting-headline h1, h1'));
  const location = text(doc.querySelector('.posting-headline .location, .posting-headline .sort-by-location'));
  const descContainer = doc.querySelector('.section.page-full-width, .content, .description') || doc.body;
  const description = joinParagraphs(descContainer);
  return { platform: 'lever', title, location, description };
}

function extractGreenhouse(doc) {
  const title = text(doc.querySelector('h1.app-title, h1'));
  const location = text(doc.querySelector('.location, .app-title + .location'));
  const descContainer = doc.querySelector('#content, .content, .description') || doc.body;
  const description = joinParagraphs(descContainer);
  return { platform: 'greenhouse', title, location, description };
}

function detectPlatformFromUrl(url) {
  try {
    const u = new URL(url);
    const h = u.hostname;
    if (h.includes('workday')) return 'workday';
    if (h.includes('lever.co')) return 'lever';
    if (h.includes('greenhouse.io')) return 'greenhouse';
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

function extractJD(doc = document, url = location.href) {
  const platform = detectPlatformFromUrl(url);
  if (platform === 'workday') return extractWorkday(doc);
  if (platform === 'lever') return extractLever(doc);
  if (platform === 'greenhouse') return extractGreenhouse(doc);
  // Fallback: generic
  const title = text(doc.querySelector('h1, h2'));
  const location = text(doc.querySelector('[class*="location"]'));
  const description = joinParagraphs(doc.body);
  return { platform: 'unknown', title, location, description };
}

window.JDExtract = { extractJD, detectPlatformFromUrl };


