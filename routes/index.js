import express from 'express';
import Debug from 'debug';

import * as config from '../lib/config';

const router = express.Router();

const debug = Debug('hubber:route:index');

const authenticated = session => session && session.grant && session.grant.response && !!session.grant.response.access_token;


router.get('/', (req, res) => {
  const configured = config.get('configured');

  if (configured) {
    res.render('index', { title: 'EchoHub - Hubber' });
  } else {
    const connected = !!config.get('connected');
    const params = {
      title: 'EchoHub - Hubber',
      authenticated: authenticated(req.session),
      connected,
    };
    debug(params);
    res.render('setup', params);
  }
});

router.get('/finalise', (req, res) => {
  config.set('configured', true);
  res.redirect('/');
  // TODO: Workout how to restart ourselves here
});

export default router;
