import { takeLatest, put, all, call } from 'redux-saga/effects';
import UserActionTypes from './user.types';
import { googleSignInSuccess, googleSignInFailure } from './user.actions';
import { auth, googleProvider, createUserProfileDocumentInFirestore } from '../../firebase/firebase.utils';

//
export function* signInWithGoogle() {
  //
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    console.log('user', user);
    const userRef = yield call(createUserProfileDocumentInFirestore, user);
    console.log('userRef', userRef);
    const userSnapshot = yield userRef.get();
    // 'put'/'dispatch' redux action
    yield put(
      googleSignInSuccess({
        id: userSnapshot.id,
        ...userSnapshot.data()
      })
    );
  } catch (error) {
    yield put(googleSignInFailure(error));
  }
  //
}
//
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* userSagas() {
  // compose all userSagas
  yield all([ call(onGoogleSignInStart) ]);
}
