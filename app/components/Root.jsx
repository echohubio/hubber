import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import Layout from './Layout';
import Home from './Home';
import Setup from './Setup';

const checkConfigured = store => (nextState, replace, callback) => {
  const configured = store.configured || false;

  if (!configured) {
    replace({ pathname: '/setup', query: { returnTo: nextState.location.pathname + nextState.location.search } });
  }

  callback();
};

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={store.history}>
      <Route path="/setup" component={Layout}>
        <IndexRoute component={Setup} />
      </Route>
      <Route path="/" component={Layout} onEnter={checkConfigured(store)}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>
);

/*
  <Route path="login" component={Login} />
*/

export default Root;
