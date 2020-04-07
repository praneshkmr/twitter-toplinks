import { FETCH_TWEETS, SET_TWEETS, SET_TWEETS_ERROR } from './types';
import { apiAction } from './api';

function setTweetsData(data) {
  return {
    type: SET_TWEETS,
    payload: data,
  };
}

function setTweetsError(error) {
  return {
    type: SET_TWEETS_ERROR,
    payload: error.toJSON(),
  };
}

export const fetchTweets = ({ page }) => apiAction({
  url: `/tweets/?page=${page}`,
  onSuccess: setTweetsData,
  onFailure: setTweetsError,
  label: FETCH_TWEETS,
});
