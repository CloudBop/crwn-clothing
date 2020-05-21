import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';
// middlewares may contain multiple items
const middlewares = [ logger ];
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// - leverage localStorage
export const persistor = persistStore(store);
