import express from 'express';
const router = express.Router();

router.get('/callback', (req, res) => {
  console.error(req.session);
  console.error(req.session.grant);

  if (req.query.error) {
  console.log(req.query.error);
    res.render('auth_error', { error: JSON.stringify(req.query.error) });
  }
  else {
    res.render('auth', { });
  }
});

module.exports = router;
