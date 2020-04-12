import { GetTestTweet, GetTestUser } from './helpers/tweetHelper';
import { StartTest } from '../src/mongoose';
import { CalculateTopSharedDomains } from '../src/models/tweet';
import { GetTopSharedDomains } from '../src/models/topSharedDomains';

describe('Tweets Service', () => {
  StartTest();

  it('Top Shared Domains', async () => {
    let authUser = null;
    let tweet1 = null;
    let tweet2 = null;
    let tweet3 = null;
    try {
      authUser = GetTestUser({ name: 'User 1' });
      await authUser.save();
      expect(authUser._id).not.toBeFalsy();

      tweet1 = GetTestTweet({ text: 'tweet1', entities: { urls: [{ display_url: 'abc.com/foo' }] } });
      await tweet1.save();
      expect(tweet1._id).not.toBeFalsy();

      tweet2 = GetTestTweet({ text: 'tweet2', entities: { urls: [{ display_url: 'abc.com/bar' }, { display_url: 'def.com/fry' }] } });
      await tweet2.save();
      expect(tweet2._id).not.toBeFalsy();

      tweet3 = GetTestTweet({ text: 'tweet3', entities: { urls: [{ display_url: 'abc.com/try' }] } });
      await tweet3.save();
      expect(tweet3._id).not.toBeFalsy();

      await CalculateTopSharedDomains();
      const result = await GetTopSharedDomains();

      expect(result.length).toEqual(2);
      expect(result[0].value.name).toEqual('abc.com');
      expect(result[0].value.count).toEqual(3);
      expect(result[1].value.name).toEqual('def.com');
      expect(result[1].value.count).toEqual(1);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      await tweet3.delete();
      await tweet2.delete();
      await tweet1.delete();
      await authUser.delete();
    }
  });
});
