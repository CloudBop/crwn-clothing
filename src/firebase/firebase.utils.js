// import get necessary libs off of FB - Don't want it all as FB is quite large
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
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

export const createUserProfileDocumentInFirestore = async (userAuth, additionalData) => {
  //
  if (!userAuth) return;
  //
  // query firestore
  //
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  // query the firestoreDB
  const snapShot = await userRef.get();
  // if the user doesn't exists in FS-DB
  if (!snapShot.exists) {
    //
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    //
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};
//
firebase.initializeApp(config);
//
// - a function to hydrate collection in firestore
// - create new collection of docs in FS - sanitised via map
// addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items })));
//
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  // create new collection from FS.
  const collectionRef = firestore.collection(collectionKey);
  // create a batch, to set store items together
  const batch = firestore.batch();
  // loop through array
  objectsToAdd.forEach(obj => {
    // create a new doc in collection
    const newDocRef = collectionRef.doc();
    // add to batch
    batch.set(newDocRef, obj);
  });
  // returns a promise
  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();
//
export const convertCollectionsSnapshotToMap = collection => {
  const transformedCollection = collection.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    };
  });
  // console.log('transformedCollection', transformedCollection);
  // convert array to object hash [item1,item2] to {item1:collection, item2:collection2}
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};
// google sign in stuff
export const googleProvider = new firebase.auth.GoogleAuthProvider();
// set trigger google pop for auth/signing
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);
//
export default firebase;
