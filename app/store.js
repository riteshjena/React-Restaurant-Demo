import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { reducers } from './reducers';
import { sagas } from './sagas';

const sagaMiddleware = createSagaMiddleware();
let middlewares = [
  sagaMiddleware
];
const enhancers = [
  applyMiddleware(...middlewares),
];

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const store = createStore(
  reducers,
  composeEnhancers(...enhancers)
);
sagaMiddleware.run(sagas);

export { store };
