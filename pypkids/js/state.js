const State = (() => {
  const KEY = 'pypkids-state-v1';

  function defaults() {
    return {
      xp: 0,
      streak: 0,
      lastVisit: null,
      completedLessons: [],
      completedTiers: {},
      cards: [],
      badges: [],
      settings: { muted: false, narrative: true, reducedMotion: false },
      onboardingDone: false,
      diagnostic: null,
      recommendedStart: null
    };
  }

  let state;
  try {
    state = { ...defaults(), ...JSON.parse(localStorage.getItem(KEY) || '{}') };
  } catch { state = defaults(); }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {}
  }

  return {
    get: () => state,
    set(patch) { Object.assign(state, patch); save(); },
    update(fn) { fn(state); save(); },
    addXp(n) { state.xp += n; save(); },
    completeLesson(id, tier = 1) {
      if (!state.completedLessons.includes(id)) state.completedLessons.push(id);
      state.completedTiers[id] = Math.max(state.completedTiers[id] || 0, tier);
      save();
    },
    hasCompleted: (id) => state.completedLessons.includes(id),
    reset() {
      if (confirm('Сбросить весь прогресс?')) {
        state = defaults();
        save();
        location.reload();
      }
    }
  };
})();