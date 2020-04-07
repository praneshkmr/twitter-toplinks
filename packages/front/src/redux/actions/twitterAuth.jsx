import { FETCH_TWITTER_AUTH, SET_TWITTER_AUTH, SET_TWITTER_AUTH_ERROR } from './types';
import { apiAction } from './api';

function setTwitterAuthData(data) {
  return {
    type: SET_TWITTER_AUTH,
    payload: data,
  };
}

function setTwitterAuthError(error) {
  return {
    type: SET_TWITTER_AUTH_ERROR,
    payload: error.toJSON(),
  };
}

export const fetchTwitterAuth = ({ queryParams }) => apiAction({
  url: `/auth/twitter/callback${queryParams}`,
  onSuccess: setTwitterAuthData,
  onFailure: setTwitterAuthError,
  label: FETCH_TWITTER_AUTH,
});
