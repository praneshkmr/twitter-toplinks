import request from 'supertest';
import app from '../src/app';

import { GetTestTweet, GetTestUser, GetTestUserTweets } from './helpers/tweetHelper';
import { GetAuthApp } from './helpers/authHelper';
import { StartTest } from '../src/mongoose';

describe('tweets route', () => {
  StartTest();

  it('GETs /tweets', async () => {
    const authUser = GetTestUser({ name: 'User 1' });
    await authUser.save().then(async (authUserDoc) => {
      expect(authUserDoc._id).not.toBeFalsy();

      const tweet1 = GetTestTweet({ text: 'tweet1' });
      await tweet1.save().then(async (tweet1Doc) => {
        expect(tweet1Doc._id).not.toBeFalsy();

        const userTweets = GetTestUserTweets(authUser, tweet1);
        await userTweets.save().then(async (userTweetsDoc) => {
          expect(userTweetsDoc._id).not.toBeFalsy();

          const authApp = GetAuthApp(app, authUser);
          const res = await request(authApp).get('/tweets');
          expect(res.body.data).toHaveLength(1);
          expect(res.body.meta.count).toEqual(1);
        }).finally(async () => {
          await userTweets.delete();
        });
      }).finally(async () => {
        await tweet1.delete();
      });
    }).finally(async () => {
      await authUser.delete();
    });
  });
});
