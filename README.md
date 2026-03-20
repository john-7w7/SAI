# SAI 
## Qué trae
- Sitio público estático conservado.
- `cotizacion.html` con formulario conectado a Firebase Firestore.
- Ruta oculta de administración:
  - `/sai-admin-privado/login`
  - `/sai-admin-privado/panel`
- Panel con login por Firebase Authentication.
- Tabla en tiempo real con estados:
  - Enviado
  - Autorizado
  - Facturado
  - Cancelado

## Archivos clave
- `assets/js/firebase-config.js` -> aquí pegas tus credenciales.
- `assets/js/cotizacion.js` -> envía el formulario al panel.
- `assets/js/admin-panel.js` -> muestra y actualiza cotizaciones.
- `sai-admin-privado/login.html`
- `sai-admin-privado/panel.html`

## Probar localmente
Puedes abrir con Laragon o cualquier servidor local. Ejemplo:
- `http://localhost/netlify/cotizacion.html`
- `http://localhost/netlify/sai-admin-privado/login`

## Importante
No abras con doble clic `file:///...`. Usa servidor local.
