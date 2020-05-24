import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
// invoke functions in actions
import thunk from 'redux-thunk';
// middlewares may contain multiple items
const middlewares = [ thunk ];
//
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
//
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// - leverage localStorage
export const persistor = persistStore(store);
