const Editor = (() => {
  let cm = null;

  function create(container, initialValue) {
    destroy();
    cm = CodeMirror(container, {
      value: initialValue || '',
      mode: 'python',
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      lineWrapping: true,
      extraKeys: {
        Tab: (c) => c.replaceSelection('    ', 'end')
      }
    });
    return cm;
  }

  function getValue() { return cm ? cm.getValue() : ''; }
  function setValue(v) { if (cm) cm.setValue(v); }
  function destroy() {
    if (cm) { cm.getWrapperElement().remove(); cm = null; }
  }

  return { create, getValue, setValue, destroy };
})();