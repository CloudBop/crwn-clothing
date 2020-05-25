import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
export default function* rootSaga() {
  // all - runs all sagas on 'seperate' task streams
  // but order may be important
  yield all([ call(fetchCollectionsStart), call(userSagas) ]);
}

//
// same as above but without call invocation. ABove is better practice.
// export default function* rootSaga(){
//   yield all([
//     fetchCollectionsStart()
//   ])
// }
