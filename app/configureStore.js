import electron from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncNodeStorage } from 'redux-persist-node-storage';
import path from 'path';

import reducers from './reducers';

const configureStore = () => {
  const router = routerMiddleware(hashHistory);
  const middlewares = [thunk, router];

  if (process.env.NODE_ENV !== 'production') {
    const createLogger = require('redux-logger'); // eslint-disable-line global-require, import/no-extraneous-dependencies

    const logger = createLogger();
    middlewares.push(logger);
  }

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line no-underscore-dangle
  const store = createStore(
    reducers,
    undefined,
    composeEnhancers(
      applyMiddleware(...middlewares),
      autoRehydrate(),
    ),
  );

  store.history = syncHistoryWithStore(hashHistory, store);

  const app = electron.app || electron.remote.app;
  const storagePath = path.join(app.getPath('userData'), 'config');
  const asyncStorage = new AsyncNodeStorage(storagePath);
  const persistConfig = {
    whitelist: ['setup'],
    storage: asyncStorage,
  };
  persistStore(store, persistConfig);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers'); // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
