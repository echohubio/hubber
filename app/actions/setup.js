import { push } from 'react-router-redux';

export const finalise = iot => (dispatch) => {
  console.error(iot);
  dispatch({
    type: 'SETUP_SET_FINALISED',
  });

  dispatch(push('/'));

  dispatch({
    type: 'PLUGINS_INITIALISE',
    plugins: [
      {
        packagePath: 'hubber-iot',
        ...iot,
      },
      'hubber-plugins',
    ],
  });
};

export const dummy = 'foo';
