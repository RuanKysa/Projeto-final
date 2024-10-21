import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDm1u9ImkD6PXLZ51ytABj_40-jJGtdKM",
  authDomain: "back-endrk.firebaseapp.com",
  projectId: "back-endrk",
  storageBucket: "back-endrk.appspot.com",
  messagingSenderId: "803901139041",
  appId: "1:803901139041:web:abccc1a253a1b7dd9e2220"
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
