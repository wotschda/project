import { auth } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// DOM-Elemente
const postFeed = document.getElementById("postFeed");
const postInput = document.getElementById("postInput");
const usernameInput = document.getElementById("username");
const userInfo = document.getElementById("userInfo");
const userInputSection = document.querySelector(".user-input");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const postBtn = document.getElementById("postBtn");

// Beiträge aus localStorage laden
function getPosts() {
  return JSON.parse(localStorage.getItem("wotschingtonPosts")) || [];
}

// Beiträge speichern
function savePost(post) {
  const posts = getPosts();
  posts.unshift(post);
  localStorage.setItem("wotschingtonPosts", JSON.stringify(posts));
}

// Beiträge anzeigen
function renderPosts() {
  postFeed.innerHTML = "";
  const posts = getPosts();

  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <img src="images/default-avatar.png" alt="Avatar" />
      <div class="post-content">
        <div class="username">${post.username}</div>
        <div class="text">${post.text}</div>
      </div>
    `;
    postFeed.appendChild(postElement);
  });
}

// Beitrag posten
function postMessage() {
  if (!auth.currentUser) {
    alert("Bitte einloggen, um Beiträge zu posten.");
    return;
  }

  const text = postInput.value.trim();
  const username = usernameInput.value.trim() || "Anonym";

  if (text === "") return;

  const post = {
    username,
    text,
    time: new Date().toISOString()
  };

  savePost(post);
  renderPosts();
  postInput.value = "";
}

// Registrierung
function register() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Bitte Email und Passwort eingeben.");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Registrierung erfolgreich!");
    })
    .catch(error => {
      alert("Registrierung fehlgeschlagen: " + error.message);
    });
}

// Login
function login() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    alert("Bitte Email und Passwort eingeben.");
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login erfolgreich!");
    })
    .catch(error => {
      alert("Login fehlgeschlagen: " + error.message);
    });
}

// Logout
function logout() {
  signOut(auth)
    .then(() => {
      alert("Abgemeldet.");
    })
    .catch(error => {
      alert("Logout fehlgeschlagen: " + error.message);
    });
}

// Auth-Status beobachten
onAuthStateChanged(auth, user => {
  if (user) {
    userInfo.textContent = `Eingeloggt als: ${user.email}`;
    userInputSection.style.display = "flex";
  } else {
    userInfo.textContent = "Nicht eingeloggt.";
    userInputSection.style.display = "none";
  }
});

// Event-Listener an Buttons hängen
registerBtn.addEventListener("click", register);
loginBtn.addEventListener("click", login);
logoutBtn.addEventListener("click", logout);
postBtn.addEventListener("click", postMessage);

// Beim Laden Beiträge rendern
renderPosts();
