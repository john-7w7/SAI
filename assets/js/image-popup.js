(() => {
  const overlay = document.getElementById('popOverlay');
  const img = document.getElementById('popImg');
  if (!overlay || !img) return;

  const open = (src, alt='') => {
    img.src = src;
    img.alt = alt;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
  };
  const close = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    img.src = '';
  };

  // Click to open (más consistente en móvil)
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.closest && target.closest('.js-pop')) {
      const el = target.closest('.js-pop');
      const source = el.getAttribute('data-pop-src') || el.getAttribute('src');
      if (source) open(source, el.getAttribute('alt') || '');
    }

    if (e.target === overlay) close();
  });

  // ESC to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Hover preview (solo desktop)
  const isCoarse = window.matchMedia('(pointer: coarse)').matches;
  if (!isCoarse) {
    let hoverTimer;
    document.addEventListener('mouseenter', (e) => {
      const t = e.target;
      if (t && t.classList && t.classList.contains('js-pop-hover')) {
        const source = t.getAttribute('data-pop-src') || t.getAttribute('src');
        if (!source) return;
        hoverTimer = setTimeout(() => open(source, t.getAttribute('alt') || ''), 180);
      }
    }, true);

    document.addEventListener('mouseleave', (e) => {
      const t = e.target;
      if (t && t.classList && t.classList.contains('js-pop-hover')) {
        clearTimeout(hoverTimer);
        // No cerramos automático si el usuario abrió en click; solo si overlay no está abierto.
        if (overlay.classList.contains('is-open')) return;
      }
    }, true);
  }
})();
