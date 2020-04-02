import express from 'express';
import inspect from 'util-inspect';

import { GetOAuthRequestToken, GetOAuthAccessToken, VerifyCredentials } from '../external/twitter';
import { UpsertUserFromTwitter } from '../models/user';

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
    GetOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier)
      .then(({ oauthAccessToken, oauthAccessTokenSecret }) => {
        VerifyCredentials(oauthAccessToken, oauthAccessTokenSecret).then((data) => {
          UpsertUserFromTwitter(data, oauthAccessToken, oauthAccessTokenSecret).then((user) => {
            req.session.user = user;
            if (req.session.redirect) {
              const { redirect } = req.session;
              req.session.redirect = null;
              res.redirect(redirect);
            } else {
              res.redirect('/home');
            }
          }).catch((error) => {
            console.error(error);
            res.status(500).send('Error finding User');
          });
        });
      }).catch((error) => {
        res.send(`Error getting OAuth access token : ${inspect(error)}[${req.session.oauthAccessToken}] [${req.session.oauthAccessTokenSecret}]`, 500);
      });
  } else {
    res.redirect('/auth/twitter');
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.send(200);
});

export default router;
