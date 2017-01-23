import express from 'express';
import Debug from 'debug';

import config from '../lib/config';

const router = express.Router();

const debug = Debug('hubber:route:index');

const configured = config.get('configured');

/* GET home page. */
router.get('/', (req, res) => {
  if (configured) {
    res.render('index', { title: 'EchoHub - Hubber' });
  } else {
    const authenticated = !!req.session.grant.response.access_token;
    const params = {
      title: 'EchoHub - Hubber',
      authenticated
    };
    debug(params);
    res.render('setup', params);
  }
});

export default router;
