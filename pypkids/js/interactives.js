const Interactives = (() => {
  function render(container, data) {
    if (!data || !data.type) return;
    
    if (data.type === 'build_code') renderBuildCode(container, data);
    else if (data.type === 'find_error') renderFindError(container, data);
    else if (data.type === 'step_by_step') renderStepByStep(container, data);
    else if (data.type === 'quiz') renderQuiz(container, data);
  }

  function renderBuildCode(container, data) {
    let currentLines = [...data.shuffled];
    let selectedLines = [];
    
    function draw() {
      container.innerHTML = `
        <div style="background:var(--color-surface-2);padding:16px;border-radius:12px;border:1px solid var(--color-border);">
          <h4 style="margin-top:0;color:#93c5fd;">${data.title}</h4>
          <p style="color:var(--color-text-muted);margin-bottom:16px;font-size:14px;">${data.instruction}</p>
          <div style="display:flex;gap:16px;flex-wrap:wrap;">
            <div style="flex:1;min-width:200px;">
              <p style="font-size:12px;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:8px;">Доступные строки</p>
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${currentLines.map((line, i) => `
                  <button class="btn-secondary" style="text-align:left;font-family:var(--font-mono);font-size:14px;" onclick="Interactives._moveToSelected(${i})">${line}</button>
                `).join('')}
                ${currentLines.length === 0 ? '<p style="color:var(--color-text-muted);font-size:13px;">Все строки использованы</p>' : ''}
              </div>
            </div>
            <div style="flex:1;min-width:200px;">
              <p style="font-size:12px;text-transform:uppercase;color:var(--color-text-muted);margin-bottom:8px;">Твой код</p>
              <div style="display:flex;flex-direction:column;gap:8px;min-height:100px;background:var(--color-bg);padding:12px;border-radius:8px;border:1px dashed var(--color-border-hover);">
                ${selectedLines.map((line, i) => `
                  <button class="btn-secondary" style="text-align:left;font-family:var(--font-mono);font-size:14px;background:var(--color-surface-2);" onclick="Interactives._moveToShuffled(${i})">${line}</button>
                `).join('')}
              </div>
            </div>
          </div>
          <div style="margin-top:16px;display:flex;gap:8px;align-items:center;">
            <button class="btn-primary btn-small" onclick="Interactives._checkBuildCode()">Проверить</button>
            <span id="build-code-feedback" style="font-size:14px;font-weight:600;"></span>
          </div>
        </div>
      `;
    }

    Interactives._moveToSelected = (i) => { Engagement.soundClick(); selectedLines.push(currentLines[i]); currentLines.splice(i, 1); draw(); };
    Interactives._moveToShuffled = (i) => { Engagement.soundClick(); currentLines.push(selectedLines[i]); selectedLines.splice(i, 1); draw(); };
    Interactives._checkBuildCode = () => {
      const fb = document.getElementById('build-code-feedback');
      if (JSON.stringify(selectedLines) === JSON.stringify(data.lines)) {
        fb.textContent = '✅ Верно!'; fb.style.color = 'var(--color-success)'; Engagement.soundSuccess();
      } else {
        fb.textContent = '❌ Не совсем. Попробуй ещё раз.'; fb.style.color = 'var(--color-danger)'; Engagement.soundError();
      }
    };
    draw();
  }

  function renderFindError(container, data) {
    const lines = data.code.split('\n');
    container.innerHTML = `
      <div style="background:var(--color-surface-2);padding:16px;border-radius:12px;border:1px solid var(--color-border);">
        <h4 style="margin-top:0;color:#93c5fd;">${data.title}</h4>
        <p style="color:var(--color-text-muted);margin-bottom:16px;font-size:14px;">${data.instruction}</p>
        <div style="background:#0a0e1a;border-radius:8px;padding:16px;font-family:var(--font-mono);font-size:14px;line-height:1.8;">
          ${lines.map((line, i) => `
            <div style="cursor:pointer;padding:4px 8px;border-radius:4px;display:flex;gap:12px;transition:background 0.15s;" 
                 onclick="Interactives._checkError(${i}, ${data.errorLine}, this)" onmouseover="this.style.background='rgba(59,130,246,0.1)'" onmouseout="if(!this.dataset.found)this.style.background='transparent'">
              <span style="color:#475569;user-select:none;">${i + 1}</span>
              <span>${line || ' '}</span>
            </div>
          `).join('')}
        </div>
        <p id="find-error-feedback" style="margin-top:16px;display:none;padding:12px;border-radius:8px;background:var(--color-surface);border-left:4px solid var(--color-warning);font-size:14px;"></p>
      </div>
    `;
    
    Interactives._checkError = (lineIdx, errorLine, el) => {
      Engagement.soundClick();
      const fb = document.getElementById('find-error-feedback');
      if (lineIdx === errorLine) {
        el.style.background = 'rgba(239,68,68,0.2)'; el.dataset.found = '1';
        fb.style.display = 'block';
        fb.innerHTML = `<strong>✅ Ты нашёл ошибку!</strong><br><br>${data.explanation}`;
        fb.style.borderLeftColor = 'var(--color-danger)';
        Engagement.soundSuccess();
      } else {
        el.style.background = 'rgba(239,68,68,0.1)';
        fb.style.display = 'block';
        fb.textContent = '❌ Это не ошибочная строка. Попробуй ещё.';
        fb.style.borderLeftColor = 'var(--color-danger)';
        Engagement.soundError();
      }
    };
  }

  function renderStepByStep(container, data) {
    let stepIdx = 0;
    const lines = data.code.split('\n');
    
    function draw() {
      container.innerHTML = `
        <div style="background:var(--color-surface-2);padding:16px;border-radius:12px;border:1px solid var(--color-border);">
          <h4 style="margin-top:0;color:#93c5fd;">${data.title}</h4>
          <div style="background:#0a0e1a;border-radius:8px;padding:16px;font-family:var(--font-mono);font-size:14px;line-height:1.8;margin-bottom:16px;border:1px solid var(--color-border);">
            ${lines.map((line, i) => {
              let highlight = 'transparent';
              if (stepIdx < data.steps.length && data.steps[stepIdx].line === i) highlight = 'rgba(59,130,246,0.3)';
              return `
                <div style="padding:4px 8px;border-radius:4px;background:${highlight};transition:background 0.3s;display:flex;gap:12px;">
                  <span style="color:#475569;user-select:none;">${i + 1}</span>
                  <span>${line || ' '}</span>
                </div>
              `;
            }).join('')}
          </div>
          <div style="min-height:60px;background:var(--color-bg);padding:12px;border-radius:8px;border:1px solid var(--color-border);margin-bottom:16px;font-size:14px;">
            ${stepIdx > 0 && stepIdx <= data.steps.length ? `
              <p style="margin:0;"><strong style="color:var(--color-primary);">Шаг ${stepIdx}:</strong> ${data.steps[stepIdx - 1].desc}</p>
            ` : stepIdx === 0 ? `
              <p style="margin:0;color:var(--color-text-muted);">Нажми «Начать», чтобы увидеть, как работает код.</p>
            ` : `
              <p style="margin:0;color:var(--color-success);"><strong>Готово!</strong> Ты разобрал весь пример.</p>
            `}
          </div>
          <button class="btn-primary btn-small" onclick="Interactives._nextStep()" ${stepIdx >= data.steps.length ? 'disabled' : ''}>
            ${stepIdx === 0 ? '▶ Начать' : stepIdx < data.steps.length ? '▶ Следующий шаг' : '✓ Завершено'}
          </button>
        </div>
      `;
    }
    
    Interactives._nextStep = () => {
      if (stepIdx < data.steps.length) { stepIdx++; Engagement.soundClick(); draw(); }
    };
    draw();
  }

  function renderQuiz(container, data) {
    let answered = false;
    container.innerHTML = `
      <div style="background:var(--color-surface);padding:16px;border-radius:12px;border:1px solid var(--color-border);margin-bottom:12px;">
        <p style="font-weight:600;margin-bottom:12px;font-size:16px;">${data.question}</p>
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${data.options.map((opt, i) => `
            <button class="btn-secondary" style="text-align:left;justify-content:flex-start;padding:12px 16px;" onclick="Interactives._answerQuiz(${i}, ${data.correct}, this)">${opt}</button>
          `).join('')}
        </div>
        <p id="quiz-feedback" style="margin-top:12px;display:none;font-weight:600;"></p>
      </div>
    `;
    
    Interactives._answerQuiz = (idx, correct, btn) => {
      if (answered) return;
      answered = true;
      const fb = document.getElementById('quiz-feedback');
      fb.style.display = 'block';
      if (idx === correct) {
        btn.style.background = 'rgba(16,185,129,0.2)'; btn.style.borderColor = 'var(--color-success)';
        fb.textContent = '✅ Верно!'; fb.style.color = 'var(--color-success)'; Engagement.soundSuccess();
      } else {
        btn.style.background = 'rgba(239,68,68,0.2)'; btn.style.borderColor = 'var(--color-danger)';
        fb.textContent = '❌ Не совсем. Правильный ответ подсвечен зелёным.'; fb.style.color = 'var(--color-danger)';
        const options = btn.parentElement.children;
        options[correct].style.background = 'rgba(16,185,129,0.2)';
        options[correct].style.borderColor = 'var(--color-success)';
        Engagement.soundError();
      }
    };
  }
    function renderSandbox(container) {
    let vars = {};
    let log = [];
    
    function esc(s) {
      return String(s).replace(/[&<>"]/g, function(c) {
        return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];
      });
    }

    function draw() {
      container.innerHTML = `
        <div class="sandbox-wrapper">
          <div class="sandbox-controls">
            <button class="sandbox-btn primary" data-var="name" data-val="'Пик'" data-type="str">name = 'Пик'</button>
            <button class="sandbox-btn" data-var="name" data-val="'Робо'" data-type="str">name = 'Робо'</button>
            <button class="sandbox-btn" data-var="age" data-val="1" data-type="int">age = 1</button>
            <button class="sandbox-btn" data-var="age" data-val="2" data-type="int">age = 2</button>
            <button class="sandbox-btn" data-var="height" data-val="0.5" data-type="float">height = 0.5</button>
            <button class="sandbox-btn" data-var="is_awake" data-val="True" data-type="bool">is_awake = True</button>
            <button class="sandbox-btn primary" onclick="Interactives._sandboxPrint(this)">print(...)</button>
            <button class="sandbox-btn" onclick="Interactives._sandboxClear(this)">↺ Сброс</button>
          </div>
          <div class="sandbox-output">${log.length ? log.join('\n') : '<span class="dim">// Пока переменных нет. Нажми кнопку слева, чтобы создать.</span>'}</div>
        </div>
      `;

      container.querySelectorAll('.sandbox-btn[data-var]').forEach(btn => {
        btn.onclick = () => {
          Engagement.soundClick();
          const name = btn.dataset.var;
          const val = btn.dataset.val;
          const type = btn.dataset.type;
          vars[name] = val;
          log.push(`<span class="cmd">&gt;&gt;&gt; ${name} = ${esc(val)}</span>   <span style="color:#60a5fa;font-size:12px;background:rgba(59,130,246,0.2);padding:2px 6px;border-radius:4px;">${type}</span>`);
          draw();
        };
      });
    }

    Interactives._sandboxPrint = (btn) => {
      Engagement.soundClick();
      const parts = ['name', 'age', 'height', 'is_awake'].map(k => vars[k] ? esc(vars[k]) : null).filter(Boolean);
      if (!parts.length) {
        log.push('<span class="dim">// Пока нечего печатать — создай хоть одну переменную.</span>');
      } else {
        log.push(`<span class="cmd">&gt;&gt;&gt; print(name, age, height, is_awake)</span>\n<span class="val">${parts.join(' ')}</span>`);
      }
      draw();
    };

    Interactives._sandboxClear = (btn) => {
      Engagement.soundClick();
      vars = {};
      log = [];
      draw();
    };

    draw();
  }
  // --- ИНТЕРАКТИВ "ЧТО ВЫВЕДЕТ?" ---
  function renderWhatWillPrint(container, data) {
    let answered = false;
    
    function draw() {
      container.innerHTML = `
        <div style="background:var(--color-surface);border-radius:14px;padding:20px;border:1px solid var(--color-border);margin-bottom:16px;">
          <h4 style="margin-top:0;color:#93c5fd;font-size:17px;">${data.title}</h4>
          <p style="color:var(--color-text-muted);font-size:14px;margin-bottom:12px;">${data.instruction}</p>
          <pre class="code-block" style="margin-bottom:16px;">${Engagement.escapeHtml(data.code)}</pre>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${data.options.map((opt, i) => `
              <button class="btn-secondary" style="text-align:left;justify-content:flex-start;padding:12px 16px;" 
                onclick="Interactives._answerWhat(${i}, this)">
                ${Engagement.escapeHtml(opt)}
              </button>
            `).join('')}
          </div>
          <div id="what-feedback" style="margin-top:14px;display:none;padding:12px;border-radius:8px;font-size:14px;line-height:1.5;"></div>
        </div>
      `;
    }
    
    Interactives._answerWhat = (idx, btn) => {
      if (answered) return;
      answered = true;
      Engagement.soundClick();
      
      const fb = document.getElementById('what-feedback');
      fb.style.display = 'block';
      
      if (idx === data.correct) {
        btn.style.background = 'rgba(16,185,129,0.2)';
        btn.style.borderColor = 'var(--color-success)';
        btn.style.color = 'var(--color-success)';
        fb.style.background = 'rgba(16,185,129,0.1)';
        fb.style.borderLeft = '4px solid var(--color-success)';
        fb.innerHTML = `<strong>✅ Верно!</strong><br><br>${data.explanation}`;
        Engagement.soundSuccess();
      } else {
        btn.style.background = 'rgba(239,68,68,0.2)';
        btn.style.borderColor = 'var(--color-danger)';
        btn.style.color = 'var(--color-danger)';
        fb.style.background = 'rgba(239,68,68,0.1)';
        fb.style.borderLeft = '4px solid var(--color-danger)';
        fb.innerHTML = `<strong>❌ Не совсем.</strong><br><br>${data.explanation}`;
        Engagement.soundError();
      }
    };
    
    draw();
  }

  // --- ИНТЕРАКТИВ "КОНСТРУКТОР F-СТРОК" ---
  function renderFStringPlayground(container, data) {
    container.innerHTML = `
      <div style="background:var(--color-surface);border-radius:14px;padding:20px;border:1px solid var(--color-border);margin-bottom:16px;">
        <h4 style="margin-top:0;color:#93c5fd;font-size:17px;">${data.title}</h4>
        <p style="color:var(--color-text-muted);font-size:14px;margin-bottom:16px;">${data.instruction}</p>
        
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;">
          <input type="text" id="fs-name" placeholder="Имя (например, Пик)" value="Пик"
            style="flex:1;min-width:150px;padding:12px;border-radius:8px;border:2px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-size:16px;">
          <input type="number" id="fs-age" placeholder="Возраст" value="12"
            style="width:120px;padding:12px;border-radius:8px;border:2px solid var(--color-border);background:var(--color-bg);color:var(--color-text);font-size:16px;">
        </div>
        
        <div style="background:#0a0e1a;border-radius:8px;padding:16px;font-family:var(--font-mono);font-size:15px;color:#86efac;margin-bottom:16px;">
          <div style="color:#64748b;font-size:12px;margin-bottom:8px;">Твой шаблон:</div>
          ${Engagement.escapeHtml(data.template)}
        </div>
        
        <div style="background:#0a0e1a;border-radius:8px;padding:16px;font-family:var(--font-mono);font-size:15px;color:#e2e8f0;">
          <div style="color:#64748b;font-size:12px;margin-bottom:8px;">Результат:</div>
          <span id="fs-result">Привет, Пик! Тебе 12 лет.</span>
        </div>
      </div>
    `;
    
    const nameInput = document.getElementById('fs-name');
    const ageInput = document.getElementById('fs-age');
    const resultEl = document.getElementById('fs-result');
    
    function update() {
      const name = nameInput.value || '...';
      const age = ageInput.value || '...';
      resultEl.textContent = data.template
        .replace('{name}', name)
        .replace('{age}', age);
    }
    
    nameInput.addEventListener('input', update);
    ageInput.addEventListener('input', update);
    update();
  }
    // Тренажер типов
  function renderTypeTrainer(container) {
    const items = [
      { v: '42', t: 'int' }, { v: "'Москва'", t: 'str' }, { v: '3.14', t: 'float' },
      { v: "'17'", t: 'str' }, { v: '100', t: 'int' }, { v: '0.5', t: 'float' }
    ];
    let idx = 0, score = 0;

    function draw() {
      if (idx >= items.length) {
        container.innerHTML = `<div style="text-align:center;padding:20px;"><h3>Готово! 🎉</h3><p>Правильных ответов: <b>${score} из ${items.length}</b></p></div>`;
        return;
      }
      container.innerHTML = `
        <div class="scene">
          <h4>Определи тип значения</h4>
          <p class="hint">Какой тип у значения на экране?</p>
          <div style="background:var(--color-surface);border-radius:16px;padding:22px;text-align:center;">
            <div style="font:800 34px var(--font-mono);padding:22px;background:var(--color-bg);border-radius:14px;margin-bottom:16px;">${items[idx].v}</div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">
              <button class="btn-secondary" onclick="Interactives._ansType('int', '${items[idx].t}', this)">int</button>
              <button class="btn-secondary" onclick="Interactives._ansType('float', '${items[idx].t}', this)">float</button>
              <button class="btn-secondary" onclick="Interactives._ansType('str', '${items[idx].t}', this)">str</button>
            </div>
            <div style="margin-top:14px;font:700 14px var(--font-mono);color:var(--color-text-muted);">Вопрос ${idx + 1} из ${items.length} · Счёт: ${score}</div>
          </div>
        </div>
      `;
    }

    Interactives._ansType = (chosen, correct, btn) => {
      if (chosen === correct) { score++; btn.style.background = 'rgba(16,185,129,0.2)'; Engagement.soundSuccess(); }
      else { btn.style.background = 'rgba(239,68,68,0.2)'; Engagement.soundError(); }
      setTimeout(() => { idx++; draw(); }, 600);
    };
    draw();
  }

  // Заполни коробки (Память)
  function renderMemoryBoxes(container) {
    container.innerHTML = `
      <div class="scene">
        <h4>Заполни коробки Байта</h4>
        <p class="hint">Введи значения — увидишь, как они «лягут» в переменные.</p>
        <div class="kid-input">
          <label style="font:800 14px var(--font-ui);min-width:70px">ticket_price</label>
          <input type="text" id="mem-price" placeholder="Например, 1990">
          <button type="button" class="btn-primary" onclick="Interactives._fillBox('price', this)">Положить</button>
        </div>
        <div class="kid-input">
          <label style="font:800 14px var(--font-ui);min-width:70px">amount</label>
          <input type="text" id="mem-amount" placeholder="Например, 18">
          <button type="button" class="btn-primary" onclick="Interactives._fillBox('amount', this)">Положить</button>
        </div>
        <div class="kid-input">
          <label style="font:800 14px var(--font-ui);min-width:70px">guide</label>
          <input type="text" id="mem-guide" placeholder="Фамилия">
          <button type="button" class="btn-primary" onclick="Interactives._fillBox('guide', this)">Положить</button>
        </div>
        <div class="kid-memory">
          <div class="kid-cell" id="cell-price"><div class="nm">ticket_price</div><div class="val">?</div></div>
          <div class="kid-cell" id="cell-amount"><div class="nm">amount</div><div class="val">?</div></div>
          <div class="kid-cell" id="cell-guide"><div class="nm">guide</div><div class="val">?</div></div>
        </div>
      </div>
    `;

    Interactives._fillBox = (key, btn) => {
      const input = document.getElementById(`mem-${key}`);
      const cell = document.getElementById(`cell-${key}`);
      if (!input.value.trim()) return;
      cell.querySelector('.val').textContent = input.value;
      cell.classList.add('filled');
      input.value = '';
      Engagement.soundSuccess();
    };
  }
  // --- ЗАПОЛНИ ПРОПУСКИ ---
  function renderFillBlanks(container, data) {
    // Разбиваем код по маркерам [1], [2] и т.д.
    let htmlCode = data.code.replace(/\[(\d+)\]/g, (match, id) => {
      return `<input type="text" class="blank-input" data-id="${id}" autocomplete="off" spellcheck="false">`;
    });

    container.innerHTML = `
      <div class="scene">
        <h4>${data.title}</h4>
        <p class="hint">${data.instruction}</p>
        
        <!-- ЗАМЕНИЛИ DIV НА PRE ЗДЕСЬ -->
        <pre class="fill-blanks-code">${htmlCode}</pre>
        
        <button class="btn-primary" onclick="Interactives._checkBlanks(this)">Проверить</button>
        <div id="blanks-feedback" style="margin-top:16px;font-weight:800;font-size:18px;"></div>
      </div>
    `;

    Interactives._checkBlanks = (btn) => {
      let allCorrect = true;
      const inputs = container.querySelectorAll('.blank-input');
      inputs.forEach(input => {
        const id = input.dataset.id;
        const expected = data.answers[id];
        // Убираем пробелы по краям и сравниваем
        if (input.value.trim() === expected) {
          input.classList.remove('wrong');
          input.classList.add('correct');
        } else {
          input.classList.remove('correct');
          input.classList.add('wrong');
          allCorrect = false;
        }
      });

      const fb = document.getElementById('blanks-feedback');
      if (allCorrect) {
        fb.textContent = '✅ Отлично! Все пропуски заполнены верно.';
        fb.style.color = 'var(--success)';
        Engagement.soundSuccess();
      } else {
        fb.textContent = '❌ Есть ошибки. Проверь красные поля.';
        fb.style.color = 'var(--danger)';
        Engagement.soundError();
      }
    };
  }

  // --- СКОРОСТЬ ПЕЧАТИ ---
  function renderSpeedTyping(container, data) {
    let startTime = null;
    let timerInterval = null;

    function draw() {
      container.innerHTML = `
        <div class="scene">
          <h4>${data.title}</h4>
          <p class="hint">Набери этот код как можно быстрее и нажми Enter.</p>
          <div class="typing-game">
            <div class="typing-target" id="type-target"></div>
            <input type="text" class="typing-input" id="type-input" placeholder="Начни печатать..." autocomplete="off" spellcheck="false">
            <div style="margin-top:16px;font-weight:800;color:var(--text-muted);font-size:20px;" id="type-timer">00:00.0</div>
            <div id="type-result" style="margin-top:16px;font-weight:900;font-size:20px;"></div>
          </div>
        </div>
      `;

      const input = document.getElementById('type-input');
      const target = document.getElementById('type-target');
      
      // Отрисовка текста по буквам для подсветки
      function updateTargetHighlight(val) {
        let html = '';
        for (let i = 0; i < data.code.length; i++) {
          if (i < val.length) {
            html += `<span class="typed">${Engagement.escapeHtml(data.code[i])}</span>`;
          } else {
            html += `<span>${Engagement.escapeHtml(data.code[i])}</span>`;
          }
        }
        target.innerHTML = html;
      }
      updateTargetHighlight('');

      input.addEventListener('input', (e) => {
        const val = e.target.value;
        updateTargetHighlight(val);

        if (!startTime && val.length > 0) {
          startTime = Date.now();
          timerInterval = setInterval(() => {
            const diff = Date.now() - startTime;
            const sec = Math.floor(diff / 1000);
            const ms = Math.floor((diff % 1000) / 100);
            document.getElementById('type-timer').textContent = `00:${sec < 10 ? '0' : ''}${sec}.${ms}`;
          }, 100);
        }
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (!startTime) return;
          clearInterval(timerInterval);
          
          const val = input.value;
          const resEl = document.getElementById('type-result');
          
          if (val === data.code) {
            const diff = (Date.now() - startTime) / 1000;
            resEl.innerHTML = `🎉 Идеально! Твое время: <span style="color:var(--success)">${diff.toFixed(1)} сек.</span>`;
            Engagement.soundLevelUp();
          } else {
            resEl.innerHTML = `❌ Есть опечатки. Попробуй еще раз!`;
            resEl.style.color = 'var(--danger)';
            Engagement.soundError();
          }
        }
      });
    }
    draw();
  }
 
  return {
    render,
    renderSandbox,
    renderWhatWillPrint,
    renderFStringPlayground,
    renderQuiz,
    renderTypeTrainer,
    renderMemoryBoxes,
    renderFillBlanks,
    renderSpeedTyping,
    _checkBlanks: null,
    _moveToSelected: null, _moveToShuffled: null, _checkBuildCode: null,
    _checkError: null, _nextStep: null, _answerQuiz: null,
    _sandboxPrint: null, _sandboxClear: null, _answerWhat: null
  };
})();
