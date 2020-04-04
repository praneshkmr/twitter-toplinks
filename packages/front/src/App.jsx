import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePageContainer from './containers/HomePageContainer';
import TwitterAuthCallbackContainer from './containers/TwitterAuthCallbackContainer';

function App() {
  const [user, setUser] = useState(null);
  const [, setError] = useState(null);
  useEffect(() => {
    fetch('http://localhost:5000/user/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <Router>
      <Switch>
        <Route path="/auth/twitter/callback" exact>
          <TwitterAuthCallbackContainer setUser={setUser} setError={setError} />
        </Route>
        <Route path="/">
          <HomePageContainer user={user} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
