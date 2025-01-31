import { all, call, takeLatest, put } from 'redux-saga/effects';
// listen for these
import UserActionTypes from '../user/user.types';
// fire this
import { clearCart } from './cart.actions';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}
//
export function* cartSagas() {
  yield all([ call(onSignOutSuccess) ]);
}
