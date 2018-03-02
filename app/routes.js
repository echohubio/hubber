/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
// import SetupPage from './containers/SetupPage';

export default () => (
  <App>
    <Switch>
      <Route path="/setup" component={HomePage /* SetupPage */} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);

// TODO: onEnter={checkConfigured(store)}>
// import { getFinalised } from '../reducers/setup';

// const checkConfigured = store => (nextState, replace, callback) => {
//   const state = store.getState();
//   const finalised = getFinalised(state);

//   if (!finalised) {
//     replace({ pathname: '/setup', query: { returnTo: nextState.location.pathname + nextState.location.search } });
//   }

//   callback();
// };
