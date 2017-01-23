import express from 'express';
import phetch from 'phetch';
import Debug from 'debug';
// import * as config from '../lib/config';

const debug = Debug('hubber:route:debug');

const router = express.Router();

router.get('/ping', (req, res) => {
  const session = req.session.grant.response.access_token;
  debug('sending ping');

  phetch.get('https://www.echohub.io/api/ping/custom')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', session)
    .then(response => response.json())
    .then((data) => {
      res.send(`<code>${JSON.stringify(data)}</code>`);
    })
    .catch((err) => {
      res.send(`Error: ${err}`);
    });
});
