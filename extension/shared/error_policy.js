/* TICKET-311/312: Backoff & retry policy + error surfacing */
const ErrorPolicy = (() => {
  const RETRYABLE = new Set(['HTTP_429', 'HTTP_500', 'HTTP_502', 'HTTP_503', 'NETWORK']);
  function shouldRetry(code) { return RETRYABLE.has(code); }
  function backoffMs(attempt) {
    const base = 250;
    const jitter = Math.floor(Math.random() * 120);
    return base * Math.pow(2, Math.min(attempt, 5)) + jitter;
  }
  function userMessage(code) {
    switch (code) {
      case 'INSUFFICIENT_EVIDENCE':
        return 'We need more quotes or a different page to support this variable.';
      case 'HTTP_429':
        return 'Rate limited. Waiting briefly before retrying.';
      case 'NETWORK':
        return 'Network error. Check your connection or try again.';
      default:
        return 'Something went wrong. Please retry or adjust settings.';
    }
  }
  return { shouldRetry, backoffMs, userMessage };
})();
window.ErrorPolicy = ErrorPolicy;


