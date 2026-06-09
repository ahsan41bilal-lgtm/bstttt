/* =========================================
   app.js — Best Friends Day · Zoha 💛
   ========================================= */

// ── Letter reveal on scroll ────────────────
function initLetterReveal() {
  const lines = document.querySelectorAll('.letter-line');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        lines.forEach((line, i) => {
          setTimeout(() => line.classList.add('visible'), i * 150);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const card = document.getElementById('letter-card');
  if (card) observer.observe(card);
}

// ── Polaroid click sparkle (CSS emoji pop) ─
function spawnEmoji(x, y) {
  const emojis = ['💛','🌸','⭐','✨','🌺'];
  for (let i = 0; i < 6; i++) {
    const el = document.createElement('span');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `
      position: fixed;
      left: ${x}px; top: ${y}px;
      font-size: ${14 + Math.random() * 14}px;
      pointer-events: none;
      z-index: 9999;
      animation: popUp 0.8s ease forwards;
      --tx: ${(Math.random() - 0.5) * 80}px;
      --ty: ${-(30 + Math.random() * 60)}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 850);
  }
}

// ── Init ───────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLetterReveal();

  // Polaroid click sparkle
  document.querySelectorAll('.polaroid').forEach(p => {
    p.addEventListener('click', () => {
      const r = p.getBoundingClientRect();
      spawnEmoji(r.left + r.width / 2, r.top + r.height / 2);
    });
  });
});
