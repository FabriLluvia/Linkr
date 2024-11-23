import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "",  // Aquí no debes poner la API Key de Firebase, se usará en el backend
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
            // Get the Google token
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // Send the token to the backend for verification
            fetch("https://your-vercel-url.com/api/auth", {  // Reemplaza con tu URL de Vercel
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token }),  // Enviar el token al backend
            })
            .then(response => response.json())
            .then(data => {
                console.log("Authenticated user:", data.user);
                window.location.href = '../LoggedIn.html';  // Redirigir si la autenticación es exitosa
            })
            .catch((error) => {
                console.error("Error authenticating with the backend:", error);
            });

        }).catch((error) => {
            console.error("Error signing in:", error.message);
        });
});


function updateUserProfile(user) {
    const userName = user.displayName;
    const userEmail = user.email;
    const userProfilePicture = user.photoURL;

    // Update the profile section with user data
    document.getElementById("userName").textContent = userName;
    document.getElementById("userEmail").textContent = userEmail;
    document.getElementById("userProfilePicture").src = userProfilePicture;
}

updateUserProfile();