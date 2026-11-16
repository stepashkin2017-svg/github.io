const Checker = (() => {

  function normalize(s, opts = {}) {
    let r = String(s).replace(/\r\n/g, '\n');
    if (opts.trimLines !== false) r = r.split('\n').map(l => l.trimEnd()).join('\n');
    if (opts.trimOverall !== false) r = r.trim();
    if (opts.caseInsensitive) r = r.toLowerCase();
    return r;
  }

  function firstDiff(a, b) {
    const la = a.split('\n'), lb = b.split('\n');
    for (let i = 0; i < Math.max(la.length, lb.length); i++) {
      if (la[i] !== lb[i]) return { line: i + 1, got: la[i] ?? '', expected: lb[i] ?? '' };
    }
    return null;
  }

  async function runChecks(code, checks) {
    const results = [];
    for (const check of checks) {
      let r;
      try { r = await runSingle(code, check); }
      catch (e) { r = { ok: false, kind: 'internal_error', error: String(e) }; }
      results.push({ check, result: r });
      if (!r.ok) return { ok: false, failed: r, results };
    }
    return { ok: true, results };
  }

  async function runSingle(code, check) {
    switch (check.type) {
      case 'no_error':          return checkNoError(code);
      case 'output':            return checkOutput(code, check);
      case 'output_multi':      return checkOutputMulti(code, check);
      case 'contains_construct': return checkConstructs(code, check);
      case 'variable_value':    return checkVariables(code, check);
      case 'function_behavior': return checkFunction(code, check);
      case 'random_deterministic': return checkRandom(code, check);
      case 'ast_static':        return checkAstStatic(code, check);
      default: return { ok: false, kind: 'unknown_check', type: check.type };
    }
  }

  async function checkNoError(code) {
    const res = await PythonRunner.run(code, { timeout: 10000 });
    if (res.timeout) return { ok: false, kind: 'timeout' };
    if (res.error) return { ok: false, kind: 'runtime_error', error: res.error };
    return { ok: true, out: res.out };
  }

  async function checkOutput(code, check) {
    const res = await PythonRunner.run(code, {
      stdin: check.stdin || [], timeout: 10000
    });
    if (res.timeout) return { ok: false, kind: 'timeout' };
    if (res.error) return { ok: false, kind: 'runtime_error', error: res.error };
    const got = normalize(res.out, check.normalize);
    const expected = normalize(check.expected, check.normalize);
    if (got === expected) return { ok: true };
    return {
      ok: false, kind: 'wrong_output',
      got: res.out, expected: check.expected,
      diff: firstDiff(got, expected)
    };
  }

  async function checkOutputMulti(code, check) {
    for (const c of check.cases) {
      const res = await PythonRunner.run(code, {
        stdin: c.stdin, timeout: 10000
      });
      if (res.timeout) return { ok: false, kind: 'timeout', case: c };
      if (res.error) return { ok: false, kind: 'runtime_error', error: res.error, case: c };
      const got = normalize(res.out, check.normalize);
      const expected = normalize(c.expected, check.normalize);
      if (got !== expected) return {
        ok: false, kind: 'wrong_output', case: c,
        got: res.out, expected: c.expected,
        diff: firstDiff(got, expected)
      };
    }
    return { ok: true };
  }

  async function checkConstructs(code, check) {
    const res = await PythonRunner.run(code, { inspectAst: true, timeout: 10000 });
    if (res.timeout) return { ok: false, kind: 'timeout' };
    if (res.astError) return { ok: false, kind: 'syntax_error', error: res.astError };
    const found = res.ast?.constructs || {};
    const missing = check.constructs.filter(c => !found[c]);
    if (missing.length === 0) return { ok: true };
    return { ok: false, kind: 'missing_construct', missing };
  }

  async function checkVariables(code, check) {
    const names = Object.keys(check.spec);
    const res = await PythonRunner.run(code, {
      stdin: check.stdin || [], inspectVars: names, timeout: 10000
    });
    if (res.timeout) return { ok: false, kind: 'timeout' };
    if (res.error) return { ok: false, kind: 'runtime_error', error: res.error };
    const vars = res.vars || {};
    for (const [name, rule] of Object.entries(check.spec)) {
      if (!(name in vars)) return { ok: false, kind: 'missing_variable', name };
      const v = vars[name];
      if (rule.type && v.type !== rule.type)
        return { ok: false, kind: 'wrong_type', name, expected: rule.type, got: v.type };
      if (rule.value !== undefined && v.value !== rule.value)
        return { ok: false, kind: 'wrong_value', name, expected: rule.value, got: v.value };
      if (rule.length !== undefined && v.length !== rule.length)
        return { ok: false, kind: 'wrong_length', name, expected: rule.length, got: v.length };
    }
    return { ok: true };
  }

  async function checkFunction(code, check) {
    const script = `
import io, sys, json

def __run_test__():
    _old = sys.stdout
    sys.stdout = io.StringIO()
    try:
        _ns = {}
        exec(__user_code__, _ns)
        _user_out = sys.stdout.getvalue()
    except Exception as e:
        sys.stdout = _old
        return {"stage": "exec", "error": str(e)}
    finally:
        sys.stdout = _old
    if __fn_name__ not in _ns:
        return {"stage": "missing_function", "name": __fn_name__}
    _fn = _ns[__fn_name__]
    _res = []
    for _case in json.loads(__test_cases__):
        try:
            _got = _fn(*_case["args"])
            _res.append({"ok": True, "got": _got})
        except Exception as e:
            _res.append({"ok": False, "error": str(e)})
    return {"user_output": _user_out, "results": _res}

print(json.dumps(__run_test__(), default=str))
`;
    const wrapper = `
__user_code__ = ${JSON.stringify(code)}
__fn_name__ = ${JSON.stringify(check.fn)}
__test_cases__ = ${JSON.stringify(JSON.stringify(check.cases))}
${script}
`;
    const res = await PythonRunner.run(wrapper, { timeout: 10000 });
    if (res.timeout) return { ok: false, kind: 'timeout' };
    if (res.error) return { ok: false, kind: 'runtime_error', error: res.error };
    let parsed;
    try { parsed = JSON.parse(res.out.trim().split('\n').pop()); }
    catch { return { ok: false, kind: 'internal_error', error: 'parse failed' }; }
    if (parsed.stage === 'exec') return { ok: false, kind: 'runtime_error', error: parsed.error };
    if (parsed.stage === 'missing_function')
      return { ok: false, kind: 'missing_function', name: parsed.name };
    for (let i = 0; i < check.cases.length; i++) {
      const r = parsed.results[i], tc = check.cases[i];
      if (!r.ok) return { ok: false, kind: 'runtime_error', error: r.error };
      if (JSON.stringify(r.got) !== JSON.stringify(tc.expected))
        return {
          ok: false, kind: 'wrong_return',
          fn: check.fn, args: tc.args,
          expected: tc.expected, got: r.got
        };
    }
    return { ok: true };
  }

  async function checkRandom(code, check) {
    const res = await PythonRunner.run(code, {
      stdin: check.stdin || [], seed: check.seed ?? 42, timeout: 10000
    });
    if (res.timeout) return { ok: false, kind: 'timeout' };
    if (res.error) return { ok: false, kind: 'runtime_error', error: res.error };
    const got = normalize(res.out);
    const expected = normalize(check.expected);
    if (got === expected) return { ok: true };
    return { ok: false, kind: 'wrong_output', got: res.out, expected: check.expected };
  }

  async function checkAstStatic(code, check) {
    const rules = check.rules || {};
    const res = await PythonRunner.run(code, { inspectAst: true, timeout: 10000 });
    if (res.astError) return { ok: false, kind: 'syntax_error', error: res.astError };
    const data = res.ast || { calls: [], constructs: {} };
    const missing = [];
    for (const c of rules.required_calls || []) {
      if (!data.calls.some(x => x === c || x.startsWith(c + '.')))
        missing.push({ type: 'call', name: c });
    }
    for (const c of rules.required_constructs || []) {
      if (!data.constructs[c]) missing.push({ type: 'construct', name: c });
    }
    if (missing.length === 0) return { ok: true };
    return { ok: false, kind: 'missing_in_code', missing };
  }

  function buildFeedback(failure) {
    const k = failure.kind;
    const map = {
      runtime_error: () =>
        `Ой! Программа упала с ошибкой:\n${failure.error}\n\n${errorAdvice(failure.error)}`,
      wrong_output: () => {
        if (failure.diff) {
          return `Твой вывод отличается.\n\nСтрока ${failure.diff.line}:\n  Ожидалось: "${failure.diff.expected}"\n  Получилось: "${failure.diff.got}"`;
        }
        return `Твой вывод отличается.\nОжидалось: "${failure.expected}"\nПолучилось: "${failure.got}"`;
      },
      missing_construct: () =>
        `В коде не хватает: ${failure.missing.join(', ')}.`,
      missing_variable: () =>
        `Переменная «${failure.name}» не найдена. Ты её создал?`,
      wrong_type: () =>
        `Переменная «${failure.name}» имеет тип ${failure.got}, а нужен ${failure.expected}.\n${failure.got === 'str' ? 'Убери кавычки!' : ''}`,
      wrong_value: () =>
        `Переменная «${failure.name}» = ${JSON.stringify(failure.got)}, а нужно ${JSON.stringify(failure.expected)}.`,
      wrong_length: () =>
        `У «${failure.name}» длина ${failure.got}, а нужна ${failure.expected}.`,
      wrong_return: () =>
        `Функция ${failure.fn}(${failure.args.join(', ')}) вернула ${JSON.stringify(failure.got)}, ожидалось ${JSON.stringify(failure.expected)}.`,
      missing_in_code: () =>
        `В коде не найдено: ${failure.missing.map(m => m.name).join(', ')}.`,
      missing_function: () =>
        `Функция «${failure.name}» не определена.`,
      syntax_error: () =>
        `Синтаксическая ошибка:\n${failure.error}\n\nПроверь скобки, кавычки и двоеточия.`,
      timeout: () =>
        `Похоже, программа зациклилась. Проверь, меняется ли условие в цикле?`,
      unknown_check: () =>
        `Неизвестный тип проверки: ${failure.type}.`
    };
    return (map[k] || (() => `Проверка не пройдена: ${k}`))();
  }

  function errorAdvice(err) {
    if (/SyntaxError/.test(err)) return 'Проверь кавычки, скобки и двоеточия.';
    if (/NameError/.test(err)) return 'Переменная не создана или опечатка в имени.';
    if (/IndentationError/.test(err)) return 'Проверь отступы — они должны быть одинаковыми.';
    if (/TypeError/.test(err)) return 'Возможно, ты смешал число и строку. Попробуй int() или str().';
    if (/ValueError/.test(err)) return 'Проверь, что вводишь число, если ожидается число.';
    return '';
  }

  return { runChecks, buildFeedback };
})();