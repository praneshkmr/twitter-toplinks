import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { shape, bool, func } from 'prop-types';
import { userPropType } from '../proptypes/user';
import { fetchSearchTweets } from '../redux/actions/searchTweets';
import { tweetsPropType } from '../proptypes/tweet';
import TweetsLocationSearchPage from '../components/pages/TweetsLocationSearchPage';

const locationMap = {
  chennai: { latitude: 13.067439, longitude: 80.237617, radius: '20km' },
  bengaluru: { latitude: 12.972442, longitude: 77.580643, radius: '20km' },
  coimbatore: { latitude: 11.004556, longitude: 76.961632, radius: '20km' },
};

const TweetsLocationSearchPageContainer = ({ currentUser, searchTweets, fetchSearchTweets }) => {
  const [location, setLocation] = useState('default');

  useEffect(() => {
    const locationObj = locationMap[location];
    if (locationObj) {
      fetchSearchTweets(locationObj);
    }
  }, [location]);

  if (!currentUser.data) {
    return <Redirect to="/" />;
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <TweetsLocationSearchPage
      isFetchingDone={!searchTweets.isLoadingData}
      tweets={searchTweets.data ? searchTweets.data.statuses : []}
      location={location}
      onLocationChange={handleLocationChange}
    />
  );
};

TweetsLocationSearchPageContainer.propTypes = {
  currentUser: shape({
    data: userPropType,
  }),
  searchTweets: shape({
    data: tweetsPropType,
    isLoadingData: bool,
  }),
  fetchSearchTweets: func.isRequired,
};

const mapStateToProps = ({ currentUser, searchTweets }) => ({
  currentUser,
  searchTweets,
});
const mapDispatchToProps = {
  fetchSearchTweets,
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetsLocationSearchPageContainer);
