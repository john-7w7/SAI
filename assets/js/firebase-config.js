import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js';

const firebaseConfig = {
  apiKey: "AIzaSyDLgaSXF9-99dzys4_W0PgY3s2F-0trYZ0",
  authDomain: "sai-panel.firebaseapp.com",
  projectId: "sai-panel",
  storageBucket: "sai-panel.firebasestorage.app",
  messagingSenderId: "51904700604",
  appId: "1:51904700604:web:530256f8c7e676fbdbb0b9",
  measurementId: "G-SPK6KDPT4L"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };