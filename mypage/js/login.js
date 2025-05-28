import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "index.html"; // Weiterleitung
    })
    .catch(err => alert("Login fehlgeschlagen: " + err.message));
});

registerBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Registrierung erfolgreich. Jetzt einloggen.");
    })
    .catch(err => alert("Registrierung fehlgeschlagen: " + err.message));
});

// Schon eingeloggt? → Direkt weiterleiten
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "index.html";
  }
});
