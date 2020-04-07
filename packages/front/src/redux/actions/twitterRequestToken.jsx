import { FETCH_TWITTER_REQUEST_TOKEN, SET_TWITTER_REQUEST_TOKEN, SET_TWITTER_REQUEST_TOKEN_ERROR } from './types';
import { apiAction } from './api';

function setTwitterRequestTokenData(data) {
  return {
    type: SET_TWITTER_REQUEST_TOKEN,
    payload: data,
  };
}

function setTwitterRequestTokenError(error) {
  return {
    type: SET_TWITTER_REQUEST_TOKEN_ERROR,
    payload: error.toJSON(),
  };
}

export const fetchTwitterRequestToken = () => apiAction({
  url: '/auth/twitter/',
  onSuccess: setTwitterRequestTokenData,
  onFailure: setTwitterRequestTokenError,
  label: FETCH_TWITTER_REQUEST_TOKEN,
});
