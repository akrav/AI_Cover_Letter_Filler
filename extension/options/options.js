(function () {
  const form = document.getElementById('options-form');
  const apiKeyEl = document.getElementById('apiKey');
  const modelEl = document.getElementById('model');
  const budgetCapEl = document.getElementById('budgetCap');
  const strictnessEl = document.getElementById('strictness');
  const statusEl = document.getElementById('status');
  const schemaVersionEl = document.getElementById('schemaVersion');
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
    chrome.storage.local.get(['apiKey', 'model', 'budgetCap', 'strictness', 'schemaVersion'], (data) => {
      apiKeyEl.value = data.apiKey ? '********' : '';
      modelEl.value = data.model || 'gpt-4o-mini';
      budgetCapEl.value = typeof data.budgetCap === 'number' ? String(data.budgetCap) : '0.10';
      strictnessEl.value = data.strictness || 'balanced';
      schemaVersionEl.textContent = String(data.schemaVersion || 0);
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validate()) return;
    const newModel = modelEl.value;
    const newBudget = parseFloat(budgetCapEl.value || '0.10');
    const newStrictness = strictnessEl.value;
    const updates = { model: newModel, budgetCap: newBudget, strictness: newStrictness };
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
})();


