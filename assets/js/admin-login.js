import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';

const form = document.getElementById('loginForm');
const alertBox = document.getElementById('loginAlert');

function showAlert(type, message){
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;
  alertBox.classList.remove('d-none');
}

onAuthStateChanged(auth, (user) => {
  if (user) window.location.href = './panel.html';
});

form?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = './panel.html';
  } catch (error) {
    console.error(error);
    showAlert('danger', 'No se pudo iniciar sesión. Revisa el correo, la contraseña y la configuración de Authentication.');
  }
});
