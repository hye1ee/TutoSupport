import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvx3DMmYOu9I56IOzdpPcbjb_c71L4zYA",
  authDomain: "fir-tuto-d6343.firebaseapp.com",
  projectId: "fir-tuto-d6343",
  storageBucket: "fir-tuto-d6343.firebasestorage.app",
  messagingSenderId: "190126781323",
  appId: "1:190126781323:web:b69c0330172683d7d3358e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const storage = getStorage(app); // Add this line
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
