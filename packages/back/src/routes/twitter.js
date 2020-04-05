import express from 'express';
import inspect from 'util-inspect';

import { GetOAuthRequestToken, GetOAuthAccessToken, VerifyCredentials } from '../external/twitter';
import { UpsertUserFromTwitter } from '../models/user';
import { Store7DaysTweets } from '../services/tweets_service';

const router = express.Router();

const oauthTokenStore = {};

router.get('/', (req, res) => {
  GetOAuthRequestToken().then(({ oauthToken, oauthTokenSecret }) => {
    oauthTokenStore[oauthToken] = oauthTokenSecret;
    res.send({ oauthRequestToken: oauthToken });
  }).catch((error) => {
    res.send(`Error getting OAuth request token : ${inspect(error)}`, 500);
  });
});

router.get('/callback', (req, res) => {
  if (req.query.oauth_token && req.query.oauth_verifier) {
    const oauthVerifier = req.query.oauth_verifier;
    const oauthRequestToken = req.query.oauth_token;
    const oauthRequestTokenSecret = oauthTokenStore[oauthRequestToken];
    if (!oauthRequestTokenSecret) {
      res.status(400).send('oauth_token is invalid');
      return;
    }
    oauthTokenStore[oauthRequestToken] = undefined;
    GetOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier)
      .then(({ oauthAccessToken, oauthAccessTokenSecret }) => VerifyCredentials(oauthAccessToken, oauthAccessTokenSecret).then((data) => UpsertUserFromTwitter(data, oauthAccessToken, oauthAccessTokenSecret).then((user) => {
        req.session.user = user;
        res.sendStatus(200);
        Store7DaysTweets(user);
      }).catch((error) => {
        console.error(error);
        res.status(500).send('Error finding User');
      }))).catch((error) => {
        console.error(error);
        res.status(500).send(`Error getting OAuth access token : ${inspect(error)}[${req.session.oauthAccessToken}] [${req.session.oauthAccessTokenSecret}]`);
      });
  } else {
    res.status(400).send('need both oauth_token and oauth_verifier');
  }
});

router.get('/logout', (req, res) => {
  req.session.user = null;
  res.sendStatus(200);
});

export default router;
