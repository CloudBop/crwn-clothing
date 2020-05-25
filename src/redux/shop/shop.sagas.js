import { takeEvery } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
//
//
//
export function* fetchCollectionsAsync() {
  yield console.log('fetchCollectionsAsync ran as a saga');
}
//
export function* fetchCollectionsStart() {
  // note - all sagas attempt to run concurrently
  // takevery - nonblocking
  yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
