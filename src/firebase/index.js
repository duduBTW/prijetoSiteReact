import firebase from 'firebase/app'
import 'firebase/storage'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBtcAowbu5t8fnhsnJG4XD0m77DwW_a0PQ",
    authDomain: "eniacprojeto-96de7.firebaseapp.com",
    databaseURL: "https://eniacprojeto-96de7.firebaseio.com",
    projectId: "eniacprojeto-96de7",
    storageBucket: "eniacprojeto-96de7.appspot.com",
    messagingSenderId: "386691822252",
    appId: "1:386691822252:web:2da9d2dc37447ec33b2509"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}