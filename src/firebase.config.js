import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBVRcTpm1kAul9zZTJBaB29dYnzom-Vgcs",
    authDomain: "giftgiraffe-90920.firebaseapp.com",
    databaseURL: "https://giftgiraffe-90920-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "giftgiraffe-90920",
    storageBucket: "giftgiraffe-90920.appspot.com",
    messagingSenderId: "571797185484",
    appId: "1:571797185484:web:1d8ca956b8f919d50ab369",
    measurementId: "G-K5F0CDVCLF"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
