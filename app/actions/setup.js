import { push } from 'react-router-redux';

export const finalise = () => (dispatch) => {
  dispatch({
    type: 'SETUP_SET_FINALISED',
  });

  dispatch(push('/'));
};

export const dummy = 'foo';
