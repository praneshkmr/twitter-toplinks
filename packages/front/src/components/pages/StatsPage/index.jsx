import React from 'react';
import {
  bool, arrayOf, shape, string, number,
} from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';

import StatsTable from '../../molecules/StatsTable';
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
  mostSharedLinksUsersWrapper: {
    marginBottom: '24px',
  },
  linkTweetsCountPaper: {
    textAlign: 'center',
    padding: '24px',
  },
});

const StatsPage = ({
  isFetchingDone, stats,
}) => {
  const classes = useStyles();
  const { mostLinkSharingUsers, totalTweets, tweetsContainingLinkCount } = stats;
  const headings = ['User', 'Count'];
  return (
    <AppTemplateContainer>
      <div className={classes.wrapper}>
        <Typography variant="h3" className={classes.heading}>Stats</Typography>
        {isFetchingDone && (
          <>
            <div className={classes.mostSharedLinksUsersWrapper}>
              <Typography variant="h5" className={classes.heading}>Most Link Sharing Users</Typography>
              <StatsTable headings={headings} mostLinkSharingUsers={mostLinkSharingUsers} />
            </div>
            <Paper className={classes.linkTweetsCountPaper}>
              <Typography variant="h5">
                Out of
                {' '}
                {totalTweets}
                {' '}
                tweets,
                {' '}
                {tweetsContainingLinkCount}
                {' '}
                tweets contain Links
              </Typography>
            </Paper>
          </>
        )}
        {!isFetchingDone && <div>Loading Stats...</div>}
      </div>
    </AppTemplateContainer>
  );
};

StatsPage.propTypes = {
  isFetchingDone: bool,
  stats: shape({
    mostLinkSharingUsers: arrayOf(shape({ name: string, count: number })),
    tweetsContainingLinkCount: number,
    totalTweets: number,
  }),
};

export default StatsPage;
