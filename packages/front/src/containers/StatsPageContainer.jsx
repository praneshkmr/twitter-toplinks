import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { shape, bool, func } from 'prop-types';
import StatsPage from '../components/pages/StatsPage';
import { userPropType } from '../proptypes/user';
import { fetchStats } from '../redux/actions/stats';

const StatsPageContainer = ({ currentUser, stats, fetchStats }) => {
  useEffect(() => {
    fetchStats();
  }, []);

  if (!currentUser.data) {
    return <Redirect to="/" />;
  }
  return (
    <StatsPage
      isFetchingDone={stats.data ? !stats.isLoadingData : false}
      stats={stats.data ? stats.data : {}}
    />
  );
};

StatsPageContainer.propTypes = {
  currentUser: shape({
    data: userPropType,
  }),
  stats: shape({
    data: shape({}),
    isLoadingData: bool,
  }),
  fetchStats: func.isRequired,
};

const mapStateToProps = ({ currentUser, stats }) => ({
  currentUser,
  stats,
});
const mapDispatchToProps = {
  fetchStats,
};

export default connect(mapStateToProps, mapDispatchToProps)(StatsPageContainer);
