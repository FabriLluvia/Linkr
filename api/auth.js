export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { token } = req.body;  // The Google token you get on the frontend

      // Here you can use the Firebase Admin SDK to verify the Google token.     
      const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
      const { getAuth } = require('firebase-admin/auth');

      // Use the service certificate to securely authenticate in the backend.
      const adminConfig = {
        credential: applicationDefault(),
      };

      initializeApp(adminConfig);

      // Verify the Google token that was sent from the frontend
      const decodedToken = await getAuth().verifyIdToken(token);

      res.status(200).json({ user: decodedToken });
    } catch (error) {
      res.status(500).json({ error: 'Error verifying token', message: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
