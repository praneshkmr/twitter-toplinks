import { FETCH_STATS, SET_STATS, SET_STATS_ERROR } from './types';
import { apiAction } from './api';

function setStatsData(data) {
  return {
    type: SET_STATS,
    payload: data,
  };
}

function setStatsError(error) {
  return {
    type: SET_STATS_ERROR,
    payload: error.toJSON(),
  };
}

export const fetchStats = () => apiAction({
  url: '/stats',
  onSuccess: setStatsData,
  onFailure: setStatsError,
  label: FETCH_STATS,
});
