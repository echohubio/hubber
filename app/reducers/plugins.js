// @flow
import { PLUGINS_INITIALISE, PLUGINS_ADD } from '../actions/plugins';

import type { PluginsStateType } from '../types/state';
import type { PluginActionTypes } from '../types/actions';

const plugins = (state: PluginsStateType = [], action: PluginActionTypes) => {
  switch (action.type) {
    case PLUGINS_INITIALISE:
      return [
        ...state,
        ...action.plugins,
      ];
    case PLUGINS_ADD:
      return [
        ...state,
        action.name,
      ];
    default:
      return state;
  }
};

export default plugins;
