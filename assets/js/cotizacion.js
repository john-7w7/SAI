import { db } from './firebase-config.js';
import {
  collection,
  addDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

const form = document.getElementById('quoteForm');
const alertBox = document.getElementById('quoteAlert');
const submitBtn = document.getElementById('submitQuoteBtn');
const btnLabel = submitBtn?.querySelector('.btn-label');
const btnLoader = submitBtn?.querySelector('.btn-loader');

function showAlert(message, type = 'success') {
  if (!alertBox) return;
  alertBox.className = `alert alert-${type}`;
  alertBox.textContent = message;
  alertBox.classList.remove('d-none');
}

function setLoading(isLoading) {
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  if (btnLabel) btnLabel.classList.toggle('d-none', isLoading);
  if (btnLoader) btnLoader.classList.toggle('d-none', !isLoading);
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = new FormData(form);

    const payload = {
      nombre: data.get('nombre')?.toString().trim() || '',
      empresa: data.get('empresa')?.toString().trim() || '',
      correo: data.get('correo')?.toString().trim() || '',
      telefono: data.get('telefono')?.toString().trim() || '',
      servicio: data.get('servicio')?.toString().trim() || '',
      prioridad: data.get('prioridad')?.toString().trim() || '',
      descripcion: data.get('descripcion')?.toString().trim() || '',
      ciudad: data.get('ciudad')?.toString().trim() || '',
      fechaNecesaria: data.get('fechaNecesaria')?.toString().trim() || '',
      estado: 'enviado',
      createdAt: serverTimestamp()
    };

    try {
      setLoading(true);
      alertBox?.classList.add('d-none');

      await addDoc(collection(db, 'cotizaciones'), payload);

      showAlert('Cotización enviada correctamente. Te contactaremos pronto.', 'success');
      form.reset();
    } catch (error) {
      console.error('Error al guardar cotización:', error);
      showAlert(`No se pudo enviar la cotización: ${error.message}`, 'danger');
    } finally {
      setLoading(false);
    }
  });
}