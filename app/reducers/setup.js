// @flow
import { SETUP_SET_CONNECTED, SETUP_SET_AUTHENTICATED, SETUP_SET_FINALISED } from '../actions/setup';

import type { SetupActionTypes } from '../types/actions';
import type { SetupStateType, StateType } from '../types/state';

const initialState = {
  connected: false,
  authenticated: false,
  finalised: false,
};

const setup = (state: SetupStateType = initialState, action: SetupActionTypes) => {
  switch (action.type) {
    case SETUP_SET_CONNECTED:
      return {
        ...state,
        connected: true,
      };
    case SETUP_SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SETUP_SET_FINALISED:
      return {
        ...state,
        finalised: true,
      };
    default:
      return state;
  }
};

export default setup;

export const getConnected = (state: StateType) => state.setup.connected;
export const getAuthenticated = (state: StateType) => state.setup.authenticated;
export const getFinalised = (state: StateType) => state.setup.finalised;
