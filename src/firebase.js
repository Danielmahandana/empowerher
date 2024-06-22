// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY2o_O-neyJ_SDj4O3OXMI4ziXGk2aNCE",
  authDomain: "justiguard-ai.firebaseapp.com",
  projectId: "justiguard-ai",
  storageBucket: "justiguard-ai.appspot.com",
  messagingSenderId: "696669621594",
  appId: "1:696669621594:web:ce7c01695d5843b490b763",
  measurementId: "G-7THQT1GZ9C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;