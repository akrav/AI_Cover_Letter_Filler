/* TICKET-316: HTML sanitizer for crawled content */
function sanitizeHtml(html) {
  const doc = new DOMParser().parseFromString(String(html || ''), 'text/html');
  // Remove script/style
  doc.querySelectorAll('script,style,noscript').forEach(el => el.remove());
  // Remove event handler attributes
  doc.querySelectorAll('*').forEach(el => {
    [...el.attributes].forEach(attr => {
      if (/^on[a-z]+/i.test(attr.name)) el.removeAttribute(attr.name);
    });
  });
  // Return text-only for safety (for prompts)
  return (doc.body && doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}
window.Sanitizer = { sanitizeHtml };


