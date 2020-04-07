import { FETCH_CURRENT_USER, SET_CURRENT_USER, SET_CURRENT_USER_ERROR } from './types';
import { apiAction } from './api';

function setCurrentUserData(data) {
  return {
    type: SET_CURRENT_USER,
    payload: data,
  };
}

function setCurrentUserError(error) {
  return {
    type: SET_CURRENT_USER_ERROR,
    payload: error.toJSON(),
  };
}

export function fetchCurrentUser() {
  return apiAction({
    url: '/users/me',
    onSuccess: setCurrentUserData,
    onFailure: setCurrentUserError,
    label: FETCH_CURRENT_USER,
  });
}
