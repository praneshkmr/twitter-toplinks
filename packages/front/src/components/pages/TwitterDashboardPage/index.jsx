import React from 'react';
import { bool, arrayOf } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import AppTemplate from '../../templates/AppTemplate';
import Tweet from '../../atoms/Tweet';
import { tweetPropType } from '../../../proptypes/tweet';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    'flex-direction': 'column',
  },
  heading: {
    textAlign: 'center',
    'margin-bottom': '24px',
  },
  tweetsWrapper: {
    display: 'flex',
    'flex-direction': 'column',
    margin: '0 auto',

    '&>*': {
      'margin-bottom': '1rem',
    },
  },
});

const TwitterDashboardPage = ({ isFetchingDone, tweets }) => {
  const classes = useStyles();
  return (
    <AppTemplate>
      <div className={classes.wrapper}>
        <Typography variant="h3" className={classes.heading}>Tweets</Typography>
        {isFetchingDone && (
          <>
            {!tweets && <div>No Tweets</div>}

            {tweets && (
            <div className={classes.tweetsWrapper}>
              {tweets.map((tweet) => <Tweet tweet={tweet} />)}
            </div>
            )}
          </>
        )}
        {!isFetchingDone && <div>Loading Tweets...</div>}
      </div>
    </AppTemplate>
  );
};

TwitterDashboardPage.propTypes = {
  isFetchingDone: bool,
  tweets: arrayOf(tweetPropType),
};

export default TwitterDashboardPage;
