// @flow

// import type { Dispatch as ReduxDispatch } from 'redux';

import type { AuthTokenType, IotType, PluginsType, ActionType } from './actions';

export type AuthStateType = ?AuthTokenType;

export type IotStateType = IotType;

export type PluginsStateType = PluginsType;

export type SetupStateType = {
  +authenticated: boolean,
  +connected: boolean,
  +finalised: boolean
};

export type StateType = {
  +auth: ?AuthStateType,
  +setup: SetupStateType,
  +iot: IotStateType,
  +plugins: PluginsStateType
};

export type Dispatch = (
  action: ActionType | ThunkAction | PromiseAction | Array<ActionType> // eslint-disable-line no-use-before-define
) => void;
// StateType
export type GetState = () => StateType;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => Promise<void>;
export type PromiseAction = Promise<ActionType>;
