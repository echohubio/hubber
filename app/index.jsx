import React from 'react';
import ReactDOM from 'react-dom';

import Raven from 'raven-js';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import configureStore from './configureStore';
import Root from './components/Root';

import './index.global.css';

Raven.config('https://f5b7a160b6fd4105a9d29301e4161e47@sentry.io/135694').install();

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
