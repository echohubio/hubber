import electron from 'electron'; // eslint-disable-line import/no-extraneous-dependencies
import { push } from 'react-router-redux';

export const finalise = iot => dispatch => (
  Promise.all([
    dispatch({
      type: 'SETUP_SET_FINALISED',
    }),

    dispatch({
      type: 'PLUGINS_INITIALISE',
      plugins: [
        {
          packagePath: 'hubber-iot',
          ...iot,
        },
        'hubber-plugins',
      ],
    }),
  ])
  .then(() => {
    dispatch(push('/'));
  })
  .then(() => {
    electron.remote.getCurrentWindow().reload();
  })
);

export const dummy = 'foo';
