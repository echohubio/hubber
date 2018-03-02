// @flow
import type { PluginsType } from '../types/actions';

export const PLUGINS_INITIALISE = 'PLUGINS_INITIALISE';
export const PLUGINS_ADD = 'PLUGINS_ADD';

export function initialisePlugins(plugins: PluginsType) {
  return {
    type: PLUGINS_INITIALISE,
    plugins,
  };
}
