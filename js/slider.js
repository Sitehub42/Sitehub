// assets/js/slider.js
(function() {
  const slider = document.querySelector('#portfolio-slider');
  if (!slider) return;

  const viewport = slider.querySelector('.carousel-viewport');
  const prevBtn = slider.querySelector('.carousel-btn.prev');
  const nextBtn = slider.querySelector('.carousel-btn.next');
  const dotsWrap = slider.querySelector('.carousel-dots');
  const track = slider.querySelector('.carousel-track');
  const slides = track ? Array.from(track.querySelectorAll('.slide')) : [];

  function pageWidth() { return viewport.clientWidth; }
  function go(dir) { viewport.scrollBy({ left: dir * pageWidth(), behavior: 'smooth' }); }

  prevBtn?.addEventListener('click', () => go(-1));
  nextBtn?.addEventListener('click', () => go(1));

  // Dots (optional)
  function renderDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const styles = getComputedStyle(slider);
    const spv = Math.max(1, parseInt(styles.getPropertyValue('--slides-per-view')) || 1);
    const pages = Math.ceil(slides.length / spv);
    for (let i = 0; i < pages; i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Go to projects page ' + (i + 1));
      b.addEventListener('click', () => viewport.scrollTo({
        left: slides[Math.min(i * spv, slides.length - 1)].offsetLeft - track.offsetLeft,
        behavior: 'smooth'
      }));
      dotsWrap.appendChild(b);
    }
    setActiveDot();
  }

  function setActiveDot() {
    if (!dotsWrap) return;
    const total = viewport.scrollWidth - viewport.clientWidth;
    const progress = total ? viewport.scrollLeft / total : 0;
    const buttons = [...dotsWrap.children];
    const idx = Math.round(progress * (buttons.length - 1));
    buttons.forEach((b, i) => b.setAttribute('aria-selected', i === idx));
  }

  viewport?.addEventListener('scroll', () => requestAnimationFrame(setActiveDot));
  window.addEventListener('resize', () => { renderDots(); setActiveDot(); });
  renderDots();
})();
