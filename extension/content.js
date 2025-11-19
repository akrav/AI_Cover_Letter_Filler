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
  // Offline mode badge
  chrome.storage.local.get(['offlineMode'], (d) => {
    if (d && d.offlineMode) {
      status.textContent = 'Status: Ready (Offline)';
    }
  });
  // TICKET-402: Variable table UI render
  const tableWrap = document.createElement('div');
  tableWrap.style.marginTop = '8px';
  tableWrap.innerHTML = '';
  container.appendChild(tableWrap);
  function renderVariableTable(variables) {
    const rows = (variables || []).map(v => {
      return `<tr>
        <td>${v.key || ''}</td>
        <td>${(v.citations && v.citations[0] && v.citations[0].quote) ? '…' : ''}</td>
        <td>${(v.citations && v.citations[0] && v.citations[0].url) ? 'link' : ''}</td>
        <td>${v.rationale || ''}</td>
        <td><input data-key="${v.key}" data-field="draft" value="${(v.draft || v.value || '').toString().replace(/"/g,'&quot;')}" style="width:160px"/></td>
        <td><input data-key="${v.key}" data-field="final" value="${(v.final || v.value || '').toString().replace(/"/g,'&quot;')}" style="width:160px"/></td>
        <td><input type="checkbox" data-key="${v.key}" data-field="approved" ${v.approved ? 'checked':''}/></td>
      </tr>`;
    }).join('');
    tableWrap.innerHTML = `
      <table style="border-collapse:collapse;width:100%;font-size:12px">
        <thead>
          <tr>
            <th>Variable</th><th>Quote</th><th>URL</th><th>Rationale</th><th>Draft</th><th>Final</th><th>Approve</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    `;
    tableWrap.querySelectorAll('input').forEach(inp => {
      inp.addEventListener('change', (e) => {
        const key = e.target.getAttribute('data-key');
        const field = e.target.getAttribute('data-field');
        chrome.storage.local.get(['variables'], (d) => {
          const arr = Array.isArray(d.variables) ? d.variables : [];
          const idx = arr.findIndex(v => v.key === key);
          if (idx >= 0) {
            if (field === 'approved') {
              arr[idx].approved = e.target.checked;
            } else {
              arr[idx][field] = e.target.value;
              // Reset approval if edited
              arr[idx].approved = false;
            }
            chrome.storage.local.set({ variables: arr });
          }
        });
      });
    });
  }
  chrome.storage.local.get(['variables'], (d) => renderVariableTable(d.variables || []));
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.variables) {
      renderVariableTable(changes.variables.newValue || []);
    }
  });
  // TICKET-413: Autofill All button (stub generation)
  const autofillBtn = document.createElement('button');
  autofillBtn.textContent = 'Autofill All';
  autofillBtn.style.marginTop = '8px';
  autofillBtn.addEventListener('click', () => {
    chrome.storage.local.get(['variables'], (d) => {
      const arr = Array.isArray(d.variables) ? d.variables : [];
      const updated = arr.map(v => ({ ...v, draft: (v.draft || v.value || 'Draft text...'), __spinning: false }));
      chrome.storage.local.set({ variables: updated });
    });
  });
  container.appendChild(autofillBtn);
  // TICKET-505/514: Style badge with hover popover
  const badge = document.createElement('div');
  badge.setAttribute('role', 'status');
  badge.setAttribute('aria-live', 'polite');
  badge.style.marginTop = '8px';
  badge.style.display = 'inline-block';
  badge.style.padding = '4px 8px';
  badge.style.borderRadius = '12px';
  badge.style.background = '#eef';
  badge.style.cursor = 'default';
  badge.tabIndex = 0;
  const pop = document.createElement('div');
  pop.style.position = 'absolute';
  pop.style.padding = '8px';
  pop.style.background = '#fff';
  pop.style.border = '1px solid #ccc';
  pop.style.boxShadow = '0 2px 6px rgba(0,0,0,0.1)';
  pop.style.display = 'none';
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-label', 'Style score details');
  container.appendChild(badge);
  container.appendChild(pop);
  function updateBadge() {
    chrome.storage.local.get(['style_eval'], (d) => {
      const ev = d.style_eval || { score: 0.0, signals: { stylometry: 0, embedding: 0, authorship: 0 } };
      const pct = Math.round((ev.score || 0) * 100);
      badge.textContent = `Style match: ${pct}%`;
      badge.title = `Stylometry ${Math.round((ev.signals.stylometry||0)*100)}%, Embedding ${Math.round((ev.signals.embedding||0)*100)}%, Authorship ${Math.round((ev.signals.authorship||0)*100)}%`;
      pop.innerHTML = `<strong>Style breakdown</strong><br/>
        Stylometry: ${(ev.signals.stylometry||0).toFixed(2)}<br/>
        Embedding: ${(ev.signals.embedding||0).toFixed(2)}<br/>
        Authorship: ${(ev.signals.authorship||0).toFixed(2)}`;
    });
  }
  updateBadge();
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes.style_eval) updateBadge();
  });
  function showPop() { pop.style.display = 'block'; }
  function hidePop() { pop.style.display = 'none'; }
  badge.addEventListener('mouseenter', showPop);
  badge.addEventListener('focus', showPop);
  badge.addEventListener('mouseleave', hidePop);
  badge.addEventListener('blur', hidePop);
  // TICKET-506: Override dialog if below threshold
  const overrideBtn = document.createElement('button');
  overrideBtn.textContent = 'Override style check';
  overrideBtn.style.marginLeft = '8px';
  overrideBtn.addEventListener('click', () => {
    chrome.storage.local.get(['style_eval'], (d) => {
      const score = (d.style_eval && d.style_eval.score) || 0;
      if (score >= (window.StyleComposite && window.StyleComposite.DEFAULT_THRESHOLDS.warn || 0.65)) return;
      const reason = window.prompt('Style score is low. Provide a reason to proceed:');
      if (reason) {
        if (window.AuditLog && window.AuditLog.appendAuditLog) {
          window.AuditLog.appendAuditLog({ type: 'STYLE_OVERRIDE', score, reason }, () => {});
        }
        chrome.storage.local.set({ style_override: { ok: true, reason, score } });
      }
    });
  });
  container.appendChild(overrideBtn);
  // TICKET-512/513: A11y adjustments
  table.setAttribute('role', 'table');
  tbody.setAttribute('role', 'rowgroup');
  table.tabIndex = 0;
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


