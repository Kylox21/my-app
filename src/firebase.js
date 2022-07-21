import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASgY8XGA9Syto3TI1JTFNb3SjnPpzCn18",
  authDomain: "test2-b254a.firebaseapp.com",
  databaseURL: "https://test2-b254a-default-rtdb.firebaseio.com",
  projectId: "test2-b254a",
  storageBucket: "test2-b254a.appspot.com",
  messagingSenderId: "497258333076",
  appId: "1:497258333076:web:2eb2c1507d4d3b4d214581",
  measurementId: "G-W726MKJSQ5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
