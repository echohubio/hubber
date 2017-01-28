import express from 'express';
import phetch from 'phetch';
import Debug from 'debug';
import * as config from '../lib/config';

const debug = Debug('hubber:route:iot');

const router = express.Router();

const setupPlugin = (iot) => {
  debug('setup plugins');
  const plugins = config.get('plugins');
  if (plugins.length !== 1) {
    debug('plugin setup error');
    debug(plugins);
    throw new Error('Semi configured system');
  }

  const newPlugins = [
    {
      packagePath: './plugins/hubber-iot',
      ...iot,
    },
    '/plugins/hubber-plugins',
  ];

  config.set('plugins', newPlugins);
  config.set('connected', true);
};

router.get('/create', (req, res) => {
  const session = req.session.grant.response.access_token;

  phetch.post('https://www.echohub.io/api/iot/thing')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', session)
    // .then(response => response.json())
    .then((response) => {
      if (response.status !== 200) {
        debug(response);
        process.exit(1);
      }
      return response.json();
    })
    .then((iot) => {
      debug('Connect OK');
      debug(iot);
      setupPlugin(iot);
    })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => {
      res.send(`Error: ${err}`);
    });
});

export default router;
