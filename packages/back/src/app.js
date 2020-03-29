import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import path from 'path';

import twitter from './routes/twitter';
import './mongoose';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'very secret', resave: false, saveUninitialized: true }));

app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

app.use('/auth/twitter', twitter);

app.get('/home', (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
  } else {
    res.redirect('/auth/twitter');
  }
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
