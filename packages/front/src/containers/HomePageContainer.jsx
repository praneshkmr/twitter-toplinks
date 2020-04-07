import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { shape, func, string } from 'prop-types';
import HomePage from '../components/pages/HomePage';
import { userPropType } from '../proptypes/user';
import { fetchTwitterRequestToken } from '../redux/actions/twitterRequestToken';

const HomePageContainer = (props) => {
  const { currentUser, twitterRequestToken, fetchTwitterRequestToken } = props;

  useEffect(() => {
    if (twitterRequestToken && twitterRequestToken.data) {
      const { oauthRequestToken } = twitterRequestToken.data;
      window.location.href = `https://twitter.com/oauth/authorize?oauth_token=${oauthRequestToken}`;
    }
  }, [twitterRequestToken.data]);

  if (currentUser.data) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <HomePage user={currentUser.data} twitterLogin={() => fetchTwitterRequestToken()} />
  );
};

HomePageContainer.propTypes = {
  currentUser: shape({
    data: userPropType,
  }),
  twitterRequestToken: shape({
    data: shape({
      oauthRequestToken: string,
    }),
  }),
  fetchTwitterRequestToken: func.isRequired,
};

const mapStateToProps = ({ currentUser, twitterRequestToken }) => ({
  currentUser,
  twitterRequestToken,
});
const mapDispatchToProps = {
  fetchTwitterRequestToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
