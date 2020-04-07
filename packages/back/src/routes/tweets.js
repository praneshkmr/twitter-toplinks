import express from 'express';
import { HAS_URL } from '../constants/filters/tweets';
import { RequireUser } from '../utils/auth';
import Tweets from '../models/tweet';
import UserTweets from '../models/userTweets';
import { AddPagination, AddFilters } from '../utils/filters';
import { TweetHasURLFilter } from './filters/tweetsFilter';
import { SearchTweets } from '../external/twitter';

const router = express.Router();

router.get('/', RequireUser(), (req, res) => {
  const { user } = req.session;

  UserTweets.findOne({ user }).then(async (userTweets) => {
    const tweetsQuery = userTweets.toJSON().tweets.map((tweet) => (tweet));
    const dbPromise = Tweets.find({ _id: { $in: tweetsQuery } }).sort({ created_at: -1 });

    const validFilters = [HAS_URL];
    const filterMap = {};
    filterMap[HAS_URL] = TweetHasURLFilter;

    AddFilters(dbPromise, req, validFilters, filterMap).catch((err) => {
      res.status(400).send(err.message);
    });

    const countQuery = dbPromise.model.find().merge(dbPromise);

    AddPagination(dbPromise, req).catch((err) => {
      res.status(500).send(err.message);
    });

    try {
      const [tweets, count] = await Promise.all([dbPromise, countQuery.count()]);
      res.send({ data: tweets, meta: { count } });
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
});

router.get('/search', RequireUser(), (req, res) => {
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

export default router;
