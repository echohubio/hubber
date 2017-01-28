import path from 'path';
import architect from 'architect';
import Debug from 'debug';

import * as config from './config';

const debug = Debug('hubber:plugins');

const setupIoT = (services) => {
  const thingShadows = services.iot.thingShadows;

  thingShadows.on('message', (topic, payloadJSON) => {
    debug(`received message on topic ${topic}`, payloadJSON.toString());
    const pluginName = topic.split('/')[2];
    const payload = JSON.parse(payloadJSON);

    const plugin = services[pluginName];
    if (!plugin) {
      debug(`plugin ${pluginName} not installed`);
      // TODO: log this and expose in web portal somehow or notify the user

      return;
    }

    plugin.execute(payload);
  });
};

const pluginConfig = config.get('plugins');
const pluginsCopy = pluginConfig.map((plugin) => {
  if (typeof plugin === 'object') {
    return { ...plugin };
  }

  return plugin;
});

const configPlugin = {
  setup: (options, imports, register) => {
    register(null, {
      config,
    });
  },
  provides: ['config'],
  consumes: [],
};

pluginsCopy.push(configPlugin);

const basePath = path.join(__dirname, '..');
const architectConfig = architect.resolveConfig(pluginsCopy, basePath);

architect.createApp(architectConfig, (err, app) => {
  if (err) {
    // TODO: Show some error in web app
    debug(err);
    throw err;
  }
  debug('plugins ready');

  if (app.services.iot) {
    setupIoT(app.services);
  }

  if (app.services.plugins) {
    app.services.plugins.setArchitect(app, basePath);
  }
});
