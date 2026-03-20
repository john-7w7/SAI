# Firebase desde 0 para este proyecto

## 1. Crear el proyecto
Nombre recomendado:
`saI-cotizaciones-panel`

## 2. Crear app web
Nombre recomendado:
`saI-web-publico`

Cuando Firebase te dé la configuración, copia los datos y pégalos en:
`assets/js/firebase-config.js`

## 3. Activar Authentication
Ve a:
Authentication -> Sign-in method -> Email/Password -> Enable

## 4. Crear usuario admin
Ve a:
Authentication -> Users -> Add user

Ejemplo:
- correo: `admin@sai.com`
- contraseña: `SaiPanel2026*`

Ese usuario entra aquí:
`/sai-admin-privado/login`

## 5. Crear Firestore Database
Ve a:
Firestore Database -> Create database
Modo recomendado para empezar: production
Región: la más cercana a ti.

## 6. Crear colección
Colección:
`cotizaciones`

No necesitas crear todos los documentos manualmente. El formulario público los irá creando.

## 7. Reglas recomendadas
Pega esto en Firestore Rules:

```txt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /cotizaciones/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

Así:
- cualquier visitante puede enviar cotización
- solo usuarios logueados pueden ver y actualizar desde el panel

## 8. Qué campos se guardan
- nombre
- empresa
- correo
- telefono
- servicio
- prioridad (urgente / sin urgencia)
- descripcion
- ciudad
- fechaNecesaria
- estado
- origen
- createdAt
- updatedAt

## 9. Cómo conectar
Edita `assets/js/firebase-config.js`:

```js
const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_AUTH_DOMAIN',
  projectId: 'TU_PROJECT_ID',
  storageBucket: 'TU_STORAGE_BUCKET',
  messagingSenderId: 'TU_MESSAGING_SENDER_ID',
  appId: 'TU_APP_ID'
};
```

## 10. Netlify
Sube toda esta carpeta.
Ya incluye:
- `_redirects`
- `netlify.toml`

La ruta oculta quedará así:
- `https://tudominio.com/sai-admin-privado/login`
- `https://tudominio.com/sai-admin-privado/panel`
