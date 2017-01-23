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
const basePath = path.join(__dirname, '..');
const architectConfig = architect.resolveConfig(pluginConfig, basePath);

architect.createApp(architectConfig, (err, app) => {
  if (err) {
    // TODO: Show some error in web app
    throw err;
  }
  debug('plugins ready');

  if (app.services.iot) {
    setupIoT(app.services);
  }
});
