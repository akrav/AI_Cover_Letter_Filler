/* TICKET-202: content script bootstrap */
(function bootstrap() {
  try {
    chrome.runtime.sendMessage({ ready: true, url: location.href }, () => {});
  } catch (_) {
    // ignore
  }
})();


