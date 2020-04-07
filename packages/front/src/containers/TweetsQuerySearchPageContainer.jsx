import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { shape, bool, func } from 'prop-types';
import { userPropType } from '../proptypes/user';
import { fetchSearchTweets } from '../redux/actions/searchTweets';
import { tweetsPropType } from '../proptypes/tweet';
import TweetQuerySearchPage from '../components/pages/TweetsQuerySearchPage';

const TweetsQuerySearchPageContainer = ({ currentUser, searchTweets, fetchSearchTweets }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchSearchTweets({ tag: query });
  }, [query]);

  if (!currentUser.data) {
    return <Redirect to="/" />;
  }

  const handleTextChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <TweetQuerySearchPage
      isFetchingDone={!searchTweets.isLoadingData}
      tweets={searchTweets.data ? searchTweets.data.statuses : []}
      query={query}
      onTextChange={handleTextChange}
    />
  );
};

TweetsQuerySearchPageContainer.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TweetsQuerySearchPageContainer);
