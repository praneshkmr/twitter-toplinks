import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TwitterDashboardPage from '../components/pages/TwitterDashboardPage';
import { userPropType } from '../proptypes/user';

const TwitterDashboardPageContainer = ({ user }) => {
  const [isFetchingDone, setIsFetchingDone] = useState(false);
  const [tweets, setTweets] = useState(null);

  const fetchTweets = async (page) => {
    const res = await fetch(`/tweets/?page=${page}`, { credentials: 'include' });
    const json = await res.json();
    setTweets(json);
    setIsFetchingDone(true);
  };

  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchTweets(page);
  }, [page]);

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <TwitterDashboardPage
      isFetchingDone={isFetchingDone}
      tweets={tweets ? tweets.data : []}
      count={tweets ? tweets.meta?.count : 0}
      page={page}
      onPageChange={(_e, value) => setPage(value)}
    />
  );
};

TwitterDashboardPageContainer.propTypes = {
  user: userPropType,
};

export default TwitterDashboardPageContainer;
