import express from 'express';
import { HAS_URL } from '../constants/filters/tweets';
import { RequireUser } from '../utils/auth';
import Tweets from '../models/tweet';
import UserTweets from '../models/userTweets';
import { AddPagination, AddFilters } from '../utils/filters';
import { TweetHasURLFilter } from './filters/tweetsFilter';

const router = express.Router();

router.get('/', RequireUser(), (req, res) => {
  const { user } = req.session;

  UserTweets.findOne({ user }).then((userTweets) => {
    const tweetsQuery = userTweets.toJSON().tweets.map((tweet) => (tweet));
    const dbPromise = Tweets.find({ _id: { $in: tweetsQuery } });

    const validFilters = [HAS_URL];
    const filterMap = {};
    filterMap[HAS_URL] = TweetHasURLFilter;

    AddFilters(dbPromise, req, validFilters, filterMap).catch((err) => {
      res.status(400).send(err.message);
    });

    AddPagination(dbPromise, req).catch((err) => {
      res.status(500).send(err.message);
    });

    dbPromise.exec((err, tweets) => {
      if (err) {
        res.status(400).send(err.message);
      } else {
        res.send(tweets);
      }
    });
  });
});

export default router;
