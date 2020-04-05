import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import TwitterDashboardPage from '../components/pages/TwitterDashboardPage';
import { userPropType } from '../proptypes/user';

const TwitterDashboardPageContainer = ({ user }) => {
  const [isFetchingDone, setIsFetchingDone] = useState(false);
  const [tweets, setTweets] = useState(null);

  const fetchTweets = async (page) => {
    const res = await fetch(`http://localhost:5000/tweets/?page=${page}`, { credentials: 'include' });
    const json = await res.json();
    setTweets(json);
    setIsFetchingDone(true);
  };

  useEffect(() => {
    fetchTweets();
  }, tweets);

  if (!user) {
    return <Redirect to="/" />;
  }
  return (
    <TwitterDashboardPage isFetchingDone={isFetchingDone} tweets={tweets} />
  );
};

TwitterDashboardPageContainer.propTypes = {
  user: userPropType,
};

export default TwitterDashboardPageContainer;
