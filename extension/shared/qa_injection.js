/* TICKET-606/614/615: Q&A injection + clipboard fallback + confidence popover support */
(function () {
  function findQuestionField(questionText) {
    const labels = Array.from(document.querySelectorAll('label'));
    for (const lb of labels) {
      const t = (lb.textContent || '').toLowerCase();
      if (questionText && t.includes(questionText.toLowerCase().slice(0, 20))) {
        const forId = lb.getAttribute('for');
        if (forId) {
          const target = document.getElementById(forId);
          if (target && target.tagName.toLowerCase() === 'textarea') return target;
        }
      }
    }
    return document.querySelector('textarea');
  }
  async function injectAnswerForQuestion(questionText, finalAnswer) {
    const field = findQuestionField(questionText);
    if (field) {
      field.focus();
      field.value = String(finalAnswer || '');
      field.dispatchEvent(new Event('input', { bubbles: true }));
      return { ok: true, method: 'direct' };
    }
    // Clipboard fallback
    try {
      await navigator.clipboard.writeText(String(finalAnswer || ''));
      alert('Field blocked. The answer was copied to your clipboard. Please paste it into the appropriate field.');
      return { ok: true, method: 'clipboard' };
    } catch (e) {
      return { ok: false, error: 'FALLBACK_FAILED' };
    }
  }
  window.QAInjection = { injectAnswerForQuestion };
})();


