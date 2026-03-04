(() => {
  const box = document.getElementById('infoBox');
  const openBtn = document.getElementById('btnVerMas');
  const closeBtn = document.getElementById('btnCerrar');
  if (!box || !openBtn || !closeBtn) return;

  const open = () => box.classList.add('active');
  const close = () => box.classList.remove('active');

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', (e) => { e.preventDefault(); close(); });
})();
