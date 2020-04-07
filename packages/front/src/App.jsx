import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import HomePageContainer from './containers/HomePageContainer';
import TwitterAuthCallbackContainer from './containers/TwitterAuthCallbackContainer';
import TwitterDashboardPageContainer from './containers/TwitterDashboardPageContainer';
import StatsPageContainer from './containers/StatsPageContainer';
import TweetsLocationSearchPageContainer from './containers/TweetsLocationSearchPageContainer';
import TweetsQuerySearchPageContainer from './containers/TweetsQuerySearchPageContainer';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/twitter/callback" exact>
            <TwitterAuthCallbackContainer />
          </Route>
          <Route path="/dashboard" exact>
            <TwitterDashboardPageContainer />
          </Route>
          <Route path="/stats" exact>
            <StatsPageContainer />
          </Route>
          <Route path="/hashtag-search" exact>
            <TweetsQuerySearchPageContainer />
          </Route>
          <Route path="/location-search" exact>
            <TweetsLocationSearchPageContainer />
          </Route>
          <Route path="/">
            <HomePageContainer />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
