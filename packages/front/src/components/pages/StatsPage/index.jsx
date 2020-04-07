import React from 'react';
import {
  bool, arrayOf, shape, string,
} from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import AppTemplate from '../../templates/AppTemplate';
import StatsTable from '../../molecules/StatsTable';

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
  isFetchingDone, stats,
}) => {
  const classes = useStyles();
  const { mostLinkSharingUsers } = stats;
  const headings = ['User', 'Count'];
  return (
    <AppTemplate>
      <div className={classes.wrapper}>
        <Typography variant="h3" className={classes.heading}>Stats</Typography>
        {isFetchingDone && (
          <>
            <StatsTable headings={headings} mostLinkSharingUsers={mostLinkSharingUsers} />
          </>
        )}
        {!isFetchingDone && <div>Loading Stats...</div>}
      </div>
    </AppTemplate>
  );
};

StatsPage.propTypes = {
  isFetchingDone: bool,
  stats: shape({
    mostLinkSharingUsers: arrayOf(string),
  }),
};

export default StatsPage;
