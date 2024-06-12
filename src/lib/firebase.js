
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: "react-chat-356de.firebaseapp.com",
    projectId: "react-chat-356de",
    storageBucket: "react-chat-356de.appspot.com",
    messagingSenderId: "194840310533",
    appId: "1:194840310533:web:77e8fac3967c13052dfd6c",
    measurementId: "G-PWWBZ5YR47"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();