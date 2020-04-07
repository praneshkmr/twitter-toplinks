import { combineReducers } from 'redux';

import currentUserReducer from './currentUser';
import twitterRequestTokenReducer from './twitterRequestToken';
import twitterAuthReducer from './twitterAuth';
import tweetsReducer from './tweets';
import statsReducer from './stats';
import searchTweetsReducer from './searchTweets';

export default combineReducers({
  currentUser: currentUserReducer,
  twitterRequestToken: twitterRequestTokenReducer,
  twitterAuth: twitterAuthReducer,
  tweets: tweetsReducer,
  stats: statsReducer,
  searchTweets: searchTweetsReducer,
});
