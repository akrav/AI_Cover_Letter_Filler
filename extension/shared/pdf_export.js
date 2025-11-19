/* TICKET-407: PDF export (stub via HTML) */
async function renderPdfFromHtml(html) {
  // Stub: we wrap HTML text in a Blob with PDF mime for flow testing
  const content = `%PDF-1.4\n% Stub PDF\n${String(html || '').slice(0, 200)}\n%%EOF`;
  return new Blob([content], { type: 'application/pdf' });
}
window.PdfExport = { renderPdfFromHtml };


