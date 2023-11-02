import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDin7jJVV37cZ3rSgVHZf-YEO1OlGrtXig",
  authDomain: "tiptop-bed4e.firebaseapp.com",
  projectId: "tiptop-bed4e",
  storageBucket: "tiptop-bed4e.appspot.com",
  messagingSenderId: "17288174616",
  appId: "1:17288174616:web:a0857f9c9d61c11d63776d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);
