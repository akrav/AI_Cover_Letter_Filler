/* TICKET-405: Approval state machine & persistence */
const Approval = (() => {
  function isReadyToExport(variables, requiredKeys) {
    const map = new Map((variables||[]).map(v => [v.key, v]));
    for (const k of (requiredKeys||[])) {
      const v = map.get(k);
      if (!v || !v.approved) return false;
    }
    return true;
  }
  function resetOnEdit(v) {
    return { ...v, approved: false };
  }
  return { isReadyToExport, resetOnEdit };
})();
window.Approval = Approval;


