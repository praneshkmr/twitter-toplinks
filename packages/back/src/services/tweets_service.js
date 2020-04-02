import whilst from 'async/whilst';
import parallel from 'async/parallel';

import { GetHomeTimeline } from '../external/twitter';
import { GetOldestTweet, SetUserTweets } from '../models/userTweets';
import { GetTweetsContainingLink, CalculateMostSharedLinksUser } from '../models/tweet';
import { GetMostLinkSharingUser } from '../models/mostSharedLinks';

export const Store7DaysTweets = (user) => new Promise((resolve, reject) => {
  const { oauth } = user;
  const { twitter } = oauth;
  const { oauthAccessToken, oauthAccessTokenSecret } = twitter;
  const now = new Date();
  const seventhDayEpoch = now.getTime() - (7 * 24 * 60 * 60 * 1000);
  // console.log(new Date(seventhDayEpoch).toUTCString());
  let process = true;
  whilst(
    (cb) => { cb(null, process); },
    (callback) => {
      GetOldestTweet(user).then((tweet) => {
        if (tweet) {
          const { id: tweetId } = tweet;
          if (new Date(tweet.created_at).getTime() > seventhDayEpoch) {
            GetHomeTimeline(oauthAccessToken, oauthAccessTokenSecret, { sinceId: tweetId, count: 200 }).then((tweets) => {
              if (tweets.length !== 0) {
                SetUserTweets(user, tweets).then(() => {
                  const lastTweet = tweets[tweets.length - 1];
                  if (new Date(lastTweet.created_at).getTime() < seventhDayEpoch) {
                    process = false;
                  }
                  callback();
                }).catch((error) => callback(error));
              } else {
                process = false;
                callback();
              }
            }).catch((error) => callback(error));
          } else {
            process = false;
            callback();
          }
        } else {
          GetHomeTimeline(oauthAccessToken, oauthAccessTokenSecret, { count: 200 }).then((tweets) => {
            SetUserTweets(user, tweets).then(() => {
              const lastTweet = tweets[tweets.length - 1];
              if (new Date(lastTweet.created_at).getTime() < seventhDayEpoch) {
                process = false;
              }
              callback();
            }).catch((error) => callback(error));
          }).catch((error) => callback(error));
        }
      }).catch((error) => callback(error));
    },
    (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    },
  );
});

export const GetTweetsStats = () => new Promise((resolve, reject) => {
  parallel({
    tweetsContainingLinkCount: (callback) => {
      GetTweetsContainingLink().then((tweets) => {
        callback(null, tweets.length);
      }).catch((err) => callback(err));
    },
    mostLinkSharingUsers: (callback) => {
      CalculateMostSharedLinksUser().then(() => {
        GetMostLinkSharingUser().then((result) => {
          callback(null, result);
        });
      }).catch((err) => callback(err));
    },
  }, (err, results) => {
    if (err) {
      reject(err);
    } else {
      resolve(results);
    }
  });
});
