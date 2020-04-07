import React from 'react';
import {
  bool, arrayOf, number, func,
} from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

import Tweet from '../../atoms/Tweet';
import { tweetPropType } from '../../../proptypes/tweet';
import AppTemplateContainer from '../../../containers/AppTemplateContainer';

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
    'margin-bottom': '1rem',

    '&>*': {
      'margin-bottom': '1rem',
    },
  },
  pagination: {
    margin: '0 auto',
  },
});

const TwitterDashboardPage = ({
  isFetchingDone, tweets, count, page, onPageChange,
}) => {
  const classes = useStyles();
  return (
    <AppTemplateContainer>
      <div className={classes.wrapper}>
        <Typography variant="h3" className={classes.heading}>Tweets</Typography>
        {isFetchingDone && (
          <>
            {tweets.length === 0 && <div>No Tweets</div>}

            {tweets && (
              <>
                <div className={classes.tweetsWrapper}>
                  {tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
                </div>
                <Pagination
                  className={classes.pagination}
                  count={Math.floor(count / 10)}
                  defaultPage={page}
                  onChange={onPageChange}
                />
              </>
            )}
          </>
        )}
        {!isFetchingDone && <div>Loading Tweets...</div>}
      </div>
    </AppTemplateContainer>
  );
};

TwitterDashboardPage.propTypes = {
  isFetchingDone: bool,
  tweets: arrayOf(tweetPropType),
  count: number,
  page: number,
  onPageChange: func,
};

export default TwitterDashboardPage;
