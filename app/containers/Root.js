// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';

type Props = {
  store: {},
  history: {}
};

class Root extends Component<Props> { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default hot(module)(Root);
