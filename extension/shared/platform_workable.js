/* TICKET-609: Workable platform support (basic selectors) */
(function () {
  function detectWorkable(url) {
    return /workable\.com/i.test(String(url || ''));
  }
  function extractJD() {
    const title = document.querySelector('h1')?.textContent?.trim() || '';
    const location = document.querySelector('[data-ui=\"job-location\"]')?.textContent?.trim() || '';
    const description = document.querySelector('[data-ui=\"job-description\"]')?.textContent?.trim() || document.body.textContent?.slice(0, 2000) || '';
    return { title, location, description, platform: 'workable' };
  }
  window.Workable = { detectWorkable, extractJD };
})();


