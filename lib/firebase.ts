
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8bfCigVjGU8WV85VGqboadF1nbD4SRss",
  authDomain: "wayzo-tourist-app.firebaseapp.com",
  projectId: "wayzo-tourist-app",
  storageBucket: "wayzo-tourist-app.firebasestorage.app",
  messagingSenderId: "936227994165",
  appId: "1:936227994165:web:407d0d5659388bd367cf7c",
  measurementId: "G-NRH2ZGLJCM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Analytics is optional and only works in certain environments
let analytics = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { auth, googleProvider, analytics };
