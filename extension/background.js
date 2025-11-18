/* TICKET-202/203: background message bootstrap + bus */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const id = message && message.id;
  const type = message && message.type;
  // Bootstrap ready message (no id expected)
  if (message && message.ready === true) {
    sendResponse({ ack: true });
    return true;
  }
  if (type === 'platform_detected') {
    // Minimal ack for platform detection events
    sendResponse({ ok: true });
    return true;
  }
  // Messaging bus handlers
  if (type === 'ping') {
    sendResponse({ id, ok: true, type, result: 'pong' });
    return true;
  }
  if (type === 'echo') {
    sendResponse({ id, ok: true, type, result: message.payload });
    return true;
  }
  // Unknown type → error
  if (id) {
    sendResponse({ id, ok: false, error: 'UNKNOWN_TYPE' });
    return true;
  }
  return true;
});

// TICKET-227: schedule retention pruning (best effort)
try { window.Retention && window.Retention.schedule(); } catch (_) {}


