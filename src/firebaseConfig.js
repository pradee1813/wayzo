// ...new file...
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  try { analytics = getAnalytics(app); } catch (e) { /* analytics may fail in SSR */ }
}

export { app, auth, db, analytics };
// ...new file...