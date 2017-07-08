import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';

import reducers from './reducers';

const configureStore = () => {
  const router = routerMiddleware(hashHistory);
  const middlewares = [thunk, router];

  if (process.env.NODE_ENV !== 'production') {
    const { logger } = require('redux-logger'); // eslint-disable-line global-require, import/no-extraneous-dependencies
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

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers'); // eslint-disable-line global-require
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
