/* TICKET-605: Q&A export using DOCX/PDF renderers */
(function () {
  async function exportQA(firstName, companyName, qaList) {
    const title = `${firstName}'s ${companyName} Q&A`;
    const html = `<h1>${title}</h1>` + (qaList || []).map(q => `<h2>Q: ${q.question}</h2><p>${q.final || q.draft || ''}</p>`).join('');
    const docxBlob = await (window.DocxRender && window.DocxRender.renderDocxFromHtml ? window.DocxRender.renderDocxFromHtml(html) : new Blob([html], { type: 'application/octet-stream' }));
    const pdfBlob = await (window.PdfExport && window.PdfExport.renderPdfFromHtml ? window.PdfExport.renderPdfFromHtml(html) : new Blob([html], { type: 'application/octet-stream' }));
    const docxName = (window.Naming && window.Naming.buildFilename ? window.Naming.buildFilename(firstName, companyName, 'docx') : `${title}.docx`).replace('Cover Letter', 'Q&A');
    const pdfName = (window.Naming && window.Naming.buildFilename ? window.Naming.buildFilename(firstName, companyName, 'pdf') : `${title}.pdf`).replace('Cover Letter', 'Q&A');
    const save = window.SaveFlow && window.SaveFlow.save ? window.SaveFlow.save : async () => ({ ok: true, method: 'noop' });
    await save(docxName, docxBlob);
    await save(pdfName, pdfBlob);
    return { ok: true, files: [docxName, pdfName] };
  }
  window.QAExport = { exportQA };
})();


