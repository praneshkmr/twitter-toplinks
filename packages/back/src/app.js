import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';
import cors from 'cors';

import usersRoutes from './routes/users';
import twitterRoutes from './routes/twitter';
import tweetsRoute from './routes/tweets';
import { SearchTweets } from './external/twitter';
import { GetTweetsStats } from './services/tweets_service';
import { GetUserTweets } from './models/userTweets';
import { RequireUser } from './utils/auth';
import Config from './config';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'very secret', resave: false, saveUninitialized: true }));
const corsOptions = {
  origin: Config.FRONTEND_URL,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/auth/twitter', twitterRoutes);
app.use('/tweets', tweetsRoute);
app.use('/users', usersRoutes);

app.get('/process', RequireUser(), (req, res) => {
  const { user } = req.session;
  Store7DaysTweets(user).then((tweets) => {
    res.send(tweets);
  }).catch(((error) => {
    res.status(500).send(error.message);
  }));
});

app.get('/stats', (req, res) => {
  GetTweetsStats().then((results) => {
    res.send(results);
  }).catch(((error) => {
    res.status(500).send(error.message);
  }));
});

app.get('/tweets', RequireUser(), (req, res) => {
  const { user } = req.session;
  GetUserTweets(user).then((userTweets) => {
    res.send(userTweets);
  }).catch(((error) => {
    res.status(500).send(error.message);
  }));
});

app.get('/tweets/search', RequireUser(), (req, res) => {
  const { user } = req.session;
  const { oauth } = user;
  const { twitter } = oauth;
  const { oauthAccessToken, oauthAccessTokenSecret } = twitter;
  const options = req.query;
  SearchTweets(oauthAccessToken, oauthAccessTokenSecret, options).then((tweets) => {
    res.send(tweets);
  }).catch(((error) => {
    res.status(500).send(error.message);
  }));
});

app.get('/api/foo', (req, res) => res.json({ foo: 'bar' }));

// app.get('*', (req, res) => {
//   res.redirect('/home');
// });

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
