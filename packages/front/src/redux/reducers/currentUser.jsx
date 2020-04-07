import {
  API_START,
  API_END,
  FETCH_CURRENT_USER,
  SET_CURRENT_USER,
  SET_CURRENT_USER_ERROR,
  RESET_CURRENT_USER,
} from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return { data: action.payload };
    case SET_CURRENT_USER_ERROR:
      return { error: action.payload };
    case RESET_CURRENT_USER:
      return {};
    case API_START:
      if (action.payload === FETCH_CURRENT_USER) {
        return {
          ...state,
          isLoadingData: true,
        };
      }
      return state;

    case API_END:
      if (action.payload === FETCH_CURRENT_USER) {
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
