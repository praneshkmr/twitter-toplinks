import React from 'react';
import { shape, func, string } from 'prop-types';
import { styled, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

import AppTemplate from '../../templates/AppTemplate';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    'flex-direction': 'column',
  },
  heading: {
    textAlign: 'center',
    'margin-bottom': '24px',
  },
});

const MyButton = styled(Button)({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: '0 auto',
});

const HomePage = ({ user, twitterLogin }) => {
  const classes = useStyles();
  return (
    <AppTemplate>
      <div className={classes.wrapper}>
        <Typography variant="h3" className={classes.heading}>Welcome to Twitter TopLinks</Typography>
        {!user && <MyButton onClick={twitterLogin}>Login with Twitter</MyButton>}
        {user && <div>User Present</div>}
      </div>
    </AppTemplate>
  );
};

HomePage.propTypes = {
  user: shape({ name: string }),
  twitterLogin: func.isRequired,
};

export default HomePage;
