import User from '../../src/models/user';
import Tweet from '../../src/models/tweet';
import UserTWeets from '../../src/models/userTweets';

export const GetTestUser = ({ name }) => new User({
  name,
});

export const GetTestTweet = ({ text, entities }) => {
  const timestamp = (new Date()).getTime();
  return new Tweet({
    id: timestamp,
    id_str: `${timestamp}`,
    text,
    entities,
  });
};

export const GetTestUserTweets = (user, tweet) => new UserTWeets({
  user,
  tweets: [tweet],
});
