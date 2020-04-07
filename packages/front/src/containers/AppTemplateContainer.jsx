import React from 'react';
import { connect } from 'react-redux';
import { shape, func, node } from 'prop-types';

import { userPropType } from '../proptypes/user';
import { logoutUser } from '../redux/actions/currentUser';
import AppTemplate from '../components/templates/AppTemplate';

const AppTemplateContainer = (props) => {
  const { currentUser, logoutUser, children } = props;
  return (
    <AppTemplate user={currentUser.data} logoutUser={logoutUser}>{children}</AppTemplate>
  );
};

AppTemplateContainer.propTypes = {
  currentUser: shape({
    data: userPropType,
  }),
  logoutUser: func.isRequired,
  children: node.isRequired,
};

const mapStateToProps = ({ currentUser }) => ({
  currentUser,
});
const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppTemplateContainer);
