// Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// lucy-tweets
// const firebaseConfig = {
//   apiKey: "AIzaSyC91Fg_d39WKKW6Mzc7K-JgZ6ayKib7n1M",
//   authDomain: "lucy-tweets.firebaseapp.com",
//   projectId: "lucy-tweets",
//   storageBucket: "lucy-tweets.appspot.com",
//   messagingSenderId: "353977455970",
//   appId: "1:353977455970:web:8718215de9a316faf8483b",
//   measurementId: "G-D6V01533SE",
// };

// lucy-tweet-tests
// const firebaseConfig = {
//   apiKey: "AIzaSyC5ihn709CQpbse4YlGwqD0XeaD1tPWfLs",
//   authDomain: "lucy-tweet-tests.firebaseapp.com",
//   projectId: "lucy-tweet-tests",
//   storageBucket: "lucy-tweet-tests.appspot.com",
//   messagingSenderId: "884626548751",
//   appId: "1:884626548751:web:6878a9d10f600b23e49b7a",
//   measurementId: "G-W2HWH6J6VZ",
// };

// lucy-test
const firebaseConfig = {
  apiKey: "AIzaSyAwehoTgKpEYn9eL9p-EX3tehKRk8AI3hw",
  authDomain: "lucy-test-75403.firebaseapp.com",
  projectId: "lucy-test-75403",
  storageBucket: "lucy-test-75403.appspot.com",
  messagingSenderId: "461739404389",
  appId: "1:461739404389:web:4015ffb4923b047459ea8c",
  measurementId: "G-8VJM5HL534",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const db = getFirestore(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();
