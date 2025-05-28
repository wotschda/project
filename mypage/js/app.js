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

// Beitrag in localStorage speichern
function savePost(post) {
  const posts = getPosts();
  posts.unshift(post); // neuester Beitrag zuerst
  localStorage.setItem("wotschingtonPosts", JSON.stringify(posts));
}

// Beiträge aus localStorage laden
function getPosts() {
  return JSON.parse(localStorage.getItem("wotschingtonPosts")) || [];
}

// Beiträge anzeigen
function renderPosts() {
  postFeed.innerHTML = "";
  const posts = getPosts();

  posts.forEach(post => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
      <img src="images/default-avatar.png" alt="Avatar">
      <div class="post-content">
        <div class="username">${post.username}</div>
        <div class="text">${post.text}</div>
      </div>
    `;
    postFeed.appendChild(postElement);
  });
}

// Registrierung
window.register = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

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
};

// Login
window.login = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

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
};

// Logout
window.logout = function () {
  signOut(auth).then(() => {
    alert("Abgemeldet.");
  });
};

// Auth-Status beobachten
onAuthStateChanged(auth, user => {
  if (user) {
    userInfo.textContent = `Eingeloggt als: ${user.email}`;
    document.querySelector(".user-input").style.display = "flex";
  } else {
    userInfo.textContent = "Nicht eingeloggt.";
    document.querySelector(".user-input").style.display = "none";
  }
});

// Seite laden → Beiträge anzeigen
renderPosts();
