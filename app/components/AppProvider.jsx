import React, { Component } from 'react';
import { AppContainer } from 'react-hot-loader';
import electron from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import { AsyncNodeStorage } from 'redux-persist-node-storage';
import { persistStore } from 'redux-persist';
import path from 'path';

import configureStore from '../configureStore';
import Root from './Root';
import Hubber from '../lib/hubber';

const store = configureStore();

const app = electron.app || electron.remote.app;
const storagePath = path.join(app.getPath('userData'), 'config');
const asyncStorage = new AsyncNodeStorage(storagePath);
const persistConfig = {
  whitelist: [
    'auth',
    'iot',
    'plugins',
    'setup',
  ],
  storage: asyncStorage,
};

const hubber = new Hubber(store);

class AppProvider extends Component {

  constructor() {
    super();
    this.state = { rehydrated: false };
  }

  componentWillMount() {
    persistStore(store, persistConfig, () => {
      this.setState({ rehydrated: true });
    });
  }

  render() {
    if (!this.state.rehydrated) {
      return <div />;
    }
    return (
      <AppContainer>
        <Root store={store} hubber={hubber} />
      </AppContainer>
    );
  }
}

export default AppProvider;
