import firebase from "firebase/app";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCw64NViTvmBefy5Y9cirw0rKerN08lpdE",
  authDomain: "react-firebase-authentic-84172.firebaseapp.com",
  databaseURL: "https://react-firebase-authentic-84172.firebaseio.com",
  projectId: "react-firebase-authentic-84172",
  storageBucket: "react-firebase-authentic-84172.appspot.com",
  messagingSenderId: "63571076384"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const auth = firebase.auth();

export { auth };
