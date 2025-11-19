/* TICKET-421: HTML render path for PDF */
function renderHtmlFromMarkdown(md) {
  // Minimal markdown to HTML (very naive)
  let html = String(md || '')
    .replace(/^# (.*)$/gm, '<h1>$1</h1>')
    .replace(/^## (.*)$/gm, '<h2>$1</h2>')
    .replace(/^\- (.*)$/gm, '<li>$1</li>')
    .replace(/\n{2,}/g, '<br/><br/>');
  if (/<li>/.test(html)) html = `<ul>${html}</ul>`;
  return html;
}
window.HtmlRender = { renderHtmlFromMarkdown };


