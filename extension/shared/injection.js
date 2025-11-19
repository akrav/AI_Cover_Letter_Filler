/* TICKET-411: Textarea injection on supported platforms */
function findCoverLetterField(platform) {
  const selectors = [
    'textarea[name*="cover"]',
    'textarea[aria-label*="cover"]',
    'textarea'
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (el) return el;
  }
  return null;
}
function injectFinalText(finalText) {
  const platform = (window.JDExtract && window.JDExtract.detectPlatformFromUrl && window.JDExtract.detectPlatformFromUrl(location.href)) || 'unknown';
  const field = findCoverLetterField(platform);
  if (!field) return { ok: false, error: 'FIELD_NOT_FOUND' };
  field.focus();
  field.value = String(finalText || '');
  field.dispatchEvent(new Event('input', { bubbles: true }));
  return { ok: true, platform };
}
window.Injection = { injectFinalText };


