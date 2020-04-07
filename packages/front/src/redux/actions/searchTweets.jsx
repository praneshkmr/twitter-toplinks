import { FETCH_SEARCH_TWEETS, SET_SEARCH_TWEETS, SET_SEARCH_TWEETS_ERROR } from './types';
import { apiAction } from './api';
import { GetQueryParams } from '../../utils/queryParams';

function setSearchTweetsData(data) {
  return {
    type: SET_SEARCH_TWEETS,
    payload: data,
  };
}

function setSearchTweetsError(error) {
  return {
    type: SET_SEARCH_TWEETS_ERROR,
    payload: error.toJSON(),
  };
}

export const fetchSearchTweets = (queryParams) => apiAction({
  url: `/tweets/search?${GetQueryParams(queryParams)}`,
  onSuccess: setSearchTweetsData,
  onFailure: setSearchTweetsError,
  label: FETCH_SEARCH_TWEETS,
});
