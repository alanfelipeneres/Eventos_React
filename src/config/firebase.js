import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyAaBkF7GAUQ-daHkFo2aTFujN-9nt84O7s",
  authDomain: "eventos-9e655.firebaseapp.com",
  databaseURL: "https://eventos-9e655.firebaseio.com",
  projectId: "eventos-9e655",
  storageBucket: "eventos-9e655.appspot.com",
  messagingSenderId: "1003469568539",
  appId: "1:1003469568539:web:f89601ea75c7571d11d6be"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);