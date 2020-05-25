import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';

export default function* rootSaga() {
  // all - runs all sagas on 'seperate' task streams
  // but order may be important
  yield all([ call(fetchCollectionsStart) ]);
}

//
// same as above but without call invocation. ABove is better practice.
// export default function* rootSaga(){
//   yield all([
//     fetchCollectionsStart()
//   ])
// }
