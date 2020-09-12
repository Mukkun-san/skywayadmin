// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

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

firebase.initializeApp(firebaseConfig);

const fbAuth = firebase.auth();
const fbStorageRef = firebase.storage().ref();

export { fbAuth, fbStorageRef }
