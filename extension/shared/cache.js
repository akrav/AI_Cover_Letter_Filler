/* TICKET-310: Per-job caching & snapshot store */
const Cache = (() => {
  function key(jobSessionId) { return `cache:${jobSessionId}`; }
  function asyncGet(k) { return new Promise(r => chrome.storage.local.get([k], r)); }
  function asyncSet(obj) { return new Promise(r => chrome.storage.local.set(obj, r)); }
  async function addSnapshot(jobSessionId, url, html) {
    const k = key(jobSessionId);
    const data = await asyncGet(k);
    const arr = Array.isArray(data[k]) ? data[k] : [];
    arr.push({ url, html, ts: Date.now() });
    await asyncSet({ [k]: arr });
  }
  async function getSnapshots(jobSessionId, ttlDays) {
    const k = key(jobSessionId);
    const data = await asyncGet(k);
    let arr = Array.isArray(data[k]) ? data[k] : [];
    if (typeof ttlDays === 'number') {
      const cutoff = Date.now() - ttlDays*24*60*60*1000;
      arr = arr.filter(s => s.ts >= cutoff);
    }
    return arr;
  }
  return { addSnapshot, getSnapshots };
})();
window.Cache = Cache;


