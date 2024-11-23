import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

// Initialize Firebase Admin SDK with default credentials
const adminConfig = {
    credential: applicationDefault(),
    databaseURL: "https://your-database-name.firebaseio.com",  // Si usas Firestore o Realtime Database
};

initializeApp(adminConfig);

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            const { token } = req.body;  // Obtener el token de Google desde el frontend

            // Verificar el token de Google
            const decodedToken = await getAuth().verifyIdToken(token);

            // Acceder a la API Key de Firebase desde las variables de entorno (en Vercel)
            const firebaseApiKey = process.env.AUTH_GOOGLE_FIREBASE_LOGIN_API_KEY;  // La API Key se almacena en las variables de entorno de Vercel

            console.log("Firebase API Key:", firebaseApiKey);  // Solo para verificar que la API Key está correcta

            res.status(200).json({ user: decodedToken });
        } catch (error) {
            res.status(500).json({ error: 'Error verifying token', message: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
