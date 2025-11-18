/* TICKET-203: simple request/response bus with timeouts */
const MessagingBus = (() => {
  let counter = 0;
  const pending = new Map();

  function generateId() {
    counter += 1;
    return `msg_${Date.now()}_${counter}`;
  }

  function send(type, payload, timeoutMs = 5000) {
    const id = generateId();
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        pending.delete(id);
        reject(new Error('BACKGROUND_TIMEOUT'));
      }, timeoutMs);
      pending.set(id, { resolve, reject, timeout });
      try {
        chrome.runtime.sendMessage({ id, type, payload }, (response) => {
          const entry = pending.get(id);
          if (!entry) {
            return;
          }
          clearTimeout(entry.timeout);
          pending.delete(id);
          if (chrome.runtime.lastError) {
            reject(new Error(chrome.runtime.lastError.message));
            return;
          }
          if (response && response.ok !== false) {
            resolve(response);
          } else {
            reject(new Error((response && response.error) || 'BACKGROUND_ERROR'));
          }
        });
      } catch (err) {
        clearTimeout(timeout);
        pending.delete(id);
        reject(err);
      }
    });
  }

  return { send };
})();

// Expose for content scripts via global (simple MVP)
window.MessagingBus = MessagingBus;


