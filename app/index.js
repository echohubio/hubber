import Raven from 'raven-js';
import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';

Raven.config('https://f5b7a160b6fd4105a9d29301e4161e47@sentry.io/135694').install();

const store = configureStore();

render(
  <Root store={store} history={history} />,
  document.getElementById('root'),
);

// if (module.hot) {
//   module.hot.accept('./containers/Root', () => {
//     const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
//     render(
//     // <AppContainer>
//         <NextRoot store={store} history={history} />,
//       //   </AppContainer>,
//       document.getElementById('root'),
//     );
//   });
// }
