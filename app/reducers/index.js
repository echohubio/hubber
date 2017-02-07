import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import setup from './setup';

const rootReducer = combineReducers({
  routing,
  setup,
});

export default rootReducer;
