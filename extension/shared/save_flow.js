/* TICKET-408: Directory Picker + downloads fallback */
const SaveFlow = (() => {
  async function pickDirectoryHandle() {
    if (!('showDirectoryPicker' in window)) throw new Error('UNSUPPORTED');
    // @ts-ignore
    return await window.showDirectoryPicker();
  }
  async function saveBlobToHandle(handle, filename, blob) {
    // @ts-ignore
    const fileHandle = await handle.getFileHandle(filename, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
  }
  function downloadFallback(filename, blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }
  async function save(filename, blob) {
    try {
      const handle = await pickDirectoryHandle();
      await saveBlobToHandle(handle, filename, blob);
      return { ok: true, method: 'directory' };
    } catch {
      downloadFallback(filename, blob);
      return { ok: true, method: 'download' };
    }
  }
  return { save };
})();
window.SaveFlow = SaveFlow;


