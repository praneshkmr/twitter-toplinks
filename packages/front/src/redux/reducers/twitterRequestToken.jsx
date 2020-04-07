import {
  API_START,
  API_END,
  FETCH_TWITTER_REQUEST_TOKEN,
  SET_TWITTER_REQUEST_TOKEN,
  SET_TWITTER_REQUEST_TOKEN_ERROR,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_TWITTER_REQUEST_TOKEN:
      return { data: action.payload };
    case SET_TWITTER_REQUEST_TOKEN_ERROR:
      return { error: action.payload };
    case API_START:
      if (action.payload === FETCH_TWITTER_REQUEST_TOKEN) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      return state;

    case API_END:
      if (action.payload === FETCH_TWITTER_REQUEST_TOKEN) {
        return {
          ...state,
          isLoadingData: false,
        };
      }
      return state;

    default:
      return state;
  }
}
