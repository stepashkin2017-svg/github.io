const Engagement = (() => {
  // --- 1. Звёздное небо ---
  let starsCanvas = null;
  function initStars() {
    if (starsCanvas) return;
    starsCanvas = document.createElement('canvas');
    starsCanvas.id = 'stars-canvas';
    starsCanvas.style.cssText = 'position:fixed;inset:0;z-index:0;width:100%;height:100%;pointer-events:none;';
    document.body.prepend(starsCanvas);
    const ctx = starsCanvas.getContext('2d');
    let stars = [];
    function resize() {
      starsCanvas.width = window.innerWidth;
      starsCanvas.height = window.innerHeight;
      stars = Array.from({ length: 140 }, () => ({
        x: Math.random() * starsCanvas.width,
        y: Math.random() * starsCanvas.height,
        r: Math.random() * 1.6 + 0.3,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005,
        hue: Math.random() > 0.8 ? 220 : 210
      }));
    }
    function draw() {
      ctx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
      for (const s of stars) {
        s.phase += s.speed;
        const alpha = (Math.sin(s.phase) + 1) / 2 * 0.7 + 0.3;
        ctx.fillStyle = `hsla(${s.hue}, 90%, 85%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    window.addEventListener('resize', resize);
    resize();
    draw();
  }

  // --- 2. COSMO ---
  function cosmo(text) {
    return `
      <div class="cosmo-speech">
        <div class="cosmo-avatar">🤖</div>
        <div class="cosmo-bubble"><strong>COSMO:</strong> ${escapeHtml(text)}</div>
      </div>`;
  }

  // --- 3. Конфетти ---
  function confetti(count = 160) {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;inset:0;z-index:9999;pointer-events:none;width:100%;height:100%;';
    document.body.appendChild(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const colors = ['#3b82f6', '#a855f7', '#22c55e', '#f59e0b', '#ec4899', '#06b6d4'];
    const particles = Array.from({ length: count }, () => ({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 16,
      vy: Math.random() * -18 - 6,
      size: Math.random() * 10 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 25,
      gravity: 0.45,
      life: 1
    }));
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      for (const p of particles) {
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotSpeed;
        p.life -= 0.008;
        if (p.life > 0 && p.y < canvas.height + 60) alive = true;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation * Math.PI / 180);
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      if (alive) requestAnimationFrame(animate);
      else canvas.remove();
    }
    animate();
  }

  // --- 4. Звук (WebAudio) ---
  let audioCtx = null;
  function ensureAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }
  function playTone(freq, duration = 0.1, type = 'sine', volume = 0.08) {
    if (State.get().settings.muted) return;
    try {
      const a = ensureAudio();
      const osc = a.createOscillator();
      const gain = a.createGain();
      osc.frequency.value = freq;
      osc.type = type;
      gain.gain.setValueAtTime(volume, a.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + duration);
      osc.connect(gain); gain.connect(a.destination);
      osc.start(); osc.stop(a.currentTime + duration);
    } catch {}
  }
  const soundSuccess = () => { playTone(523.25, 0.12); setTimeout(() => playTone(659.25, 0.12), 100); setTimeout(() => playTone(783.99, 0.2), 200); };
  const soundError = () => { playTone(220, 0.15, 'triangle'); setTimeout(() => playTone(165, 0.22, 'triangle'), 140); };
  const soundClick = () => playTone(660, 0.05);
  const soundLevelUp = () => { [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => playTone(f, 0.18), i * 100)); };

  // --- 5. Анимированный XP ---
  function animateXp(from, to, el) {
    if (!el) return;
    const duration = 800;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  // --- 6. Прогресс-кольцо SVG ---
    function progressRing(done, total, size = 48) {
    const pct = total ? done / total : 0;
    const r = (size - 10) / 2; // Чуть больше отступ для толстой обводки
    const c = 2 * Math.PI * r;
    const offset = c * (1 - pct);
    return `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
        <defs>
          <linearGradient id="ringGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#10B981"/>
            <stop offset="100%" stop-color="#3B82F6"/>
          </linearGradient>
        </defs>
        <circle class="bg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="#E2E8F0" stroke-width="6"/>
        <circle class="fg" cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="url(#ringGradient)" stroke-width="6"
          stroke-dasharray="${c}" stroke-dashoffset="${offset}" stroke-linecap="round"/>
      </svg>
      <div class="label">${done}/${total}</div>`;
  }
  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  return {
    initStars, cosmo, confetti,
    soundSuccess, soundError, soundClick, soundLevelUp,
    animateXp, progressRing, escapeHtml
  };
})();