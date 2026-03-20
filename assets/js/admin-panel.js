import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { collection, onSnapshot, orderBy, query, doc, updateDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

const tbody = document.getElementById('cotizacionesBody');
const logoutBtn = document.getElementById('logoutBtn');
const counters = {
  enviado: document.getElementById('count-enviado'),
  autorizado: document.getElementById('count-autorizado'),
  facturado: document.getElementById('count-facturado'),
  cancelado: document.getElementById('count-cancelado')
};

const estadoOptions = [
  { value: 'enviado', label: 'Enviado' },
  { value: 'autorizado', label: 'Autorizado' },
  { value: 'facturado', label: 'Facturado' },
  { value: 'cancelado', label: 'Cancelado' }
];

logoutBtn?.addEventListener('click', async () => {
  await signOut(auth);
  window.location.href = './login.html';
});

function urgencyBadge(value) {
  const raw = (value || 'sin urgencia').toLowerCase();
  const isUrgent = raw === 'urgente';
  return `<span class="urgency-badge ${isUrgent ? 'urgente' : 'normal'}">${isUrgent ? 'Urgente' : 'Sin urgencia'}</span>`;
}

function renderRows(items){
  if(!items.length){
    tbody.innerHTML = '<tr><td colspan="9" class="text-center text-muted py-4">Aún no hay cotizaciones.</td></tr>';
    return;
  }

  tbody.innerHTML = items.map(item => {
    const createdAt = item.createdAt?.toDate ? item.createdAt.toDate() : null;
    const dateText = createdAt ? createdAt.toLocaleString('es-MX') : 'Sin fecha';
    return `
      <tr>
        <td><strong>${item.nombre || '-'}</strong><div class="small text-muted">${item.empresa || ''}</div></td>
        <td>${item.correo || '-'}</td>
        <td>${item.telefono || '-'}</td>
        <td>${item.servicio || '-'}</td>
        <td>${urgencyBadge(item.prioridad)}</td>
        <td class="td-description">${item.descripcion || '-'}</td>
        <td>${item.ciudad || '-'}</td>
        <td>${dateText}</td>
        <td>
          <select class="form-select form-select-sm estado-select estado-${item.estado || 'enviado'}" data-id="${item.id}">
            ${estadoOptions.map(opt => `<option value="${opt.value}" ${opt.value === item.estado ? 'selected' : ''}>${opt.label}</option>`).join('')}
          </select>
        </td>
      </tr>`;
  }).join('');

  tbody.querySelectorAll('.estado-select').forEach(select => {
    select.addEventListener('change', async (event) => {
      const target = event.currentTarget;
      const id = target.dataset.id;
      const estado = target.value;
      target.className = `form-select form-select-sm estado-select estado-${estado}`;
      try {
        await updateDoc(doc(db, 'cotizaciones', id), { estado, updatedAt: serverTimestamp() });
      } catch (error) {
        console.error(error);
        alert('No se pudo actualizar el estado.');
      }
    });
  });
}

function updateCounters(items){
  const summary = { enviado: 0, autorizado: 0, facturado: 0, cancelado: 0 };
  items.forEach(item => { if(summary[item.estado] !== undefined) summary[item.estado] += 1; });
  Object.keys(summary).forEach(key => counters[key].textContent = String(summary[key]));
}

onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = './login.html';
    return;
  }

  const q = query(collection(db, 'cotizaciones'), orderBy('createdAt', 'desc'));
  onSnapshot(q, (snapshot) => {
    const items = snapshot.docs.map(docSnap => ({ id: docSnap.id, ...docSnap.data() }));
    updateCounters(items);
    renderRows(items);
  }, (error) => {
    console.error(error);
    tbody.innerHTML = '<tr><td colspan="9" class="text-center text-danger py-4">No se pudieron leer las cotizaciones. Revisa las reglas de Firestore.</td></tr>';
  });
});
