import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './user.actions';
import {
  auth,
  googleProvider,
  createUserProfileDocumentInFirestore,
  getCurrentUser
} from '../../firebase/firebase.utils';

// SAGA ACTION GENERATORS
//
export function* getSnapshotFromUserAuth(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocumentInFirestore, userAuth);
    const userSnapshot = yield userRef.get();
    // 'put'/'dispatch' redux action
    yield put(
      signInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data()
      })
    );
  } catch (error) {
    yield put(signInFailure(error));
  }
}
//
export function* signInWithGoogle() {
  //
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
  //
}
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* isUserAuthenticated() {
  //
  try {
    //
    const userAuth = yield getCurrentUser();
    //
    if (!userAuth) return;
    //
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    //
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  //
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

// action-listeners
// invoked when these action.types are dispatched
//
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

//
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

//
export function* onUserCheckSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

//
export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

export function* userSagas() {
  // compose all userSagas
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onUserCheckSession),
    // -- interesting note -- comment line above un comment below
    // call(isUserAuthenticated) // instructor typo/error
    call(onSignOutStart)
  ]);
}

/* QUESTION
Would it be better to pass in the onCheckUserSession saga to userSagas, instead of the isUserAuthenticated saga?

On app load, redux-saga will indeed call the isUserAuthenticated saga, so it looks like it works. But this saga does not tell redux-saga to listen out for UserActionTypes.CHECK_USER_SESSION actions. Instead it is the onCheckUserSession saga that tells redux-saga to listen for the CHECK_USER_SESSION action.
If for example, we made a call to the checkUserSession action in the shop.component.js componentDidMount() method, redux-saga won't check the user session when we visit the shop, because it's not listening out for this action.
To make the app more flexible and be able to check for user sessions not only during first load of the app, is it ok to do the following?

I don't understand, why is it that that isUserAuthenticated is called when there is no UserActionTypes assigned to it?
From my understanding the userSagas function determines which functions that have userActionTypes assigned to them.
Or wait is it being called all the time now because there isn't a specific UserActionType it is assigned to?
*/

/* answer
You're totally right, that was a typo on my part! That's a good catch!
The code does indeed still work because our app component will always mount regardless of what page you're on,

 The reason it's working in the previous version before the correction is because when our sagas get initialized for the first time,
our saga functions all get invoked, some are waiting for takeLatest and a particular action to fire, 
but this function isUserAuthenticated in particular just checks if there's an existing userAuth, and if there is log them in.
The reason it still works is because the only thing that's different in triggering it on our action CHECK_CURRENT_USER versus just firing it on saga initialization is timing,
on the action it's on componentDidMount of our app component, whereas here it's when the sagas initialize which is before the app component mounts. 
In both instances, if your user has an auth, they can still log in because that's stored on firebase which is outside of our react application!

  I made updates to the code repos 7 months ago when this correction was first brought up but I did not make a note in the lecture which I have just added that now! Apologies for the confusion.
 */

/* explanation 2
You may notice that our code still worked before. The reason for that is because when our sagas initialize, our isUserAuthenticated saga function still ran which checked if the user had an existing userAuth in firebase (which is outside of our react app). If userAuth existed and they were still logged in, get the data and update currentUser, otherwise nothing happens. The main difference between this change in the saga though is the timing of when our saga isUserAuthenticated fires. In the correct setup it fires whenever the CHECK_CURRENT_USER action is dispatched which is what our onCheckUserSession saga is listening for, which in our case is when the App component mounts. In the previous case it was when all our sagas were initialized, which is before the component mounts but after our redux store is initialized.
*/
