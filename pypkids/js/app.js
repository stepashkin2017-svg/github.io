const App = (() => {
  const appEl = document.getElementById('app');

  function init() {
    if (location.protocol === 'file:') {
      appEl.innerHTML = `
        <div style="max-width:600px;margin:40px auto;padding:30px;background:rgba(239,68,68,0.1);border-radius:16px;border-left:6px solid #ef4444;color:#f1f5f9;">
          <h1 style="margin-top:0;">⚠️ Нужен локальный сервер</h1>
          <p>Открой через <b>Live Server</b> в VS Code или <code>python -m http.server 8000</code> → <a href="http://localhost:8000">http://localhost:8000</a></p>
        </div>`;
      return;
    }
    Engagement.initStars();
    updateHeader();
    window.addEventListener('hashchange', route);
    document.getElementById('btn-mute').onclick = toggleMute;
    document.getElementById('btn-profile').onclick = () => location.hash = '#/profile';
    route();
  }

  function route() {
    const hash = location.hash.replace(/^#\/?/, '');
    if (hash === '' || hash === 'map') return renderMap();
    if (hash.startsWith('lesson/')) return renderLesson(hash.slice('lesson/'.length));
    if (hash === 'profile') return renderProfile();
    renderMap();
  }

  function updateHeader() {
    const s = State.get();
    const xpEl = document.getElementById('xp-value');
    const prev = parseInt(xpEl.textContent) || 0;
    if (prev !== s.xp) Engagement.animateXp(prev, s.xp, xpEl);
    else xpEl.textContent = s.xp;
    document.getElementById('streak-value').textContent = s.streak;
    document.getElementById('btn-mute').textContent = s.settings.muted ? '🔇' : '🔊';
    if (s.xp !== prev) {
      const stat = xpEl.parentElement;
      stat.classList.add('flash');
      setTimeout(() => stat.classList.remove('flash'), 600);
    }
  }

  function toggleMute() {
    State.update(s => { s.settings.muted = !s.settings.muted; });
    updateHeader();
    showToast(State.get().settings.muted ? '🔇 Звук выключен' : '🔊 Звук включён', 'info');
  }

  function renderMap() {
    const data = State.get();
    const totalLessons = COURSE_MAP.levels.reduce((acc, lv) =>
      acc + lv.modules.reduce((a, m) => a + m.lessons.length, 0), 0);
    const completedTotal = data.completedLessons.length;
    const pct = Math.round(completedTotal / totalLessons * 100);

    appEl.innerHTML = `
      <div class="map-hero">
        <h1>🚀 PyKids</h1>
        <p>Прокачай Python от новичка до разработчика — ${totalLessons} уроков, ${pct}% пройдено</p>
      </div>
      ${Engagement.cosmo(
        data.completedLessons.length === 0
          ? 'Привет, юный инженер! Я COSMO — бортовой помощник. Начни с урока 1.1.2 «Переменные» — там тебя ждёт первое открытие!'
          : `Отлично, ты уже прошёл ${completedTotal} уроков! Продолжай — впереди ${totalLessons - completedTotal} испытаний.`
      )}
      <div class="map-container">
        ${COURSE_MAP.levels.map(level => renderLevel(level, data)).join('')}
      </div>
    `;
  }

  function renderLevel(level, data) {
    const total = level.modules.reduce((a, m) => a + m.lessons.length, 0);
    const done = level.modules.reduce((a, m) =>
      a + m.lessons.filter(l => data.completedLessons.includes(l.id)).length, 0);
    const icons = { 1: '🛰️', 2: '🎮', 3: '💼' };
    return `
      <section class="level-section level-${level.id}">
        <div class="level-header">
          <div class="level-badge">${icons[level.id] || '⭐'}</div>
          <div style="flex:1">
            <h2>Уровень ${level.id}: ${Engagement.escapeHtml(level.title)}</h2>
            <p class="level-meta">${Engagement.escapeHtml(level.age)} · ${Engagement.escapeHtml(level.role)}</p>
          </div>
          <div class="progress-ring">${Engagement.progressRing(done, total, 64)}</div>
        </div>
        <p class="level-mission">🎯 ${Engagement.escapeHtml(level.mission)}</p>
        <div class="modules-grid">
          ${level.modules.map(m => renderModule(m, data)).join('')}
        </div>
      </section>
    `;
  }

  function renderModule(module, data) {
    const completed = module.lessons.filter(l => data.completedLessons.includes(l.id)).length;
    const isVs = module.mode === 'vscode';
    const badge = isVs
      ? '<span class="mode-badge vscode">🔵 VS Code</span>'
      : '<span class="mode-badge">🟢 В браузере</span>';
    const icons = { '1.1': '📡', '1.2': '🧭', '1.3': '⛽', '1.4': '📦', '1.5': '🌌', '1.6': '🎛️' };
    
    return `
      <div class="module-card">
        
        <!-- Шапка модуля: Заголовок слева, Бейдж справа -->
        <div class="module-header">
          <div class="module-title-wrap">
            <span style="font-size:28px;">${icons[module.id] || '📘'}</span>
            <h3>${module.id} ${Engagement.escapeHtml(module.title)}</h3>
          </div>
          ${badge}
        </div>
        
        <!-- Блок прогресса и подсказки -->
        <div class="module-progress-bar">
          <div class="progress-ring" style="width:48px; height:48px;">
            ${Engagement.progressRing(completed, module.lessons.length, 48)}
          </div>
          <span class="module-hook-text">${Engagement.escapeHtml(module.hook)}</span>
        </div>

        <!-- Список уроков -->
        <ul class="lesson-list">
          ${module.lessons.map(l => `
            <li class="lesson-item ${data.completedLessons.includes(l.id) ? 'completed' : ''} ${l.type === 'project' ? 'project' : ''}">
              <a href="#/lesson/${l.id}">
                <span class="lesson-order">${l.order}</span>
                <span class="lesson-title">${Engagement.escapeHtml(l.title)}</span>
                ${data.completedLessons.includes(l.id) ? '<span class="check">✓</span>' : ''}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
  function renderLesson(id) {
    const lesson = window.LESSON_DATA && window.LESSON_DATA[id];
    if (!lesson) {
      appEl.innerHTML = `
        <div class="empty-lesson">
          ${Engagement.cosmo('Этот урок ещё в разработке. Загляни в урок 1.1.2 — там уже готово приключение!')}
          <h2>📝 Скоро здесь будет урок</h2>
          <p><a href="#/lesson/l1-m1-02" class="btn-primary">🚀 Открыть урок 1.1.2</a></p>
          <p><a href="#/">← К карте курса</a></p>
        </div>
      `;
      return;
    }
    LessonView.render(lesson);
  }

  function renderProfile() {
    const s = State.get();
    appEl.innerHTML = `
      <div class="profile">
        <h2>👤 Профиль</h2>
        ${Engagement.cosmo(`Ты накопил ${s.xp} XP и прошёл ${s.completedLessons.length} уроков. Продолжай в том же духе!`)}
        <div class="profile-stats">
          <div class="stat-card"><span class="stat-value">${s.xp}</span><span class="stat-label">✨ XP</span></div>
          <div class="stat-card"><span class="stat-value">${s.streak}</span><span class="stat-label">🔥 Streak</span></div>
          <div class="stat-card"><span class="stat-value">${s.completedLessons.length}</span><span class="stat-label">🎓 Уроков</span></div>
          <div class="stat-card"><span class="stat-value">${s.badges.length}</span><span class="stat-label">🏆 Бейджей</span></div>
        </div>
        <p><a href="#/">← К карте курса</a></p>
        <button class="btn-secondary" onclick="State.reset()">🗑 Сбросить прогресс</button>
      </div>
    `;
  }

  function showToast(msg, type = 'info') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    c.appendChild(t);
    requestAnimationFrame(() => t.classList.add('show'));
    setTimeout(() => {
      t.classList.remove('show');
      setTimeout(() => t.remove(), 350);
    }, 3200);
  }

  return { init, route, updateHeader, showToast };
})();

window.addEventListener('DOMContentLoaded', App.init);