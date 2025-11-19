/* TICKET-406: DOCX rendering pipeline (stub) */
async function renderDocxFromHtml(html) {
  // For MVP, we return a Blob from HTML string; real DOCX library integration later
  return new Blob([String(html || '')], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
}
window.DocxRender = { renderDocxFromHtml };


