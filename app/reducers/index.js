// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

// import setup from './setup';
// import auth from './auth';
// import iot from './iot';
// import plugins from './plugins';

const rootReducer = combineReducers({
  //  setup,
  //auth,
  //iot,
  //plugins,
  router,
});

export default rootReducer;
