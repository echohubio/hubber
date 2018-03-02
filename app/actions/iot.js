// @flow
import phetch from 'phetch';
import log from 'electron-log';

import { getAccessToken } from '../reducers/auth';
import { setConnected } from '../actions/setup';

import type { IotType, ActionType } from '../types/actions';
import type { Dispatch, GetState } from '../types/state';

export const IOT_SET_CERTS = 'IOT_SET_CERTS';

export function setCerts(iot: IotType): ActionType {
  return {
    type: IOT_SET_CERTS,
    iot,
  };
}

export const setup = () => (dispatch: Dispatch, getState: GetState) => {
  const state = getState();
  const session = getAccessToken(state);

  if (!process.env.REACT_APP_API_URL) {
    throw new Error('REACT_APP_API_URL is missing');
  }

  return phetch.post(`${process.env.REACT_APP_API_URL}/iot/thing`)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', session)
    .then((response) => {
      if (response.status !== 200) {
        log.error("Could't link IoT: ", response);
        throw new Error(`Could't link IoT: ${response}`);
      }

      return response.json();
    })
    .then((iot) => {
      log.info('iot: setup completed');
      log.debug(iot);

      dispatch(setConnected());
      return dispatch(setCerts(iot));
    });
};
