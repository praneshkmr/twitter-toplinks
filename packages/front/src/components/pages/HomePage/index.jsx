import React from 'react';
import { shape, func, string } from 'prop-types';
import styled from 'styled-components';

const ClickSpan = styled.span`
  font-weight: bold;
`;

const HomePage = ({ user, twitterLogin }) => (
  <>
    <div>Home Page</div>
    {!user && (
    <div>
      Click
      <ClickSpan onClick={twitterLogin}>Here</ClickSpan>
      {' '}
      to login
    </div>
    )}
    {user && <div>User Present</div>}
  </>
);

HomePage.propTypes = {
  user: shape({ name: string }),
  twitterLogin: func.isRequired,
};

export default HomePage;
