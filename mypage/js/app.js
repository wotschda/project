const postFeed = document.getElementById("postFeed");
const postInput = document.getElementById("postInput");
const usernameInput = document.getElementById("username");

function postMessage() {
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

function savePost(post) {
  const posts = getPosts();
  posts.unshift(post); // neuester Beitrag zuerst
  localStorage.setItem("wotschingtonPosts", JSON.stringify(posts));
}

function getPosts() {
  return JSON.parse(localStorage.getItem("wotschingtonPosts")) || [];
}

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

// Beim Laden der Seite Beiträge anzeigen
renderPosts();
