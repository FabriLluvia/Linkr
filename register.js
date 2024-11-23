
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";


const firebaseConfig = {
    apiKey: "",
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
s

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

            // Send the token to the backend in Vercel
            fetch("https://<your-project>.vercel.app/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token: token }),  // Send the token to the backend
            })
            .then(response => response.json())
            .then(data => {
                console.log("Authenticated user:", data.user);
                window.location.href = '../LoggedIn.html'; // Redirect if everything is fine
            })
            .catch((error) => {
                console.error("Error authenticating with the backend:", error);
            });

        }).catch((error) => {
            // Handle errors here
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