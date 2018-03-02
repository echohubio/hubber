// @flow
import { IOT_SET_CERTS } from '../actions/iot';

import type { IotStateType, StateType } from '../types/state';
import type { IotActionTypes } from '../types/actions';

const iot = (state: IotStateType = { }, action: IotActionTypes) => {
  switch (action.type) {
    case IOT_SET_CERTS:
      return {
        ...state,
        ...action.iot,
      };
    default:
      return state;
  }
};

export default iot;

export const getIoT = (state: StateType) => state.iot;
