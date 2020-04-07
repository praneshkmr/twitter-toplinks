import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { shape, func, string } from 'prop-types';
import HomePage from '../components/pages/HomePage';
import { userPropType } from '../proptypes/user';
import { fetchTwitterRequestToken } from '../redux/actions/twitterRequestToken';
import { fetchCurrentUser } from '../redux/actions/currentUser';

const HomePageContainer = (props) => {
  const {
    currentUser, twitterRequestToken, twitterAuth, fetchTwitterRequestToken, fetchCurrentUser,
  } = props;

  useEffect(() => {
    if (twitterAuth && twitterAuth.data) {
      fetchCurrentUser();
    } else if (twitterRequestToken && twitterRequestToken.data) {
      const { oauthRequestToken } = twitterRequestToken.data;
      window.location.href = `https://twitter.com/oauth/authorize?oauth_token=${oauthRequestToken}`;
    }
  }, [twitterRequestToken ? twitterRequestToken.data : {}, twitterAuth ? twitterAuth.data : {}]);

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
  twitterAuth: shape({
    data: string,
  }),
  fetchCurrentUser: func.isRequired,
  fetchTwitterRequestToken: func.isRequired,
};

const mapStateToProps = ({ currentUser, twitterRequestToken, twitterAuth }) => ({
  currentUser,
  twitterRequestToken,
  twitterAuth,
});
const mapDispatchToProps = {
  fetchCurrentUser,
  fetchTwitterRequestToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageContainer);
