import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Raven from 'raven-js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import configureStore from './configureStore';
import Root from './components/Root';

import './index.global.css';

// TODO: Should this live in the renderer?
import Hubber from './lib/hubber';

Raven.config('https://f5b7a160b6fd4105a9d29301e4161e47@sentry.io/135694').install();

const store = configureStore();

const hubber = new Hubber(store);

ReactDOM.render(
  <AppContainer>
    <Root store={store} hubber={hubber} />
  </AppContainer>,
  document.getElementById('root'),
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    ReactDOM.render(
      <AppContainer>
        <Root store={store} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
