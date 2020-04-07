import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import HomePageContainer from './containers/HomePageContainer';
import TwitterAuthCallbackContainer from './containers/TwitterAuthCallbackContainer';
import TwitterDashboardPageContainer from './containers/TwitterDashboardPageContainer';

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
          <Route path="/">
            <HomePageContainer />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
