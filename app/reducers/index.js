import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import setup from './setup';
import auth from './auth';
import iot from './iot';
import plugins from './plugins';

const rootReducer = combineReducers({
  routing,
  setup,
  auth,
  iot,
  plugins,
});

export default rootReducer;
