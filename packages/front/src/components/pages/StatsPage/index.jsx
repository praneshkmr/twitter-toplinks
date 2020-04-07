import React from 'react';
import {
  bool, arrayOf, shape, string, number,
} from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import AppTemplate from '../../templates/AppTemplate';
import StatsTable from '../../molecules/StatsTable';
import { userPropType } from '../../../proptypes/user';

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

const StatsPage = ({
  user, isFetchingDone, stats,
}) => {
  const classes = useStyles();
  const { mostLinkSharingUsers } = stats;
  const headings = ['User', 'Count'];
  return (
    <AppTemplate user={user}>
      <div className={classes.wrapper}>
        <Typography variant="h3" className={classes.heading}>Stats</Typography>
        {isFetchingDone && (
          <>
            <Typography variant="h5" className={classes.heading}>Most Link Sharing Users</Typography>
            <StatsTable headings={headings} mostLinkSharingUsers={mostLinkSharingUsers} />
          </>
        )}
        {!isFetchingDone && <div>Loading Stats...</div>}
      </div>
    </AppTemplate>
  );
};

StatsPage.propTypes = {
  user: userPropType,
  isFetchingDone: bool,
  stats: shape({
    mostLinkSharingUsers: arrayOf(shape({ name: string, count: number })),
  }),
};

export default StatsPage;
