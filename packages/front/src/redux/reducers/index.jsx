import { combineReducers } from 'redux';

import currentUserReducer from './currentUser';
import twitterRequestTokenReducer from './twitterRequestToken';
import twitterAuthReducer from './twitterAuth';
import tweetsReducer from './tweets';

export default combineReducers({
  currentUser: currentUserReducer,
  twitterRequestToken: twitterRequestTokenReducer,
  twitterAuth: twitterAuthReducer,
  tweets: tweetsReducer,
});
