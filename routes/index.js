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
    const authenticated = !!req.session.grant.response.access_token;
    const params = {
      title: 'EchoHub - Hubber',
      authenticated,
    };
    debug(params);
    res.render('setup', params);
  }
});

export default router;
