import path from 'path';
import fs from 'fs';
import Debug from 'debug';
import architect from 'architect';

const debug = Debug('hubber:plugins');

let configPath = path.join(__dirname, '..', 'config.js');
if (!fs.existsSync(configPath)) {
  debug('Starting in safe mode');
  configPath = path.join(__dirname, '..', 'config-safe.js');
}

const config = architect.loadConfig(configPath);

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

architect.createApp(config, (err, app) => {
  if (err) {
    // TODO: Show some error in web app
    throw err;
  }
  debug('plugins ready');

  if (app.services.iot) {
    setupIoT(app.services);
  }
});
