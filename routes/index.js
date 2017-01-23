import express from 'express';
import Debug from 'debug';

import * as config from '../lib/config';

const router = express.Router();

const debug = Debug('hubber:route:index');

const configured = config.get('configured');

router.get('/', (req, res) => {
  if (configured) {
    res.render('index', { title: 'EchoHub - Hubber' });
  } else {
    const authenticated = req.session && req.session.grant && !!req.session.grant.response.access_token;
    const connected = !!config.get('iot');
    const params = {
      title: 'EchoHub - Hubber',
      authenticated,
      connected,
    };
    debug(params);
    res.render('setup', params);
  }
});

export default router;
