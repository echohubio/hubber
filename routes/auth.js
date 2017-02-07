import Debug from 'debug';

const debug = Debug('hubber:route:auth');

const router = null;

router.get('/callback', (req, res) => {
  if (req.query.error) {
    debug('Auth Error: ', req.query.error);
    res.render('auth_error', { error: JSON.stringify(req.query.error) });
  } else {
    // In case we ever want to do something with the response
    // res.end(JSON.stringify(req.session.grant.response, null, 2));
    debug('Auth OK');
    res.redirect('/');
  }
});

export default router;
