// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore, doc, setDoc } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiGT-EdvkGY4ft3EbA-6oXqvH4NbauVlw",
  authDomain: "financely-app-20a26.firebaseapp.com",
  projectId: "financely-app-20a26",
  storageBucket: "financely-app-20a26.appspot.com",
  messagingSenderId: "254523647851",
  appId: "1:254523647851:web:8a942635e89649c32dce2e",
  measurementId: "G-K9NB4M87X5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc }