import path from 'path';
import fs from 'fs';
import Debug from 'debug';
import architect from 'architect';

const debug = Debug('hubber:plugins');

let configPath = path.join(__dirname, 'config.js');
if (!fs.existsSync(configPath)) {
  // Fall back to setup config
  configPath = path.join(__dirname, 'config-safe.js');
}

const config = architect.loadConfig(configPath);

architect.createApp(config, (err, app) => {
  if (err) {
    // TODO: Show some error in web app
    throw err;
  }
  debug('plugins ready');

  const thingShadows = app.services.iot.thingShadows;
  thingShadows.on('message', (topic, payloadJSON) => {
    debug(`received message on topic ${topic}`, payloadJSON.toString());
    const pluginName = topic.split('/')[2];
    const payload = JSON.parse(payloadJSON);

    const plugin = app.services[pluginName];
    if (!plugin) {
      debug(`plugin ${pluginName} not installed`);
      // TODO: log this and expose in web portal somehow or notify the user

      return;
    }

    plugin.execute(payload);
  });
});
