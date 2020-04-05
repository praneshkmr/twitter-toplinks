import React from 'react';
import { Redirect } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import { userPropType } from '../proptypes/user';

const HomePageContainer = ({ user }) => {
  const twitterLogin = async () => {
    const res = await fetch('http://localhost:5000/auth/twitter/');
    const json = await res.json();
    const { oauthRequestToken } = json;
    window.location.href = `https://twitter.com/oauth/authorize?oauth_token=${oauthRequestToken}`;
  };

  if (user) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <HomePage user={user} twitterLogin={() => twitterLogin()} />
  );
};

HomePageContainer.propTypes = {
  user: userPropType,
};

export default HomePageContainer;
