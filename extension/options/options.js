(function () {
  const form = document.getElementById('options-form');
  const apiKeyEl = document.getElementById('apiKey');
  const modelEl = document.getElementById('model');
  const budgetCapEl = document.getElementById('budgetCap');
  const strictnessEl = document.getElementById('strictness');
  const statusEl = document.getElementById('status');
  const schemaVersionEl = document.getElementById('schemaVersion');
  const telemetryOptInEl = document.getElementById('telemetryOptIn');
  const retentionDaysEl = document.getElementById('retentionDays');
  const exportTelemetryBtn = document.getElementById('exportTelemetry');
  const clearTelemetryBtn = document.getElementById('clearTelemetry');
  const hotkeyEl = document.getElementById('hotkey');
  const onboardingModal = document.getElementById('onboardingModal');
  const startOnboardingBtn = document.getElementById('startOnboarding');
  const completeOnboardingBtn = document.getElementById('completeOnboarding');
  const cancelOnboardingBtn = document.getElementById('cancelOnboarding');
  const onboardingStatusEl = document.getElementById('onboardingStatus');
  const clearAllDataBtn = document.getElementById('clearAllData');
  const exportSettingsBtn = document.getElementById('exportSettings');
  const importSettingsBtn = document.getElementById('importSettings');
  const importSettingsFileEl = document.getElementById('importSettingsFile');
  const apiKeyErrorEl = document.getElementById('apiKeyError');
  const budgetCapErrorEl = document.getElementById('budgetCapError');

  function show(el) { el.style.display = ''; }
  function hide(el) { el.style.display = 'none'; }

  function validate() {
    let ok = true;
    hide(apiKeyErrorEl);
    hide(budgetCapErrorEl);
    const budget = parseFloat(budgetCapEl.value || '0');
    if (Number.isNaN(budget) || budget < 0) {
      budgetCapErrorEl.textContent = 'Budget must be a non-negative number';
      show(budgetCapErrorEl);
      ok = false;
    }
    return ok;
  }

  function load() {
    chrome.storage.local.get(['apiKey', 'model', 'budgetCap', 'strictness', 'schemaVersion', 'telemetryOptIn', 'hotkey', 'retentionDays'], (data) => {
      apiKeyEl.value = data.apiKey ? '********' : '';
      modelEl.value = data.model || 'gpt-4o-mini';
      budgetCapEl.value = typeof data.budgetCap === 'number' ? String(data.budgetCap) : '0.10';
      strictnessEl.value = data.strictness || 'balanced';
      schemaVersionEl.textContent = String(data.schemaVersion || 0);
      telemetryOptInEl.checked = !!data.telemetryOptIn;
      hotkeyEl.value = data.hotkey || 'Ctrl+Shift+K';
      retentionDaysEl.value = String(data.retentionDays || 90);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newModel = modelEl.value;
    const newBudget = parseFloat(budgetCapEl.value || '0.10');
    const newStrictness = strictnessEl.value;
    const updates = { model: newModel, budgetCap: newBudget, strictness: newStrictness, telemetryOptIn: !!telemetryOptInEl.checked, hotkey: hotkeyEl.value || 'Ctrl+Shift+K', retentionDays: parseInt(retentionDaysEl.value || '90', 10) };
    // Only update apiKey if user entered non-empty visible value (avoid revealing/storing masked)
    const enteredKey = apiKeyEl.value;
    if (enteredKey && enteredKey !== '********') {
      updates.apiKey = enteredKey;
    }
    chrome.storage.local.set(updates, () => {
      hide(apiKeyErrorEl);
      show(statusEl);
      setTimeout(() => hide(statusEl), 1500);
    });
  });

  load();

  exportTelemetryBtn.addEventListener('click', () => {
    window.Telemetry && window.Telemetry.exportJson((json) => {
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'telemetry.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  });
  clearTelemetryBtn.addEventListener('click', () => {
    window.Telemetry && window.Telemetry.clear(() => {
      show(statusEl);
      statusEl.textContent = 'Cleared';
      setTimeout(() => { statusEl.textContent = 'Saved'; hide(statusEl); }, 1500);
    });
  });

  // Onboarding wizard
  startOnboardingBtn.addEventListener('click', () => {
    onboardingModal.style.display = '';
  });
  cancelOnboardingBtn.addEventListener('click', () => {
    onboardingModal.style.display = 'none';
  });
  completeOnboardingBtn.addEventListener('click', () => {
    // Save current form values as part of onboarding
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    show(onboardingStatusEl);
    setTimeout(() => {
      onboardingModal.style.display = 'none';
      hide(onboardingStatusEl);
    }, 1200);
  });

  // Clear all local data
  clearAllDataBtn.addEventListener('click', () => {
    if (!confirm('Are you sure you want to clear all local data for this extension? This cannot be undone.')) {
      return;
    }
    chrome.storage.local.clear(() => {
      // Reflect cleared state in UI
      apiKeyEl.value = '';
      modelEl.value = 'gpt-4o-mini';
      budgetCapEl.value = '0.10';
      strictnessEl.value = 'balanced';
      telemetryOptInEl.checked = false;
      hotkeyEl.value = 'Ctrl+Shift+K';
      schemaVersionEl.textContent = '0';
      show(statusEl);
      statusEl.textContent = 'All data cleared';
      setTimeout(() => { statusEl.textContent = 'Saved'; hide(statusEl); }, 1800);
    });
  });

  // Export/Import settings (JSON)
  exportSettingsBtn.addEventListener('click', () => {
    chrome.storage.local.get(['model', 'budgetCap', 'strictness', 'telemetryOptIn', 'hotkey', 'retentionDays', 'styleProfile'], (data) => {
      // Exclude apiKey and any service role keys by design
      const payload = {
        version: 1,
        settings: {
          model: data.model || 'gpt-4o-mini',
          budgetCap: typeof data.budgetCap === 'number' ? data.budgetCap : 0.10,
          strictness: data.strictness || 'balanced',
          telemetryOptIn: !!data.telemetryOptIn,
          hotkey: data.hotkey || 'Ctrl+Shift+K',
          retentionDays: data.retentionDays || 90
        },
        // styleProfile optional passthrough
        styleProfile: data.styleProfile || null
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'settings.json';
      a.click();
      URL.revokeObjectURL(url);
    });
  });
  importSettingsBtn.addEventListener('click', () => {
    const file = importSettingsFileEl.files && importSettingsFileEl.files[0];
    if (!file) {
      alert('Choose a JSON file to import.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(String(e.target.result || '{}'));
        if (!json || typeof json !== 'object' || !json.settings) throw new Error('Invalid schema');
        const s = json.settings;
        const updates = {};
        if (typeof s.model === 'string') updates.model = s.model;
        if (typeof s.budgetCap === 'number' && s.budgetCap >= 0) updates.budgetCap = s.budgetCap;
        if (typeof s.strictness === 'string') updates.strictness = s.strictness;
        if (typeof s.telemetryOptIn === 'boolean') updates.telemetryOptIn = s.telemetryOptIn;
        if (typeof s.hotkey === 'string') updates.hotkey = s.hotkey;
        if (typeof s.retentionDays === 'number') updates.retentionDays = s.retentionDays;
        // Never import service role keys; ignore apiKey if present
        if (json.styleProfile && typeof json.styleProfile === 'object') {
          // Optional: store styleProfile
          updates.styleProfile = json.styleProfile;
        }
        chrome.storage.local.set(updates, () => {
          show(statusEl);
          statusEl.textContent = 'Settings imported';
          setTimeout(() => { statusEl.textContent = 'Saved'; hide(statusEl); }, 1500);
          load();
        });
      } catch (err) {
        alert('Import failed: ' + (err && err.message ? err.message : 'Invalid JSON'));
      }
    };
    reader.readAsText(file);
  });
})();


