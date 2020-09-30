// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAmZzU2jWbgc8Pgt4OG2cw3gDm4VKuG1As",
    authDomain: "proto-a231d.firebaseapp.com",
    databaseURL: "https://proto-a231d.firebaseio.com",
    projectId: "proto-a231d",
    storageBucket: "proto-a231d.appspot.com",
    messagingSenderId: "498060664758",
    appId: "1:498060664758:web:031de1a474ac111769eb17",
    measurementId: "G-VLVLZYBY0F"
};

console.log(firebase.initializeApp(firebaseConfig))

const fbAuth = firebase.auth();
const fbStorage = firebase.storage;

export { fbAuth, fbStorage }
