function prefersReducedMotion() {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

async function getConfetti() {
  if (typeof window === 'undefined' || process.env.NODE_ENV === 'test' || prefersReducedMotion()) return null;
  try {
    const mod = await import('canvas-confetti');
    return mod.default || mod;
  } catch {
    return null;
  }
}

export function fireVictoryConfetti() {
  void getConfetti().then((confetti) => {
    if (!confetti) return;
    const count = 120;
    const defaults = {
      origin: { y: 0.65 },
      colors: ['#00cd9c', '#1cb0f6', '#ffc800', '#ff4b4b', '#ce82ff', '#e21b3c'],
      disableForReducedMotion: true,
    };

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.6),
      spread: 60,
    });

    confetti({
      ...defaults,
      particleCount: Math.floor(count * 0.4),
      spread: 100,
      decay: 0.91,
      scalar: 0.9,
    });
  });
}

export function fireStreakFireworks() {
  void getConfetti().then((confetti) => {
    if (!confetti) return;
    const end = Date.now() + 1.2 * 1000;
    const colors = ['#ff9600', '#ffc800', '#ff4b4b'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        disableForReducedMotion: true,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        disableForReducedMotion: true,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  });
}

export function fireHeartRefillConfetti() {
  void getConfetti().then((confetti) => {
    if (!confetti) return;
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#ff4b4b', '#ff8080', '#ffffff'],
      shapes: ['circle'],
      disableForReducedMotion: true,
    });
  });
}
