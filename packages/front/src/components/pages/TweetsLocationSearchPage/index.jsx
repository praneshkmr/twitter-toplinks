import React from 'react';
import {
  bool, arrayOf, func, string,
} from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography, InputLabel, Select, MenuItem,
} from '@material-ui/core';

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
  noResultText: {
    margin: '16px auto',
  },
  searchArea: {
    display: 'flex',
    margin: '16px auto',
    minWidth: 120,
  },
  searchTextBox: {
    margin: '0 auto',
    marginBottom: '24px',
  },
});

const TweetsLocationSearchPage = ({
  isFetchingDone, tweets, location, onLocationChange,
}) => {
  const classes = useStyles();
  return (
    <AppTemplateContainer>
      <div className={classes.wrapper}>
        <Typography variant="h3" className={classes.heading}>Tweets by Location</Typography>
        <div className={classes.searchTextBox}>
          <InputLabel id="location-label">Location</InputLabel>
          <Select
            labelId="location-label"
            value={location}
            onChange={onLocationChange}
          >
            <MenuItem value="default">Select a Location</MenuItem>
            <MenuItem value="chennai">Chennai</MenuItem>
            <MenuItem value="bengaluru">Bengaluru</MenuItem>
            <MenuItem value="coimbatore">Coimbatore</MenuItem>
          </Select>
        </div>
        {isFetchingDone && (
          <>
            {tweets.length === 0
              && <div className={classes.noResultText}>Type to search tweets</div>}
            {tweets && (
              <>
                <div className={classes.tweetsWrapper}>
                  {tweets.map((tweet) => <Tweet key={tweet.id} tweet={tweet} />)}
                </div>
              </>
            )}
          </>
        )}
        {!isFetchingDone
          && <div className={classes.noResultText}>Loading Tweets...</div>}
      </div>
    </AppTemplateContainer>
  );
};

TweetsLocationSearchPage.propTypes = {
  isFetchingDone: bool,
  tweets: arrayOf(tweetPropType),
  location: string,
  onLocationChange: func.isRequired,
};

export default TweetsLocationSearchPage;
