import express from 'express';
import phetch from 'phetch';
import * as config from '../lib/config';

const router = express.Router();

router.get('/create', (req, res) => {
  const session = req.session.grant.response.access_token;

  phetch.post('https://www.echohub.io/api/iot/thing')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Authorization', session)
    .then(response => response.json())
    .then((iot) => {
      config.put('iot', iot);
    })
    .then(() => {
      const iot = config.get('iot');
      res.send(`\n Setup IOT \n<code>${JSON.stringify(iot, null, '  ')}</code>`);
    })
    .catch((err) => {
      res.send(`Error: ${err}`);
    });
});

router.get('/ping', (req, res) => {
  const session = req.session.grant.response.access_token;

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

export default router;
