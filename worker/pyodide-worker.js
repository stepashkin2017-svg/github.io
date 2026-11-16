importScripts('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js');

let pyodide = null;

self.onmessage = async (e) => {
  const { type, id } = e.data;

  if (type === 'init') {
    try {
      pyodide = await loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
      });
      self.postMessage({ type: 'ready' });
    } catch (err) {
      self.postMessage({ type: 'init-error', error: String(err) });
    }
    return;
  }

  if (type === 'run') {
    const { code, stdin = [], seed = null, inspectVars = [], inspectAst = false } = e.data;
    try {
      const result = await execute(code, stdin, seed, inspectVars, inspectAst);
      self.postMessage({ type: 'result', id, ...result });
    } catch (err) {
      self.postMessage({ type: 'error', id, error: String(err) });
    }
  }
};

async function execute(code, stdin, seed, inspectVars, inspectAst) {
  let astData = null;
  let astError = null;

  // 1. AST first (before run, so runtime errors don't hide structure)
  if (inspectAst) {
    pyodide.globals.set('__pykids_code__', code);
    try {
      const raw = pyodide.runPython(`
import ast, json
try:
    _tree = ast.parse(__pykids_code__)
    _calls = []
    for _n in ast.walk(_tree):
        if isinstance(_n, ast.Call):
            _f = _n.func
            _parts = []
            while isinstance(_f, ast.Attribute):
                _parts.append(_f.attr)
                _f = _f.value
            if isinstance(_f, ast.Name):
                _parts.append(_f.id)
            _calls.append(".".join(reversed(_parts)))
    _constructs = {
        "for_loop": any(isinstance(n, ast.For) for n in ast.walk(_tree)),
        "while_loop": any(isinstance(n, ast.While) for n in ast.walk(_tree)),
        "function_def": any(isinstance(n, ast.FunctionDef) for n in ast.walk(_tree)),
        "class_def": any(isinstance(n, ast.ClassDef) for n in ast.walk(_tree)),
        "if": any(isinstance(n, ast.If) for n in ast.walk(_tree)),
        "return": any(isinstance(n, ast.Return) for n in ast.walk(_tree)),
        "list_comp": any(isinstance(n, ast.ListComp) for n in ast.walk(_tree)),
    }
    json.dumps({"calls": _calls, "constructs": _constructs})
except SyntaxError as e:
    json.dumps({"error": str(e)})
      `);
      const parsed = JSON.parse(raw);
      if (parsed.error) astError = parsed.error;
      else astData = parsed;
    } catch (err) {
      astError = String(err);
    }
  }

  // 2. Capture stdout / stderr
  let stdout = '';
  let stderr = '';
  pyodide.setStdout({ batched: (s) => { stdout += s + '\n'; } });
  pyodide.setStderr({ batched: (s) => { stderr += s + '\n'; } });

  // 3. Setup stdin & seed
  pyodide.globals.set('__pykids_stdin__', pyodide.toPy(stdin || []));
  pyodide.globals.set('__pykids_code__', code);
  pyodide.globals.set('__pykids_inspect_vars__', pyodide.toPy(inspectVars || []));

  let runError = null;
  try {
    await pyodide.runPythonAsync(`
import builtins, json
__pykids_iter__ = iter(__pykids_stdin__)
def __pykids_input__(prompt=''):
    try:
        return next(__pykids_iter__)
    except StopIteration:
        return ''
builtins.input = __pykids_input__
`);
    if (seed !== null && seed !== undefined) {
      await pyodide.runPythonAsync(`import random\nrandom.seed(${Number(seed)})`);
    }
    await pyodide.runPythonAsync(code);
  } catch (err) {
    runError = String(err);
  }

  // 4. Inspect variables (after run)
  let vars = {};
  if (inspectVars && inspectVars.length) {
    try {
      const raw = pyodide.runPython(`
import json
def _serialize(_v):
    if isinstance(_v, bool) or _v is None:
        return {"type": type(_v).__name__, "value": _v}
    if isinstance(_v, (int, float, str)):
        return {"type": type(_v).__name__, "value": _v}
    if isinstance(_v, list):
        return {"type": "list", "value": list(_v), "length": len(_v)}
    if isinstance(_v, dict):
        return {"type": "dict", "value": {str(k): v for k, v in _v.items()}, "length": len(_v)}
    return {"type": type(_v).__name__, "value": None}
_res = {}
for _name in __pykids_inspect_vars__:
    if _name in globals():
        try:
            _res[_name] = _serialize(globals()[_name])
        except Exception:
            pass
json.dumps(_res)
      `);
      vars = JSON.parse(raw);
    } catch (err) { /* ignore inspect errors */ }
  }

  return {
    out: stdout,
    err: stderr,
    error: runError,
    ast: astData,
    astError: astError,
    vars: vars
  };
}