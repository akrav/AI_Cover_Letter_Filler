/* TICKET-409: File naming & sanitization */
function sanitizeFilename(name) {
  return String(name || '')
    .normalize('NFKD')
    .replace(/[\/\\?%*:|"<>]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 120);
}
function buildFilename(firstName, companyName, ext) {
  const raw = `${firstName}'s ${companyName} Cover Letter.${ext}`;
  return sanitizeFilename(raw);
}
window.Naming = { sanitizeFilename, buildFilename };


