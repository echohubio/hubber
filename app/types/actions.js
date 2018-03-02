// @flow

import { AUTH_SET_TOKENS } from '../actions/auth';
import { SETUP_SET_CONNECTED, SETUP_SET_AUTHENTICATED, SETUP_SET_FINALISED } from '../actions/setup';
import { IOT_SET_CERTS } from '../actions/iot';
import { PLUGINS_INITIALISE, PLUGINS_ADD } from '../actions/plugins';

export type AuthTokenType = {
  +access_token: string,
  +refresh_token: string
};

export type IotType = {
};

export type PluginObjectType = {
};

type PluginType =
  | string
  | PluginObjectType;

export type PluginsType = Array<PluginType>;

export type AuthActionTypes =
  | { +type: typeof AUTH_SET_TOKENS, +token: AuthTokenType };

// TODO: Refactor these into s set_status
export type SetupActionTypes =
  | { +type: typeof SETUP_SET_CONNECTED }
  | { +type: typeof SETUP_SET_AUTHENTICATED }
  | { +type: typeof SETUP_SET_FINALISED };

export type PluginActionTypes =
  | { +type: typeof PLUGINS_INITIALISE, +plugins: PluginsType }
  | { +type: typeof PLUGINS_ADD, +name: string };

export type IotActionTypes =
  | { +type: typeof IOT_SET_CERTS, +iot: IotType };

export type ActionType =
  | AuthActionTypes
  | IotActionTypes
  | PluginActionTypes
  | SetupActionTypes;
