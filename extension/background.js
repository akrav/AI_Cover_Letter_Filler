/* TICKET-202: background message bootstrap */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message && message.ready === true) {
    // Received ready ping from content script
    sendResponse({ ack: true });
  }
  // Keep listener active for async responses if needed
  return true;
});


