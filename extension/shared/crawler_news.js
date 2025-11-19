/* TICKET-608: Crawler improvements for press/news pages */
(function () {
  function isNewsOrPressUrl(url) {
    return /news|press|media|stories|updates|blog/i.test(String(url || ''));
  }
  function extractRecencyFromDom(doc) {
    const sel = ['time[datetime]', 'meta[property=\"article:published_time\"]', 'meta[name=\"date\"]', '.date', '.published'];
    for (const s of sel) {
      const n = doc.querySelector(s);
      if (n) {
        const val = n.getAttribute('datetime') || n.getAttribute('content') || n.textContent || '';
        const t = new Date(val);
        if (!isNaN(t.getTime())) return t.toISOString();
      }
    }
    return null;
  }
  window.CrawlerNews = { isNewsOrPressUrl, extractRecencyFromDom };
})();


