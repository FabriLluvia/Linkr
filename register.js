// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAYwh5vWLOkG4KAyeNxBBT0VWqHQeLPJjs",
    authDomain: "lyrkr-users.firebaseapp.com",
    projectId: "lyrkr-users",
    storageBucket: "lyrkr-users.firebasestorage.app",
    messagingSenderId: "635599211116",
    appId: "1:635599211116:web:5adc7591d8e9821775a649",
    measurementId: "G-422L5LMDGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Inputs for Email & Password
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;

// Submit Button
const submit = document.getElementById('submit');
submit.addEventListener("click", function (event) {
    event.preventDefault();
    window.alert("Hello world!");
    alert("Hello world!");
});