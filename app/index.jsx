import React from 'react';
import ReactDOM from 'react-dom';

import Raven from 'raven-js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import AppProvider from './components/AppProvider';

import './index.global.css';

Raven.config('https://f5b7a160b6fd4105a9d29301e4161e47@sentry.io/135694').install();

ReactDOM.render(
  <AppProvider />,
  document.getElementById('root'),
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/AppProvider', () => {
    ReactDOM.render(
      <AppProvider />,
      document.getElementById('root'),
    );
  });
}
