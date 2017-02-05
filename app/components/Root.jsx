import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';

import Layout from './Layout';
import Home from './Home';
// import Login from './Login';
// import AlexaLink from './AlexaLink';
// import Ping from './Ping';
// import Logout from './Logout';
// import Registration from './Registration';
// import RegistrationValidation from './RegistrationValidation';
// import PluginList from './PluginList';
// import * as cognito from '../lib/cognito';

// const checkAuth = store => async (nextState, replace, callback) => {
//   const loggedIn = await cognito.isValidSession();

//   if (!loggedIn) {
//     store.dispatch({ type: 'USER_SESSION_EXPIRED' });
//     replace({ pathname: '/login', query: { returnTo: nextState.location.pathname + nextState.location.search } });
//   }

//   callback();
// };

const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={store.history}>
      <Route path="/" component={Layout}>
        <IndexRoute component={Home} />
      </Route>
    </Router>
  </Provider>
);
/*
            <Route path="login" component={Login} />
            <Route path="alexa/link" component={AlexaLink} onEnter={checkAuth(store)} />
            <Route path="debug">
              <Route path="ping" component={Ping} onEnter={checkAuth(store)} />
            </Route>
            <Route path="logout" component={Logout} onEnter={checkAuth(store)} />
            <Route path="register" component={Registration}>
              <Route path="validate" component={RegistrationValidation} />
            </Route>
            <Route path="plugins" component={PluginList} />
*/

export default Root;
