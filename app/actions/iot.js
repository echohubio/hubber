import phetch from 'phetch';
import log from 'electron-log';

import { getAccessToken } from '../reducers/auth';

export const setup = () => (dispatch, getState) => {
  const state = getState();
  console.error(state);
  const session = getAccessToken(state);
  console.error(session);

  phetch.post('https://www.echohub.io/api/iot/thing')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', session)
    .then((response) => {
      if (response.status !== 200) {
        log.error("Could't link IoT: ", response);
        throw new Error("Could't link IoT: ", response);
      }

      return response.json();
    })
    .then((iot) => {
      log.info('iot: setup completed');
      log.debug(iot);

      dispatch({
        type: 'SETUP_SET_CONNECTED',
      });

      dispatch({
        type: 'IOT_SET_CERTS',
        iot,
      });
    });
};

export const dummy = 'foo';
