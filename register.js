
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";


const firebaseConfig = {
    apiKey: "AIzaSyAp83Tb4S9Cnrmhf1O3v99ZRWQtz6Zlkho",
    authDomain: "fmu-login-services.firebaseapp.com",
    projectId: "fmu-login-services",
    storageBucket: "fmu-login-services.firebasestorage.app",
    messagingSenderId: "53121289627",
    appId: "1:53121289627:web:e9b9d46f18209bb628653e",
    measurementId: "G-E0EZ03GSL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


const auth = getAuth();
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googleLogin = document.getElementById("google-login-btn");

googleLogin.addEventListener("click", function () {

    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            console.log(user);
            window.location.href = '../LoggedIn.html';
            // IdP data available using getAdditionalUserInfo(result)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
})