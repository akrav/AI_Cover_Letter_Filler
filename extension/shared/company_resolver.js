/* TICKET-207: Company resolver (mapping-only) */
function canonicalUrl(url) {
  try {
    const u = new URL(url);
    u.protocol = 'https:';
    u.search = '';
    u.hash = '';
    return u.toString();
  } catch {
    return url;
  }
}

const STATIC_MAPPINGS = [
  // Examples — extend over time or load from config
  { hostEndsWith: '.lever.co', resolver: (u) => ({ name: u.hostname.split('.')[0] }) },
  { hostEndsWith: '.greenhouse.io', resolver: (u) => ({ name: u.hostname.split('.')[0] }) },
  { hostContains: 'workday', resolver: () => ({ name: null }) } // too varied; unknown
];

function guessHomepage(name) {
  if (!name) return null;
  const domain = name.replace(/[^a-z0-9-]/gi, '').toLowerCase();
  if (!domain) return null;
  return `https://${domain}.com/`;
}

function resolveCompany(rawUrl) {
  let companyName = null;
  let homepageUrl = null;
  let confidence = 0.0;
  let method = 'mapping';
  try {
    const u = new URL(rawUrl);
    for (const m of STATIC_MAPPINGS) {
      if ((m.hostEndsWith && u.hostname.endsWith(m.hostEndsWith)) ||
          (m.hostContains && u.hostname.includes(m.hostContains))) {
        const res = m.resolver(u) || {};
        if (res.name) {
          companyName = res.name;
          homepageUrl = guessHomepage(companyName);
          confidence = homepageUrl ? 0.9 : 0.75;
        } else {
          confidence = 0.5;
        }
        break;
      }
    }
    if (!homepageUrl && companyName) {
      homepageUrl = guessHomepage(companyName);
    }
    if (homepageUrl) {
      homepageUrl = canonicalUrl(homepageUrl);
    }
  } catch {
    // ignore
  }
  return { companyName, homepageUrl, confidence, method };
}

window.CompanyResolver = { resolveCompany };


