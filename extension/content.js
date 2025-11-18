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
  // Ensure migrations run once per tab load (best-effort)
  try { window.StorageMigrations && window.StorageMigrations.runMigrations(); } catch (_) {}
  // Boot banner
  try {
    const banner = document.createElement('div');
    banner.setAttribute('style','position:fixed;top:0;left:50%;transform:translateX(-50%);background:#111;color:#fff;padding:6px 10px;border-radius:0 0 6px 6px;z-index:2147483647;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:12px;');
    banner.textContent = 'Assistant ready';
    const close = document.createElement('span');
    close.textContent = ' ✕';
    close.style.cursor = 'pointer';
    close.style.marginLeft = '8px';
    close.addEventListener('click', () => banner.remove());
    banner.appendChild(close);
    document.documentElement.appendChild(banner);
    setTimeout(() => { try { banner.remove(); } catch(_){} }, 3000);
  } catch (_) {}
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
    const next = visible ? 'hidden' : 'visible';
    container.style.display = visible ? 'none' : '';
    sessionStorage.setItem('ai_clf_panel', next);
    try { chrome.storage.local.set({ panelVisibility: next }); } catch (_) {}
  });
  container.appendChild(status);
  container.appendChild(toggleBtn);
  document.documentElement.appendChild(container);
  // Initialize from storage (persisted) with session fallback
  chrome.storage.local.get(['panelVisibility'], (d) => {
    const saved = d.panelVisibility || sessionStorage.getItem('ai_clf_panel');
    if (saved === 'hidden') {
      container.style.display = 'none';
    }
  });
  // Platform detection hook
  try {
    const platform = (window.JDExtract && window.JDExtract.detectPlatformFromUrl && window.JDExtract.detectPlatformFromUrl(location.href)) || 'unknown';
    chrome.runtime.sendMessage({ type: 'platform_detected', platform, url: location.href }, () => {});
  } catch (_) {}
  // Hotkey toggle
  function parseHotkey(str) {
    const parts = String(str || '').toLowerCase().split('+').map(s => s.trim());
    return {
      ctrl: parts.includes('ctrl'),
      shift: parts.includes('shift'),
      alt: parts.includes('alt'),
      key: parts[parts.length - 1] || 'k'
    };
  }
  function matchesHotkey(e, hk) {
    return (!!hk.ctrl === e.ctrlKey) && (!!hk.shift === e.shiftKey) && (!!hk.alt === e.altKey) && (e.key.toLowerCase() === hk.key);
  }
  chrome.storage.local.get(['hotkey'], (d) => {
    const hk = parseHotkey(d.hotkey || 'Ctrl+Shift+K');
    window.addEventListener('keydown', (e) => {
      if (matchesHotkey(e, hk)) {
        e.preventDefault();
        toggleBtn.click();
      }
    }, true);
  });
})();


