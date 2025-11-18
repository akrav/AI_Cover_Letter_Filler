# TICKET-302 — Homepage detection & canonical URL

Checks:
- [x] `UrlUtils.canonicalizeUrl` strips tracking params and fragments; forces https
- [x] `UrlUtils.getHomepageFromUrl` returns root homepage URL for a given page
- [x] `UrlUtils.chooseHomepageFromCandidates` prefers root homepage from a list


