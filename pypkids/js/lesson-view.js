const LessonView = (() => {
  let currentLesson = null;
  let currentTier = null;
  let hintIndex = 0;

   function render(lesson) {
    currentLesson = lesson;
    currentTier = lesson.practice.tiers.find(t => t.level === lesson.practice.defaultTier) || lesson.practice.tiers[0];
    hintIndex = 0;
    const appEl = document.getElementById('app');
    
    // Бейдж режима
    const modeBadge = lesson.mode === 'browser'
      ? '<span class="mode-badge">🟢 В браузере</span>'
      : '<span class="mode-badge" style="background:var(--secondary);">🔵 VS Code</span>';

    appEl.innerHTML = `
      <div class="lesson-view">
        <a href="#/" class="btn-secondary" style="display:inline-block;margin-bottom:20px;text-decoration:none;">← К карте</a>
        
        <div class="lesson-header">
          <h1>${Engagement.escapeHtml(lesson.title)}</h1>
          <div>${modeBadge}</div>
        </div>

        <div class="lesson-progress-wrap" style="margin-bottom: 40px;">
          <div class="lesson-progress" style="background:#E2E8F0;border-radius:99px;height:16px;border:3px solid var(--border-color);overflow:hidden;">
            <div class="lesson-progress-bar" id="lesson-progress" style="background:var(--success);height:100%;transition:width 0.4s;width:0%;"></div>
          </div>
        </div>

        <div class="hook-card">
          <h2>🎬 Твоя миссия</h2>
          <p>${Engagement.escapeHtml(lesson.hook.text)}</p>
        </div>

        <div id="theory-container"></div>

        <h2 class="section-title" style="margin-top:80px;">💻 Тренировка</h2>
        <div id="practice-container"></div>

        <div id="summary-container" style="margin-top: 60px;"></div>
      </div>
    `;

    renderTheory(lesson);
    renderPractice(lesson);
    renderSummary(lesson);
    updateProgress();
  }
  function renderWarmup(warmup) {
    const container = document.getElementById('warmup-container');
    if (!container) return;
    
    let html = '';
    if (warmup.questions && warmup.questions.length) {
      warmup.questions.forEach((q, i) => {
        html += `<div id="warmup-q-${i}"></div>`;
      });
    }
    container.innerHTML = html;
    
    if (warmup.questions) {
      warmup.questions.forEach((q, i) => {
        if (q.type === 'quiz') {
          Interactives.render(document.getElementById(`warmup-q-${i}`), q);
        }
      });
    }
  }


function renderTheory(lesson) {
    const container = document.getElementById('theory-container');
    let html = '';
    
    lesson.theory.forEach((section, sectionIdx) => {
      html += `<div class="theory-section">`;
      if (section.title) {
        // Добавляем иконку к заголовку секции
        html += `<h2 class="section-title">${section.title}</h2>`;
      }
      section.blocks.forEach((block, blockIdx) => {
        html += renderExplanation(block, `${sectionIdx}-${blockIdx}`);
      });
      html += `</div>`;
    });
    
    container.innerHTML = html;
  }


  function renderTheoryBlock(block, index) {
    const exps = block.explanations || [];
    return `
      <div class="theory-block">
        <h3>${Engagement.escapeHtml(block.title || block.concept)}</h3>
        <div id="exp-${index}">${renderExplanation(exps[0], index, 0)}</div>
        ${exps.length > 1 ? `
          <div class="format-switcher">
            ${exps.map((e, j) => `
              <button class="format-btn ${j === 0 ? 'active' : ''}"
                onclick="LessonView.switchFormat(${index}, ${j})">${formatLabel(e.type)}</button>
            `).join('')}
          </div>
        ` : ''}
      </div>`;
  }

  function formatLabel(type) {
    return { analogy: '🌈 Аналогия', text: '📖 Текст', code: '💡 Код', diagram: '📊 Схема' }[type] || type;
  }

  function renderExplanation(block, uniqueId) {
    if (!block) return '';

    if (block.type === 'text') {
      return `<div class="text-block">${block.content}</div>`;
    }

    if (block.type === 'character_says') {
      return `
        <div class="byte-says">
          <div class="face">🤖</div>
          <div class="bubble">${block.text}</div>
        </div>`;
    }

    if (block.type === 'rich_code') {
      return `
        <div class="rich-code-block">
          <pre><code>${Engagement.escapeHtml(block.code)}</code></pre>
        </div>`;
    }

    if (block.type === 'terminal') {
      return `
        <div class="term-block">
          <div class="term-bar"><i></i><i></i><i></i><em>${block.isError ? 'Ошибка!' : 'Вывод программы'}</em></div>
          <pre class="term-body ${block.isError ? 'error-text' : ''}">${Engagement.escapeHtml(block.output)}</pre>
        </div>`;
    }

    if (block.type === 'callout') {
      const styles = { warn: 'callout-warn', memo: 'callout-memo', danger: 'callout-danger' };
      return `
        <div class="callout ${styles[block.style] || ''}">
          <div class="callout-title">${block.title}</div>
          <div class="callout-content">${block.content}</div>
        </div>`;
    }

      if (block.type === 'def_card') {
      return `
        <div class="def-card">
          <div class="def-term">📘 ${block.term}</div>
          <div class="def-body">${block.definition}</div>
          ${block.example ? `<pre class="def-example">${Engagement.escapeHtml(block.example)}</pre>` : ''}
        </div>`;
    }

    if (block.type === 'big_boxes') {
      const boxes = block.boxes.map(b => `
        <div class="big-box ${b.color}">
          <span class="sticker">${b.label}</span>
          <span class="content">${b.emoji}</span>
        </div>
      `).join('');
      return `<div class="big-box-scene">${boxes}</div>`;
    }

    if (block.type === 'compare_grid') {
      return `
        <div class="compare-scene">
          <div class="compare-card ${block.before.bad ? 'bad' : ''}">
            <div class="title">${block.before.title}</div>
            <div class="code">${Engagement.escapeHtml(block.before.code)}</div>
          </div>
          <div class="compare-arrow">➡️</div>
          <div class="compare-card good">
            <div class="title">${block.after.title}</div>
            <div class="code">${Engagement.escapeHtml(block.after.code)}</div>
          </div>
        </div>`;
    }

    if (block.type === 'types_grid') {
      const cards = block.types.map(t => `
        <div class="type-card ${t.color}">
          <span class="emoji">${t.emoji}</span>
          <div class="label">${t.title}</div>
          <div class="code">${t.code}</div>
          <div class="desc">${t.examples}</div>
        </div>
      `).join('');
      return `<div class="types-row">${cards}</div>`;
    }

    if (block.type === 'rules_list') {
      return `
        <div class="rules">
          ${block.rules.map((r, i) => `<div class="rule"><span class="n">${i+1}</span>${r}</div>`).join('')}
        </div>`;
    }
    if (block.type === 'fill_blanks') {
      const id = `blanks-${uniqueId}`;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) Interactives.renderFillBlanks(el, block);
      }, 0);
      return `<div id="${id}" style="margin: 24px 0;"></div>`;
    }

    if (block.type === 'speed_typing') {
      const id = `typing-${uniqueId}`;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) Interactives.renderSpeedTyping(el, block);
      }, 0);
      return `<div id="${id}" style="margin: 24px 0;"></div>`;
    }

    if (block.type === 'true_false') {
      const id = `tf-${uniqueId}`;
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) Interactives.renderQuiz(el, {
          question: block.question,
          options: ['Верно', 'Неверно'],
          correct: block.correct ? 0 : 1
        });
      }, 0);
      return `<div id="${id}" style="margin: 24px 0;"></div>`;
    }
    if (block.type === 'task_analysis') {
      return `
        <div class="task-analysis">
          ${block.steps.map((step, i) => `
            <div class="task-analysis-step">
              <div class="step-circle">${i + 1}</div>
              <div class="step-content">
                <div class="step-title">${step.title}</div>
                <div class="step-text">${step.text}</div>
                ${step.code ? `<pre class="step-code">${Engagement.escapeHtml(step.code)}</pre>` : ''}
                ${step.output ? `<div class="step-output">Вывод: ${Engagement.escapeHtml(step.output)}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
    // Заглушки для интерактивов (если понадобятся)
    return '';
  }

  // Запуск кода из блока code_with_output
  async function runInlineCode(btn, blockIndex, expIndex) {
    Engagement.soundClick();
    const exp = currentLesson.theory[blockIndex].explanations[expIndex];
    const outEl = document.getElementById(`out-${blockIndex}-${expIndex}`);
    const original = exp.output;
    outEl.textContent = '⏳ Запускаю…';
    try {
      const res = await PythonRunner.run(exp.code, { timeout: 10000 });
      if (res.timeout) outEl.textContent = '⏹ Прервано по таймауту';
      else if (res.error) { outEl.textContent = '❌ ' + res.error; Engagement.soundError(); }
      else { outEl.textContent = res.out || '(ничего не вывела)'; Engagement.soundSuccess(); }
    } catch (e) {
      outEl.textContent = '❌ ' + e.message;
    }
  }

  function formatLabel(type) {
    return { analogy: '🌈 Аналогия', text: '📖 Текст', code: '💡 Код', interactive: '🎮 Интерактив', step_by_step: '👣 Разбор' }[type] || type;
  }

  function switchFormat(blockIndex, expIndex) {
    Engagement.soundClick();
    const exps = currentLesson.theory[blockIndex].explanations;
    document.getElementById(`exp-${blockIndex}`).innerHTML =
      renderExplanation(exps[expIndex], blockIndex, expIndex);
    document.querySelectorAll(`#exp-${blockIndex} ~ .format-switcher .format-btn`)
      .forEach((b, i) => b.classList.toggle('active', i === expIndex));
  }

  async function runExample(blockIndex, expIndex) {
    Engagement.soundClick();
    const exp = currentLesson.theory[blockIndex].explanations[expIndex];
    const outEl = document.getElementById(`example-out-${blockIndex}-${expIndex}`);
    outEl.hidden = false;
    outEl.textContent = '⏳ Запускаю Python…';
    try {
      const res = await PythonRunner.run(exp.content, { timeout: 10000 });
      if (res.timeout) outEl.textContent = '⏹ Прервано по таймауту';
      else if (res.error) { outEl.textContent = '❌ ' + res.error; Engagement.soundError(); }
      else { outEl.textContent = res.out || '(программа ничего не вывела)'; Engagement.soundSuccess(); }
    } catch (e) {
      outEl.textContent = '❌ ' + e.message;
    }
    updateProgress();
  }

  function renderPractice(lesson) {
    const tiers = lesson.practice.tiers;
    document.getElementById('practice-container').innerHTML = `
      <div class="tier-selector" id="tier-selector">
        ${tiers.map(t => `
          <button class="tier-btn ${t.level === currentTier.level ? 'active' : ''}"
            onclick="LessonView.selectTier(${t.level})">${t.label}</button>
        `).join('')}
      </div>
      <div class="practice-instruction" id="practice-instruction">${Engagement.escapeHtml(currentTier.instruction)}</div>
      <div class="editor-container"><div id="editor"></div></div>
      <div class="practice-actions">
        <button class="btn-primary" id="btn-run">▶ Запустить</button>
        <button class="btn-primary" id="btn-check">✓ Проверить</button>
        <button class="btn-secondary btn-small" id="btn-hint">💡 Подсказка</button>
      </div>
      <div class="output-panel" id="output-panel" hidden></div>
      <div class="feedback-panel" id="feedback-panel" hidden></div>
    `;
    Editor.create(document.getElementById('editor'), currentTier.starterCode || '');
    document.getElementById('btn-run').onclick = runCode;
    document.getElementById('btn-check').onclick = checkCode;
    document.getElementById('btn-hint').onclick = showHint;
  }

  function selectTier(level) {
    if (level === currentTier.level) return;
    Engagement.soundClick();
    currentTier = currentLesson.practice.tiers.find(t => t.level === level);
    hintIndex = 0;
    document.querySelectorAll('#tier-selector .tier-btn')
      .forEach(b => b.classList.toggle('active', b.textContent.trim() === currentTier.label));
    document.getElementById('practice-instruction').textContent = currentTier.instruction;
    Editor.setValue(currentTier.starterCode || '');
    document.getElementById('output-panel').hidden = true;
    document.getElementById('feedback-panel').hidden = true;
  }

  async function runCode() {
    Engagement.soundClick();
    const outEl = document.getElementById('output-panel');
    outEl.hidden = false;
    outEl.textContent = '⏳ Запускаю Python…';
    try {
      const res = await PythonRunner.run(Editor.getValue(), { timeout: 10000 });
      if (res.timeout) outEl.textContent = '⏹ Прервано. Проверь циклы.';
      else if (res.error) { outEl.textContent = '❌ ' + res.error; Engagement.soundError(); }
      else { outEl.textContent = res.out || '(программа ничего не вывела)'; Engagement.soundSuccess(); }
    } catch (e) {
      outEl.textContent = '❌ ' + e.message;
    }
    updateProgress();
  }

  async function checkCode() {
    Engagement.soundClick();
    const fbEl = document.getElementById('feedback-panel');
    fbEl.hidden = false;
    fbEl.className = 'feedback-panel warning';
    fbEl.textContent = '⏳ Проверяю…';

    try {
      const result = await Checker.runChecks(Editor.getValue(), currentTier.checks || []);
      if (result.ok) {
        fbEl.className = 'feedback-panel success';
        fbEl.textContent = '🎉 Отлично! Задание выполнено!';
        onSuccess();
      } else {
        fbEl.className = 'feedback-panel error';
        fbEl.textContent = '😕 ' + Checker.buildFeedback(result.failed);
        Engagement.soundError();
      }
    } catch (e) {
      fbEl.className = 'feedback-panel error';
      fbEl.textContent = '❌ Ошибка проверки: ' + e.message;
    }
    updateProgress();
  }

  function onSuccess() {
    const key = currentLesson.id;
    const wasCompleted = State.hasCompleted(key);
    State.completeLesson(key, currentTier.level);

    if (!wasCompleted) {
      const xp = currentLesson.reward?.xp || 20;
      State.addXp(xp);
      App.updateHeader();
      Engagement.confetti();
      Engagement.soundLevelUp();
      App.showToast(`+${xp} XP! Урок пройден 🎉`, 'success');
    } else {
      Engagement.soundSuccess();
      App.showToast('Задание выполнено ✓', 'success');
    }
    renderSummary(currentLesson);
    updateProgress();
  }

  function showHint() {
    Engagement.soundClick();
    const hints = currentTier.hints || [];
    if (hintIndex >= hints.length) {
      App.showToast('Подсказки закончились. Попробуй сам!', 'warning');
      return;
    }
    const fbEl = document.getElementById('feedback-panel');
    fbEl.hidden = false;
    fbEl.className = 'feedback-panel warning';
    fbEl.textContent = `💡 Подсказка ${hintIndex + 1}/${hints.length}: ${hints[hintIndex]}`;
    hintIndex++;
  }

   function renderSummary(lesson) {
    const completed = State.hasCompleted(lesson.id);
    document.getElementById('summary-container').innerHTML = `
      <div class="summary-card">
        <h3>${completed ? '🎉 Урок пройден!' : '📝 Что запомнить'}</h3>
        <p>${Engagement.escapeHtml(lesson.summary.reflection)}</p>
        
        ${completed ? `
          <div style="margin: 20px 0 30px;">
            <span class="reward-badge">+${lesson.reward?.xp || 20} XP · Бейдж: ${Engagement.escapeHtml(lesson.reward?.badge || '')}</span>
          </div>
        ` : `
          <div style="margin: 20px 0 30px;">
            <span class="reward-badge" style="background:#E2E8F0; box-shadow:none; border-color:#CBD5E1; color:#64748B;">Выполни задание, чтобы получить награду</span>
          </div>
        `}
        
        <div>
          <a href="#/" class="btn-secondary" style="text-decoration:none;">← К карте курса</a>
        </div>
      </div>`;
  }

  function updateProgress() {
    const bar = document.getElementById('lesson-progress');
    const label = document.getElementById('progress-label');
    if (!bar || !currentLesson) return;
    const completed = State.hasCompleted(currentLesson.id);
    const pct = completed ? 100 : 40;
    bar.style.width = pct + '%';
    if (label) label.textContent = pct + '%';
  }

  return {
    render, switchFormat, runExample, selectTier,
    runCode, checkCode, showHint, runInlineCode
  };
})();