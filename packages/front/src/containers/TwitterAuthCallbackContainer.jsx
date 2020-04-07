import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { func, string, shape } from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

import { fetchCurrentUser } from '../redux/actions/currentUser';
import { fetchTwitterAuth } from '../redux/actions/twitterAuth';
import { userPropType } from '../proptypes/user';

const TwitterAuthCallbackContainer = (props) => {
  const queryParams = useLocation().search;
  const history = useHistory();
  const {
    fetchCurrentUser, fetchTwitterAuth, twitterAuth, currentUser,
  } = props;
  useEffect(() => {
    fetchTwitterAuth({ queryParams });
  }, [queryParams]);
  useEffect(() => {
    fetchCurrentUser();
  }, [twitterAuth ? twitterAuth.data : {}]);
  useEffect(() => {
    history.push('/');
  }, [currentUser ? currentUser.data : {}]);

  return (
    <div>Loading...</div>
  );
};

TwitterAuthCallbackContainer.propTypes = {
  currentUser: shape({
    data: userPropType,
  }),
  twitterAuth: shape({
    data: string,
  }),
  fetchCurrentUser: func.isRequired,
  fetchTwitterAuth: func.isRequired,
};

const mapStateToProps = ({ currentUser, twitterAuth }) => ({
  currentUser,
  twitterAuth,
});
const mapDispatchToProps = {
  fetchCurrentUser,
  fetchTwitterAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(TwitterAuthCallbackContainer);
