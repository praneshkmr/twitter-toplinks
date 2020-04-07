import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { shape, bool, func } from 'prop-types';
import TwitterDashboardPage from '../components/pages/TwitterDashboardPage';
import { userPropType } from '../proptypes/user';
import { fetchTweets } from '../redux/actions/tweets';
import { tweetsPropType } from '../proptypes/tweet';

const TwitterDashboardPageContainer = ({ currentUser, tweets, fetchTweets }) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchTweets({ page });
  }, [page]);

  if (!currentUser.data) {
    return <Redirect to="/" />;
  }
  return (
    <TwitterDashboardPage
      isFetchingDone={!tweets.isLoadingData}
      tweets={tweets.data ? tweets.data.data : []}
      count={tweets.data ? tweets.data.meta?.count : 0}
      page={page}
      onPageChange={(_e, value) => setPage(value)}
    />
  );
};

TwitterDashboardPageContainer.propTypes = {
  currentUser: shape({
    data: userPropType,
  }),
  tweets: shape({
    data: tweetsPropType,
    isLoadingData: bool,
  }),
  fetchTweets: func.isRequired,
};

const mapStateToProps = ({ currentUser, tweets }) => ({
  currentUser,
  tweets,
});
const mapDispatchToProps = {
  fetchTweets,
};

export default connect(mapStateToProps, mapDispatchToProps)(TwitterDashboardPageContainer);
