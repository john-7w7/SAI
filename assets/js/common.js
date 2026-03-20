(function(){
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if(btn){
    const ICON_SUN = '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
    const ICON_MOON = '<i class="fa-solid fa-moon" aria-hidden="true"></i>';
    function applyTheme(theme){
      const isLight = theme === 'light';
      root.classList.toggle('theme-light', isLight);
      btn.innerHTML = isLight ? ICON_MOON : ICON_SUN;
      btn.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
    }
    const saved = localStorage.getItem('sai-theme');
    applyTheme(saved === 'light' || saved === 'dark' ? saved : 'dark');
    btn.addEventListener('click', function(){
      const next = root.classList.contains('theme-light') ? 'dark' : 'light';
      localStorage.setItem('sai-theme', next);
      applyTheme(next);
    });
  }
  const y = document.getElementById('year');
  if(y) y.textContent = new Date().getFullYear();
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar-custom');
    if(!navbar) return;
    navbar.classList.toggle('navbar-scrolled', window.scrollY > 60);
  });
})();
