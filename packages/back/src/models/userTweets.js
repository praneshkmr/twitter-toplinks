import { Schema, model } from 'mongoose';
import { UpsertTweets } from './tweet';
import { GetObjectIds } from '../utils/queryParams';

const userTweetsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  tweets: [{
    type: Schema.Types.ObjectId,
    ref: 'Tweets',
  }],
});

const UserTweets = model('userTweets', userTweetsSchema);

export const SetUserTweets = (user, tweets) => new Promise((resolve, reject) => {
  UpsertTweets(tweets).then((savedTweets) => {
    UserTweets.findOne({ user }).exec((errFind, userTweetsDoc) => {
      if (errFind) {
        reject(errFind);
      } else if (userTweetsDoc) {
        const tweetIds = GetObjectIds(savedTweets);
        userTweetsDoc.tweets.push(...tweetIds);
        userTweetsDoc.save((errSave) => {
          if (errSave) {
            reject(errSave);
          } else {
            resolve();
          }
        });
      } else {
        const tweetIds = GetObjectIds(savedTweets);
        const newUserTweet = new UserTweets({ user, tweets: tweetIds });
        UserTweets.create(newUserTweet, (errCreate) => {
          if (errCreate) {
            reject(errCreate);
          } else {
            resolve();
          }
        });
      }
    });
  }).catch((err) => reject(err));
});

export const GetOldestTweet = (user) => new Promise((resolve, reject) => {
  UserTweets.findOne({ user }).populate({ path: 'tweets', options: { sort: { created_at: -1 } }, perDocumentLimit: 1 }).exec((err, userTweetsDoc) => {
    if (err) {
      reject(err);
    } if (userTweetsDoc) {
      resolve(userTweetsDoc.tweets[0]);
    } else {
      resolve(null);
    }
  });
});

export const CreateUserTweets = (user) => {
  const userTweet = new UserTweets({ user });
  return UserTweets.create(userTweet);
};

export const GetUserTweets = (user) => new Promise((resolve, reject) => UserTweets.findOne({ user }).populate({ path: 'tweets', options: { sort: { created_at: -1 } } }).exec((err, userTweetsDoc) => {
  if (err) {
    reject(err);
  } if (userTweetsDoc) {
    resolve(userTweetsDoc.tweets);
  }
}));
