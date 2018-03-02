// @flow
import electron from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import { push } from 'react-router-redux';

import { initialisePlugins } from '../actions/plugins';

import type { IotType, ActionType } from '../types/actions';
import type { Dispatch } from '../types/state';

export const SETUP_SET_FINALISED = 'SETUP_SET_FINALISED';
export const SETUP_SET_AUTHENTICATED = 'SETUP_SET_AUTHENTICATED';
export const SETUP_SET_CONNECTED = 'SETUP_SET_CONNECTED';

export function setAuthenticated(): ActionType {
  return {
    type: SETUP_SET_AUTHENTICATED,
  };
}

export function setConnected(): ActionType {
  return {
    type: SETUP_SET_CONNECTED,
  };
}

export function setFinalised(): ActionType {
  return {
    type: SETUP_SET_FINALISED,
  };
}

export const finalise = (iot: IotType) => (dispatch: Dispatch): any => { // eslint-disable-line flowtype/no-weak-types
  const plugins = [
    {
      packagePath: 'hubber-iot',
      ...iot,
    },
    'hubber-plugins',
  ];

  return Promise.all([
    dispatch(setFinalised()),
    dispatch(initialisePlugins(plugins)),
  ])
    .then(() => dispatch(push('/')))
    .then(() => electron.remote.getCurrentWindow().reload());
};
