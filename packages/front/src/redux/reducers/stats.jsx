import {
  API_START,
  API_END,
  FETCH_STATS,
  SET_STATS,
  SET_STATS_ERROR,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_STATS:
      return { data: action.payload };
    case SET_STATS_ERROR:
      return { error: action.payload };
    case API_START:
      if (action.payload === FETCH_STATS) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      return state;

    case API_END:
      if (action.payload === FETCH_STATS) {
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
