import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import HomePage from '../components/pages/HomePage';

class HomePageContainer extends Component {
  async twitterLogin() {
    const res = await fetch('http://localhost:5000/auth/twitter/');
    const json = await res.json();
    const { oauthRequestToken } = json;
    window.location.href = `https://twitter.com/oauth/authorize?oauth_token=${oauthRequestToken}`;
  }

  render() {
    const { user } = this.props;
    return (
      <HomePage user={user} twitterLogin={() => this.twitterLogin()} />
    );
  }
}

HomePageContainer.propTypes = {
  user: shape({ name: string }),
};

export default HomePageContainer;
