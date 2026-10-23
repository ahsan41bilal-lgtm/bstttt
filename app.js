// ============================================
// Happy Birthday, Princess — app.js
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Photo fallback (shows a heart if princess.jpg is missing) ----
  const photo = document.getElementById('portrait-img');
  const frame = document.querySelector('.portrait-frame');
  if (photo && frame) {
    const markMissing = () => frame.classList.add('no-photo');
    photo.addEventListener('error', markMissing);
    if (photo.complete && photo.naturalWidth === 0) markMissing();
  }

  // ---- Floating sparks (used by the candle and the heart) ----
  function spawnSparks(originEl, emojis, count) {
    const rect = originEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 3;

    for (let i = 0; i < count; i++) {
      const spark = document.createElement('span');
      spark.className = 'wish-spark';
      spark.textContent = emojis[i % emojis.length];

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

  // ---- Letter lines reveal on scroll ----
  const letterCard = document.getElementById('letter-card');
  if (letterCard) {
    const lines = letterCard.querySelectorAll('.letter-line');
    const showAll = () => lines.forEach((line) => line.classList.add('visible'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            showAll();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      observer.observe(letterCard);
    } else {
      showAll();
    }
  }

  // ---- Make a wish: candle blow ----
  const candleBtn = document.getElementById('candle-btn');
  const wishResult = document.getElementById('wish-result');
  const relightBtn = document.getElementById('relight-btn');

  if (candleBtn) {
    candleBtn.addEventListener('click', () => {
      if (candleBtn.classList.contains('blown')) return;

      candleBtn.classList.add('blown');
      candleBtn.setAttribute('aria-pressed', 'true');
      spawnSparks(candleBtn, ['✨', '💗', '💖', '🎉'], 14);

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

  // ---- For the tired days: tap the heart ----
  const heartBtn = document.getElementById('heart-btn');
  const reminderText = document.getElementById('reminder-text');
  const reminderHint = document.getElementById('reminder-hint');

  const reminders = [
    'You are doing better than you think.',
    'Your kids are growing up with a mama who never gave up. That is the best gift they will ever have.',
    'It is okay to rest. Even the strongest princess needs a break.',
    'I see your hard work, even when nobody says it out loud.',
    'You do not have to be strong every single day. I am proud of you anyway.',
    'Your smile is my favorite thing. Please keep it safe.',
    'You are not alone, not today and not ever.'
  ];
  let reminderIndex = -1;

  if (heartBtn && reminderText) {
    heartBtn.addEventListener('click', () => {
      reminderIndex = (reminderIndex + 1) % reminders.length;

      reminderText.classList.remove('swap');
      void reminderText.offsetWidth; // restart the fade animation
      reminderText.textContent = reminders[reminderIndex];
      reminderText.classList.add('swap');

      heartBtn.classList.remove('pop');
      void heartBtn.offsetWidth;
      heartBtn.classList.add('pop');
      heartBtn.addEventListener('animationend', () => heartBtn.classList.remove('pop'), { once: true });

      spawnSparks(heartBtn, ['💗', '✨', '💖'], 8);
      if (reminderHint) reminderHint.textContent = 'tap again, there is more';
    });
  }

});
