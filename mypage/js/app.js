function postTweet() {
  const input = document.getElementById("tweetInput");
  const text = input.value.trim();
  if (text === "") return;

  const tweetFeed = document.getElementById("tweetFeed");

  const tweet = document.createElement("div");
  tweet.className = "tweet";
  tweet.innerText = text;

  tweetFeed.prepend(tweet); // neuester Tweet oben
  input.value = ""; // Eingabefeld leeren
}
