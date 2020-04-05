import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { func } from 'prop-types';
import { tweetPropType } from '../../../proptypes/tweet';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    'flex-direction': 'column',
    width: '566px',
    'box-shadow': '0 2px 4px 0 rgba(0, 0, 0, 0.5)',

    '&:hover': {
      'background-color': '#f3f3f3',
      border: '#ffffff',
    },

  },
  innerBody: {
    display: 'flex',
    'flex-direction': 'row',
  },
  body: {
    display: 'flex',
    'flex-direction': 'column',
  },
  picture: {
    'margin-left': '24px',
    'margin-top': '17px',
    'border-radius': '50%',
    width: '48px',
    height: '48px',
  },
  name: {
    display: 'flex',
    'flex-direction': 'row',
    'margin-left': '15px',
    'margin-top': '19px',
    'min-width': '85px',
    height: '17px',
    'font-family': 'HelveticaNeue',
    'font-size': '14px',
    'font-weight': 500,
    'font-style': 'normal',
    'font-stretch': 'normal',
    'line-height': 'normal',
    'letter-spacing': '-0.6px',
  },
  handle: {
    'margin-left': '10px',
    'margin-top': '19px',
    'min-width': '128px',
    height: '16px',
    'font-family': 'HelveticaNeue',
    'font-size': '14px',
    'font-weight': 'normal',
    'font-style': 'normal',
    'font-stretch': 'normal',
    'line-height': 'normal',
    'letter-spacing': '-0.6px',
    color: '#75797d',
  },
  tweet: {
    'margin-left': '15px',
    'margin-top': '7px',
    width: '445px',
    height: '88px',
    'font-family': 'HelveticaNeue',
    'font-size': '14px',
    'font-weight': 300,
    'font-style': 'normal',
    'font-stretch': 'normal',
    'line-height': 'normal',
    'letter-spacing': '-0.6px',
  },
});

const Tweet = ({ tweet, onClick }) => {
  const { text, user } = tweet;
  const { name, profile_image_url: profileImageUrl, screen_name: handle } = user;
  const classes = useStyles();
  return (
    <div className={classes.wrapper} onClick={onClick}>
      <div className={classes.innerBody}>
        <img src={profileImageUrl} alt="Logo" className={classes.picture} />
        <div className={classes.body}>
          <div className={classes.innerBody}>
            <div className={classes.name}>{name}</div>
            <div className={classes.handle}>{`@${handle}`}</div>
          </div>
          <div className={classes.tweet}>{text}</div>
        </div>
      </div>
    </div>
  );
};

Tweet.propTypes = {
  tweet: tweetPropType,
  onClick: func,
};

export default Tweet;
