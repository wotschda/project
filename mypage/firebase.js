// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);