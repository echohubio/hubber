import { app as electronApp } from 'electron'; // eslint-disable-line i
import path from 'path';
import architect from 'architect';
import log from 'electron-log';

class Hubber {
  constructor(store) {
    log.debug('Creating Hubber');

    this.store = store;
    this.startArchitect();
  }

  static setupIoT(services) {
    const thingShadows = services.iot.thingShadows;

    thingShadows.on('message', (topic, payloadJSON) => {
      log.debug(`received message on topic ${topic}`, payloadJSON.toString());
      const pluginName = topic.split('/')[2];
      const payload = JSON.parse(payloadJSON);

      const plugin = services[pluginName];
      if (!plugin) {
        log.info(`plugin ${pluginName} not installed`);
        // TODO: log this and expose in web portal somehow or notify the user

        return;
      }

      plugin.execute(payload);
    });
  }

  architectConfig() {
    const state = this.store.getState();

    const initialPlugins = state.plugins;

    const plugins = initialPlugins.map((plugin) => {
      if (typeof plugin === 'object') {
        return { ...plugin };
      }

      return plugin;
    });

    const configPlugin = {
      setup: (options, imports, register) => {
        register(null, {
          config: {
            get: (key) => {
              const localState = this.store.getState();
              return localState[key];
            },

            addPlugin: (pluginName) => {
              this.store.dispatch({
                type: 'PLUGINS_ADD',
                name: pluginName,
              });
            },
          },
        });
      },
      provides: ['config'],
      consumes: [],
    };

    plugins.push(configPlugin);

    const basePath = path.join(electronApp.getPath('userData'), 'plugins');
    const architectConfig = architect.resolveConfig(plugins, basePath);

    return architectConfig;
  }

  startArchitect() {
    log.debug('Creating Architect');

    const config = this.architectConfig();
    const arch = architect.createApp(config, (err, app) => {
      if (err) {
        // TODO: Show some error in web app
        log.error('Could not start architect');
        log.error(err);
      }
      log.info('plugins ready');

      if (app.services.iot) {
        Hubber.setupIoT(app.services);
      }
    });

    arch.on('plugin', (plugin) => {
      log.debug(`Loaded plugin: provides: ${plugin.provides} path: ${plugin.packagePath}`);
    });
  }
}

export default Hubber;
