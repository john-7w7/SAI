<!-- Vendor JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
  if (window.AOS) AOS.init({ once: true, duration: 800, offset: 80 });
</script>

<script>
  // ===== Tema día / noche (persistente) =====
  (function(){
    const root = document.documentElement;
    const btn = document.getElementById('themeToggle');
    if(!btn) return;

    const ICON_SUN = '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
    const ICON_MOON = '<i class="fa-solid fa-moon" aria-hidden="true"></i>';

    function applyTheme(theme){
      const isLight = theme === 'light';
      root.classList.toggle('theme-light', isLight);
      btn.innerHTML = isLight ? ICON_MOON : ICON_SUN;
      btn.setAttribute('aria-label', isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro');
    }

    // Cargar preferencia
    const saved = localStorage.getItem('sai-theme');
    if(saved === 'light' || saved === 'dark'){
      applyTheme(saved);
    }else{
      // Si no hay preferencia guardada, usa sistema
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      applyTheme(prefersLight ? 'light' : 'dark');
    }

    btn.addEventListener('click', function(){
      const next = root.classList.contains('theme-light') ? 'dark' : 'light';
      localStorage.setItem('sai-theme', next);
      applyTheme(next);
    });
  })();
</script>
