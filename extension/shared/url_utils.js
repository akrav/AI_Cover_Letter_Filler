/* TICKET-302: Homepage detection & canonical URL */
function canonicalizeUrl(url) {
  try {
    const u = new URL(url);
    u.protocol = 'https:';
    // strip tracking params
    ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'].forEach(k => u.searchParams.delete(k));
    // remove fragments
    u.hash = '';
    // normalize trailing slash on homepages
    const path = u.pathname || '/';
    if (path === '' || path === '/') {
      u.pathname = '/';
    }
    return u.toString();
  } catch {
    return url;
  }
}

function getHomepageFromUrl(url) {
  try {
    const u = new URL(url);
    u.protocol = 'https:';
    u.pathname = '/';
    u.search = '';
    u.hash = '';
    return u.toString();
  } catch {
    return null;
  }
}

function chooseHomepageFromCandidates(candidates) {
  if (!Array.isArray(candidates)) return null;
  // prefer root domain homepages
  for (const c of candidates) {
    const home = getHomepageFromUrl(c.url || c);
    if (home) return home;
  }
  return null;
}

window.UrlUtils = { canonicalizeUrl, getHomepageFromUrl, chooseHomepageFromCandidates };
/* TICKET-315: Canonical URL normalizer from HTML */
function findCanonicalFromHtml(html, baseUrl) {
  try {
    const doc = new DOMParser().parseFromString(String(html || ''), 'text/html');
    const link = doc.querySelector('link[rel="canonical"]');
    if (!link) return null;
    const href = link.getAttribute('href') || '';
    const abs = new URL(href, baseUrl || location.href).toString();
    return canonicalizeUrl(abs);
  } catch {
    return null;
  }
}
window.UrlUtils.findCanonicalFromHtml = findCanonicalFromHtml;


