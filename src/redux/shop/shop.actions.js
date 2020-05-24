import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
//
// - dispatched action to state
export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});
export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});
export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});
//
/**
 * IF redux-thunk MIDDLEWARE IS ENABLED
 * anytime a dispatch is invoked with a fn (instead of {} ) the middleware will call that function with dispatch itself as the first argument
 */
// the invoked function to invoke the dispatched
export const fetchCollectionsStartAsync = () => {
  return dispatch => {
    const collectionRef = firestore.collection('collections');
    // update state
    dispatch(fetchCollectionsStart());
    // - will only make request onMount. Not observable
    collectionRef
      .get()
      .then(snapshot => {
        // promisified
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        // update state
        dispatch(fetchCollectionsSuccess(collectionsMap));
        //
        // this.setState({ loading: false });
      })
      .catch(err => dispatch(fetchCollectionsFailure(err.message)));
  };
};

// no longer in use - updated shop Collections with local shop.data
// export const updateCollections = collectionsMap => ({
//   type: ShopActionTypes.UPDATE_COLLECTIONS,
//   payload: collectionsMap
// });
