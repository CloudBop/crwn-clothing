import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import rootReducer from './root-reducer';

// async stuff
//
// thunks
// import thunk from 'redux-thunk';
// invoke functions in redux-actions
//
// sagas
import createSagaMiddleware from 'redux-saga';
const sagaMiddleware = createSagaMiddleware();

// - connect middlewares
// middlewares may contain multiple items
const middlewares = [ sagaMiddleware ];
//
if (process.env.NODE_ENV === 'development') middlewares.push(logger);
//
//
export const store = createStore(rootReducer, applyMiddleware(...middlewares));
// redux-saga setup
// sagaMiddleware.run()
//
// - leverage localStorage
export const persistor = persistStore(store);
