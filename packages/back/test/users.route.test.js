import request from 'supertest';
import app from '../src/app';

import { GetTestUser } from './helpers/tweetHelper';
import { GetAuthApp } from './helpers/authHelper';
import { StartTest } from '../src/mongoose';


describe('tweets route', () => {
  StartTest();

  it('GETs /users/me', async () => {
    const authUser = GetTestUser({ name: 'User 1' });
    await authUser.save().then(async (authUserDoc) => {
      expect(authUserDoc._id).not.toBeFalsy();

      const authApp = GetAuthApp(app, authUser);
      const res = await request(authApp).get('/users/me').expect(200);
      expect(res.body._id).toBe(String(authUser._id));
    }).finally(async () => {
      await authUser.delete();
    });
  });
});
