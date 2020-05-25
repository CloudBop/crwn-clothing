import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  // all - runs all sagas on 'seperate' task streams
  // but order may be important
  yield all([ call(fetchCollectionsStart), call(userSagas), call(cartSagas) ]);
}

//
// same as above but without call invocation. ABove is better practice.
// export default function* rootSaga(){
//   yield all([
//     fetchCollectionsStart()
//   ])
// }
