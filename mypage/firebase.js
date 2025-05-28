import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgDzl9AhAqhZgpkAIuHbULoQ07GU-2CrI",
  authDomain: "wotschington-forum.firebaseapp.com",
  projectId: "wotschington-forum",
  storageBucket: "wotschington-forum.firebasestorage.app",
  messagingSenderId: "929309980471",
  appId: "1:929309980471:web:dbc4d25f2f0d598ed64cb2",
  measurementId: "G-S2K5T658NM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
