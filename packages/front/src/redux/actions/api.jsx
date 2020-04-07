
import {
  API, API_START, API_END, ACCESS_DENIED, API_ERROR, UNAUTHORIZED,
} from './types';

export const apiStart = (label) => ({
  type: API_START,
  payload: label,
});

export const apiEnd = (label) => ({
  type: API_END,
  payload: label,
});

export const accessDenied = (url) => ({
  type: ACCESS_DENIED,
  payload: {
    url,
  },
});
export const unauthorized = (url) => ({
  type: UNAUTHORIZED,
  payload: {
    url,
  },
});

export const apiError = (error) => ({
  type: API_ERROR,
  error,
});

export const apiAction = ({
  url = '',
  method = 'GET',
  data = null,
  error = null,
  accessToken = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = '',
  headersOverride = null,
}) => ({
  type: API,
  payload: {
    url,
    method,
    data,
    error,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headersOverride,
  },
});
