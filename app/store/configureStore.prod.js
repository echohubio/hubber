// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import type { StateType } from '../types/state';

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function configureStore(initialState?: StateType) {
  return createStore(rootReducer, initialState, enhancer);
}

export default { configureStore, history };

// syncHistoryWithStore(hashHistory, store);
// import { autoRehydrate } from 'redux-persist';
// autoRehydrate(),
