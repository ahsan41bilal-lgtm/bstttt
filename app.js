// ============================================
// Happy Birthday, Zoha — app.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Letter lines reveal on scroll ----
  const letterCard = document.getElementById('letter-card');
  if (letterCard) {
    const lines = letterCard.querySelectorAll('.letter-line');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lines.forEach((line) => line.classList.add('visible'));
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    observer.observe(letterCard);
  }

  // ---- Make a wish: candle blow ----
  const candleBtn = document.getElementById('candle-btn');
  const wishResult = document.getElementById('wish-result');
  const relightBtn = document.getElementById('relight-btn');
  const candleHint = document.getElementById('candle-hint');

  const sparkEmojis = ['✨', '💛', '🌸', '🎉'];

  function spawnSparks(originEl) {
    const rect = originEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 3;
    const count = 14;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('span');
      spark.className = 'wish-spark';
      spark.textContent = sparkEmojis[i % sparkEmojis.length];

      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
      const distance = 60 + Math.random() * 90;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance - 30;

      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);
      spark.style.left = `${originX}px`;
      spark.style.top = `${originY}px`;

      document.body.appendChild(spark);
      spark.addEventListener('animationend', () => spark.remove());
    }
  }

  if (candleBtn) {
    candleBtn.addEventListener('click', () => {
      const isBlown = candleBtn.classList.contains('blown');
      if (isBlown) return;

      candleBtn.classList.add('blown');
      candleBtn.setAttribute('aria-pressed', 'true');
      spawnSparks(candleBtn);

      window.setTimeout(() => {
        wishResult.classList.add('show');
        if (relightBtn) relightBtn.hidden = false;
      }, 250);
    });
  }

  if (relightBtn) {
    relightBtn.addEventListener('click', () => {
      candleBtn.classList.remove('blown');
      candleBtn.setAttribute('aria-pressed', 'false');
      wishResult.classList.remove('show');
      relightBtn.hidden = true;
    });
  }

});
