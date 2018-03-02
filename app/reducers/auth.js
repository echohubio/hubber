// @flow
import { AUTH_SET_TOKENS } from '../actions/auth';

import type { AuthActionTypes } from '../types/actions';
import type { AuthStateType, StateType } from '../types/state';

const auth = (state: AuthStateType = null, action: AuthActionTypes) => {
  switch (action.type) {
    case AUTH_SET_TOKENS:
      return {
        ...state,
        ...action.token,
      };
    default:
      return state;
  }
};

export default auth;

export const getAccessToken = (state: StateType) => state && state.auth && state.auth.access_token;
export const getRefreshToken = (state: StateType) => state.auth && state.auth.refresh_token;
