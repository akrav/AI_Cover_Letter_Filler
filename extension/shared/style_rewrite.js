/* TICKET-404: In-style rewrite */
function rewriteToStyle(draft, styleProfile) {
  if (!draft) return '';
  let text = String(draft);
  // Apply simple transforms based on cadence/tone as placeholders
  if (styleProfile && styleProfile.tone === 'formal') {
    text = text.replace(/\bI'm\b/g, 'I am').replace(/\bcan't\b/g, 'cannot');
  }
  if (styleProfile && styleProfile.cadence && styleProfile.cadence.bucket === 'short') {
    text = text.replace(/,\s+/g, '. ');
  }
  return text;
}
window.StyleRewrite = { rewriteToStyle };


