import express from 'express';
import session from 'express-session';

export const GetAuthApp = (app, user) => {
  const authApp = express();
  authApp.use(session({ secret: 'very secret', resave: false, saveUninitialized: true }));
  authApp.all('*', (req, res, next) => {
    req.session.user = user;
    next();
  });
  authApp.use(app);
  return authApp;
};
