import {
  FETCH_CURRENT_USER, SET_CURRENT_USER, SET_CURRENT_USER_ERROR, RESET_CURRENT_USER,
} from './types';
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

function resetCurrentUser() {
  return {
    type: RESET_CURRENT_USER,
    payload: {},
  };
}

export function logoutUser() {
  return apiAction({
    url: '/users/logout',
    onSuccess: resetCurrentUser,
    onFailure: setCurrentUserError,
    label: FETCH_CURRENT_USER,
  });
}
