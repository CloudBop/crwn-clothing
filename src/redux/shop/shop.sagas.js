import { takeLatest, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';
import ShopActionTypes from './shop.types';
//
//
//
export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    //
    const snapshot = yield collectionRef.get();
    // arg 1 is callback, arg 2 is args for callback
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
    // put == dispatch
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
  // ABOVE IS SIMILAR TO THUNK
  // - will only make request onMount. Not observable
  // collectionRef
  //   .get()
  //   .then(snapshot => {
  //     // promisified
  //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //     // update state
  //     dispatch(fetchCollectionsSuccess(collectionsMap));
  //     //
  //     // this.setState({ loading: false });
  //   })
  //   .catch(err => dispatch(fetchCollectionsFailure(err.message)));
}

//
export function* fetchCollectionsStart() {
  // note - all sagas attempt to run concurrently
  // takevery - nonblocking
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}
