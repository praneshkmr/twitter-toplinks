import { Router } from 'express';

const usersRoute = Router();

usersRoute.get('/me', (req, res) => {
  if (req.session.user) {
    const { user } = req.session;
    res.send(user);
  } else {
    res.sendStatus(401);
  }
});

export default usersRoute;
