import express from 'express';
import inspect from 'util-inspect';

import { GetOAuthRequestToken, GetOAuthAccessToken } from '../external/twitter';

const router = express.Router();

router.get('/', (req, res) => {
  GetOAuthRequestToken().then(({ oauthToken, oauthTokenSecret }) => {
    req.session.oauthRequestToken = oauthToken;
    req.session.oauthRequestTokenSecret = oauthTokenSecret;
    res.redirect(`https://twitter.com/oauth/authorize?oauth_token=${req.session.oauthRequestToken}`);
  }).catch((error) => {
    res.send(`Error getting OAuth request token : ${inspect(error)}`, 500);
  });
});

router.get('/callback', (req, res) => {
  if (req.session.oauthRequestToken && req.session.oauthRequestTokenSecret) {
    GetOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret,
      req.query.oauth_verifier)
      .then(({ oauthAccessToken, oauthAccessTokenSecret }) => {
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;
        res.redirect('/home');
      }).catch((error) => {
        res.send(`Error getting OAuth access token : ${inspect(error)}[${req.session.oauthAccessToken}] [${req.session.oauthAccessTokenSecret}]`, 500);
      });
  } else {
    res.redirect('/auth/twitter');
  }
});

export default router;
