import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
// import persistState from 'redux-localstorage';

import reducers from './reducers';
// import { clearNotifications } from './actions/notification';

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
    {}, // persistState(['user']),
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
  );

  store.history = syncHistoryWithStore(hashHistory, store);
  // browserHistory.listen(() => store.dispatch(clearNotifications()));

  return store;
};

export default configureStore;
