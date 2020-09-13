// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB_dSB9HyqOtB-uZ0ctkoEEqsyFSn6xRMg",
    authDomain: "skyway-tour.firebaseapp.com",
    databaseURL: "https://skyway-tour.firebaseio.com",
    projectId: "skyway-tour",
    storageBucket: "skyway-tour.appspot.com",
    messagingSenderId: "610214435219",
    appId: "1:610214435219:web:6a06974608f6d8c2feb066",
    measurementId: "G-07Z4DDYWGT"
};

console.log(firebase.initializeApp(firebaseConfig))

const fbAuth = firebase.auth();
const fbStorage = firebase.storage;

export { fbAuth, fbStorage }
