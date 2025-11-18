/* TICKET-202: content script bootstrap */
(function bootstrap() {
  try {
    chrome.runtime.sendMessage({ ready: true, url: location.href }, () => {});
  } catch (_) {
    // ignore
  }
})();

/* TICKET-209: UI panel scaffold and toggle */
(function panel() {
  const PANEL_ID = 'ai-clf-panel';
  if (document.getElementById(PANEL_ID)) return;
  const container = document.createElement('div');
  container.id = PANEL_ID;
  container.setAttribute('style',
    'position:fixed;top:16px;right:16px;z-index:2147483647;background:#fff;border:1px solid #ddd;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.15);padding:8px 12px;font-family:system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;font-size:13px;color:#111;');
  const status = document.createElement('span');
  status.textContent = 'Status: Ready';
  status.style.marginRight = '8px';
  const toggleBtn = document.createElement('button');
  toggleBtn.textContent = 'Hide';
  toggleBtn.style.padding = '4px 8px';
  toggleBtn.addEventListener('click', () => {
    const visible = container.style.display !== 'none';
    if (visible) {
      container.style.display = 'none';
      sessionStorage.setItem('ai_clf_panel', 'hidden');
    } else {
      container.style.display = '';
      sessionStorage.setItem('ai_clf_panel', 'visible');
    }
  });
  container.appendChild(status);
  container.appendChild(toggleBtn);
  document.documentElement.appendChild(container);
  const saved = sessionStorage.getItem('ai_clf_panel');
  if (saved === 'hidden') {
    container.style.display = 'none';
  }
})();


