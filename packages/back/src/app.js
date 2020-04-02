import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import cors from 'cors';

import './mongoose';

import twitterRoutes from './routes/twitter';
import { SearchTweets } from './external/twitter';

import { GetTweetsStats } from './services/tweets_service';
import { GetUserTweets } from './models/userTweets';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'very secret', resave: false, saveUninitialized: true }));
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

const requireUser = () => (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    req.session.redirect = req.originalUrl;
    res.redirect('/auth/twitter');
  }
};

app.use('/auth/twitter', twitterRoutes);

app.get('/home', requireUser(), (req, res) => {
  const { user } = req.session;
  res.send(user);
});

app.get('/process', requireUser(), (req, res) => {
  const { user } = req.session;
  Store7DaysTweets(user).then((tweets) => {
    res.send(tweets);
  }).catch(((error) => {
    res.status(500).send(error);
  }));
});

app.get('/stats', (req, res) => {
  GetTweetsStats().then((results) => {
    res.send(results);
  }).catch(((error) => {
    res.status(500).send(error);
  }));
});

app.get('/tweets', requireUser(), (req, res) => {
  const { user } = req.session;
  GetUserTweets(user).then((userTweets) => {
    res.send(userTweets);
  }).catch(((error) => {
    res.status(500).send(error);
  }));
});

app.get('/tweets/search', requireUser(), (req, res) => {
  const { user } = req.session;
  const { oauth } = user;
  const { twitter } = oauth;
  const { oauthAccessToken, oauthAccessTokenSecret } = twitter;
  const options = req.query;
  SearchTweets(oauthAccessToken, oauthAccessTokenSecret, options).then((tweets) => {
    res.send(tweets);
  }).catch(((error) => {
    res.status(500).send(error);
  }));
});

app.get('/api/foo', (req, res) => res.json({ foo: 'bar' }));

app.get('*', (req, res) => {
  res.redirect('/home');
});

// Check whether we are in production env
const isProd = process.env.NODE_ENV === 'production';
if (isProd) {
  // Compute the build path and index.html path
  const buildPath = path.resolve(__dirname, '../../front/build');
  const indexHtml = path.join(buildPath, 'index.html');

  // Setup build path as a static assets path
  app.use(express.static(buildPath));
  // Serve index.html on unmatched routes
  app.get('*', (req, res) => res.sendFile(indexHtml));
}

module.exports = app;
