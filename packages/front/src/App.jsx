import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePageContainer from './containers/HomePageContainer';
import TwitterAuthCallbackContainer from './containers/TwitterAuthCallbackContainer';
import TwitterDashboardPageContainer from './containers/TwitterDashboardPageContainer';

function App() {
  const [user, setUser] = useState(null);
  const [, setError] = useState(null);
  useEffect(() => {
    fetch('/users/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/twitter/callback" exact>
          <TwitterAuthCallbackContainer setUser={setUser} setError={setError} />
        </Route>
        <Route path="/dashboard" exact>
          <TwitterDashboardPageContainer user={user} />
        </Route>
        <Route path="/">
          <HomePageContainer user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
