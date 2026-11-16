const PythonRunner = (() => {
  let worker = null;
  let readyPromise = null;
  let pending = new Map();
  let msgId = 0;

  function init() {
    if (readyPromise) return readyPromise;
    readyPromise = new Promise((resolve, reject) => {
      worker = new Worker('worker/pyodide-worker.js');
      worker.onmessage = (e) => {
        const m = e.data;
        if (m.type === 'ready') { resolve(); return; }
        if (m.type === 'init-error') { reject(new Error(m.error)); return; }
        if (m.type === 'result' || m.type === 'error') {
          const p = pending.get(m.id);
          if (p) { pending.delete(m.id); p(m); }
        }
      };
      worker.onerror = (e) => reject(new Error('Worker error: ' + e.message));
      worker.postMessage({ type: 'init' });
    });
    return readyPromise;
  }

  function terminate() {
    if (worker) { worker.terminate(); worker = null; }
    readyPromise = null;
    pending.forEach(p => p({ type: 'error', error: 'terminated' }));
    pending.clear();
  }

  async function run(code, opts = {}) {
    const {
      stdin = [], seed = null, timeout = 10000,
      inspectVars = [], inspectAst = false
    } = opts;
    await init();
    const id = ++msgId;
    return new Promise((resolve) => {
      let settled = false;
      const timer = setTimeout(() => {
        if (settled) return;
        settled = true;
        pending.delete(id);
        terminate();
        resolve({
          timeout: true, out: '', err: '', error: null,
          ast: null, astError: null, vars: {}
        });
      }, timeout);

      pending.set(id, (msg) => {
        if (settled) return;
        settled = true;
        clearTimeout(timer);
        if (msg.type === 'error') resolve({
          timeout: false, out: '', err: '', error: msg.error,
          ast: null, astError: null, vars: {}
        });
        else resolve(msg);
      });

      worker.postMessage({ type: 'run', id, code, stdin, seed, inspectVars, inspectAst });
    });
  }

  return { init, run, terminate };
})();