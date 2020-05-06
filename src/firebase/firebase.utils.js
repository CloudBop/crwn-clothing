// import get necessary libs off of FB - Don't want it all as FB is quite large
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
//
const config = {
  apiKey: 'AIzaSyDSVrk1fghZYxxwl6g366XnQuFBhaSfQv8',
  authDomain: 'crwn-db-cf745.firebaseapp.com',
  databaseURL: 'https://crwn-db-cf745.firebaseio.com',
  projectId: 'crwn-db-cf745',
  storageBucket: 'crwn-db-cf745.appspot.com',
  messagingSenderId: '1063906790668',
  appId: '1:1063906790668:web:0fa743e2588e0fc3f14d29',
  measurementId: 'G-RJLZG3C7T1'
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
//
const provider = new firebase.auth.GoogleAuthProvider();
// set trigger google pop for auth/signing
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
//
export default firebase;
