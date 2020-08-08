import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBGtxNbCz4slecL5yg8n8XRbH-8KfzDy_0",
    authDomain: "rieltadmin.firebaseapp.com",
    databaseURL: "https://rieltadmin.firebaseio.com",
    projectId: "rieltadmin",
    storageBucket: "rieltadmin.appspot.com",
    messagingSenderId: "747100474759",
    appId: "1:747100474759:web:b0e11f8a41dd653bc15722"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);
