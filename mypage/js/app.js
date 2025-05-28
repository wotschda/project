import { auth } from "./firebase.js";
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Redirect auf login.html wenn nicht eingeloggt
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  } else {
    document.getElementById("userInfo").textContent = `Eingeloggt als: ${user.email}`;
    document.querySelector(".user-input").style.display = "flex";
  }
});

// DOM
const postFeed = document.getElementById("postFeed");
const postInput = document.getElementById("postInput");
const usernameInput = document.getElementById("username");
const logoutBtn = document.getElementById("logoutBtn");
const postBtn = document.getElementById("postBtn");

// Beiträge laden
function getPosts() {
  return JSON.parse(localStorage.getItem("wotschingtonPosts")) || [];
}

function savePost(post) {
  const posts = getPosts();
  posts.unshift(post);
  localStorage.setItem("wotschingtonPosts", JSON.stringify(posts));
}

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

function postMessage() {
  if (!auth.currentUser) {
    alert("Bitte einloggen.");
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

function logout() {
  signOut(auth)
    .then(() => {
      window.location.href = "login.html"; // zurück zur Login-Seite
    })
    .catch(err => alert("Logout fehlgeschlagen: " + err.message));
}

// Events
logoutBtn.addEventListener("click", logout);
postBtn.addEventListener("click", postMessage);

// Anzeigen
renderPosts();
