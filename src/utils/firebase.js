// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAhgbHnwz-jfsYro5_XhgBWCernIiehpZI",
  authDomain: "tests-d410c.firebaseapp.com",
  projectId: "tests-d410c",
  storageBucket: "tests-d410c.appspot.com",
  messagingSenderId: "1033550190081",
  appId: "1:1033550190081:web:a6cbc2ebb2c2b006af1200",
  measurementId: "G-YY0QEQ6C92"
};

console.log(firebase.initializeApp(firebaseConfig))

const fbAuth = firebase.auth();
const fbStorage = firebase.storage;

export { fbAuth, fbStorage }
