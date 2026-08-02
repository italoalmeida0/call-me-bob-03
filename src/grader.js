/**
 * grader.js — Bob's little robot helper.
 *
 * Loads Pyodide (from the CDN script tag) and grades the player's code
 * entirely in the browser. Mirrors the trace style of a terminal grader:
 * for each test it reports the call, the expected value, what the player's
 * function returned, and OK/KO.
 */

const HARNESS = `
import copy as _bob_copy
import json as _bob_json
import ast as _bob_ast

def _bob_find_banned(user_src, banned_names, banned_attrs):
    try:
        tree = _bob_ast.parse(user_src)
    except Exception:
        return None  # syntax errors are reported by exec() later
    for node in _bob_ast.walk(tree):
        if isinstance(node, _bob_ast.Call):
            f = node.func
            if isinstance(f, _bob_ast.Name) and f.id in banned_names:
                return f.id + "()"
            if isinstance(f, _bob_ast.Attribute) and f.attr in banned_attrs:
                return "." + f.attr + "()"
    return None

def bob_grade(user_src, func_name, tests_literal, banned_literal):
    banned = _bob_json.loads(banned_literal)
    bad = _bob_find_banned(
        user_src,
        banned.get("names", []),
        banned.get("attrs", []),
    )
    if bad:
        return _bob_json.dumps({
            "fatal": f"Forbidden function '{bad}' detected. This chore bans it — read the rules and solve it by hand!"
        })

    ns = {}
    try:
        exec(user_src, ns)
    except Exception as e:
        return _bob_json.dumps({"fatal": f"{type(e).__name__}: {e}"})

    func = ns.get(func_name)
    if not callable(func):
        return _bob_json.dumps({
            "fatal": f"Function '{func_name}' not found. Check the 'def' line in the subject."
        })

    tests = eval(tests_literal)
    results = []
    for args, expected in tests:
        try:
            got = func(*_bob_copy.deepcopy(args))
            results.append({
                "ok": bool(got == expected),
                "expected": repr(expected),
                "got": repr(got),
                "error": None,
            })
        except Exception as e:
            results.append({
                "ok": False,
                "expected": repr(expected),
                "got": None,
                "error": f"{type(e).__name__}: {e}",
            })
    return _bob_json.dumps({"results": results})
`;

let pyodideInstance = null;

/**
 * Loads Pyodide and defines the grading harness.
 * onStatus(state, text): state is "loading" | "ready" | "error".
 */
export async function initBob(onStatus) {
  if (pyodideInstance) return pyodideInstance;

  const setStatus = (s, t) => onStatus && onStatus(s, t);

  setStatus("loading", "Waking up Bob's robot helper...");
  const pyodide = await loadPyodide();

  setStatus("loading", "Teaching the robot how to grade...");
  await pyodide.runPythonAsync(HARNESS);

  pyodideInstance = pyodide;
  setStatus("ready", "Robot helper ready");
  return pyodide;
}

function testsLiteral(exercise) {
  const items = exercise.tests.map((t) => `(${t.args}, ${t.expected})`);
  return `[${items.join(", ")}]`;
}

/**
 * Grades `code` against the exercise's test battery.
 * Returns:
 *   { fatal: string }                       — import/syntax/missing function
 *   { results: [{ok, expected, got, error}], passed: bool }
 */
export async function grade(code, exercise) {
  const pyodide = pyodideInstance;
  if (!pyodide) throw new Error("Grader not initialized");

  pyodide.globals.set("__bob_src", code);
  pyodide.globals.set("__bob_func", exercise.funcName);
  pyodide.globals.set("__bob_tests", testsLiteral(exercise));
  pyodide.globals.set(
    "__bob_banned",
    JSON.stringify(exercise.banned || {}),
  );

  const out = await pyodide.runPythonAsync(
    "bob_grade(__bob_src, __bob_func, __bob_tests, __bob_banned)",
  );
  const data = JSON.parse(out);

  if (data.fatal) return data;

  const results = data.results.map((r, i) => ({
    ...r,
    call: exercise.tests[i].call,
  }));
  return { results, passed: results.every((r) => r.ok) };
}
