/* TICKET-307: Evidence JSON schema & persistence */
const EvidenceStore = (() => {
  function makeRecord({ variableKey, quote, url, sourceTitle, score, ts }) {
    return {
      variable_key: variableKey,
      quote,
      url,
      source_title: sourceTitle || null,
      score: typeof score === 'number' ? score : null,
      created_at: ts || Date.now()
    };
  }
  function key(jobSessionId) { return `evidence:${jobSessionId}`; }
  function asyncGet(keys) {
    return new Promise(resolve => chrome.storage.local.get(keys, resolve));
  }
  function asyncSet(obj) {
    return new Promise(resolve => chrome.storage.local.set(obj, resolve));
  }
  async function load(jobSessionId) {
    const k = key(jobSessionId);
    const data = await asyncGet([k]);
    return Array.isArray(data[k]) ? data[k] : [];
  }
  async function save(jobSessionId, records) {
    const k = key(jobSessionId);
    await asyncSet({ [k]: records });
  }
  return { makeRecord, load, save };
})();
window.EvidenceStore = EvidenceStore;


