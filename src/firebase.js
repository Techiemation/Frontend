// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; //google auth
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUpaihcrnLRDbUl334VGfzgvrXEH3-_7Q",
  authDomain: "techiemation-bf6c9.firebaseapp.com",
  projectId: "techiemation-bf6c9",
  storageBucket: "techiemation-bf6c9.appspot.com",
  messagingSenderId: "388101852073",
  appId: "1:388101852073:web:842b427dc35009f36692b8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); //google
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider }; //google
