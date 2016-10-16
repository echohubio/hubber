import express from 'express';
const router = express.Router();

router.get('/callback', (req, res) => {
  console.error(req.session);
  console.error(req.session.grant);

  res.render('auth', { });
});

module.exports = router;
