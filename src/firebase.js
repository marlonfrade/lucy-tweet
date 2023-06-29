// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyD3b9ZJNuPc3IRtSaxQAy5FmADhiIg_sIA",
  authDomain: "lucy-tweet.firebaseapp.com",
  projectId: "lucy-tweet",
  storageBucket: "lucy-tweet.appspot.com",
  messagingSenderId: "505107626870",
  appId: "1:505107626870:web:affbb87ff47678dc5f1857",
  measurementId: "G-3KBLG79WLH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
