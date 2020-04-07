import {
  API_START,
  API_END,
  FETCH_SEARCH_TWEETS,
  SET_SEARCH_TWEETS,
  SET_SEARCH_TWEETS_ERROR,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_SEARCH_TWEETS:
      return { data: action.payload };
    case SET_SEARCH_TWEETS_ERROR:
      return { error: action.payload };
    case API_START:
      if (action.payload === FETCH_SEARCH_TWEETS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      return state;

    case API_END:
      if (action.payload === FETCH_SEARCH_TWEETS) {
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
