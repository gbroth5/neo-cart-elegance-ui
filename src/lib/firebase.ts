
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVCEWUMiSPmjmlSQDHakagoHyZlLlLncs",
  authDomain: "e-comm-814bf.firebaseapp.com",
  projectId: "e-comm-814bf",
  storageBucket: "e-comm-814bf.firebasestorage.app",
  messagingSenderId: "389880259864",
  appId: "1:389880259864:web:6ed43dd1a07c0e4aab6a6d",
  measurementId: "G-TST7W89JLR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth, analytics };
