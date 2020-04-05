import React, { useEffect } from 'react';
import { func } from 'prop-types';
import { useLocation, useHistory } from 'react-router-dom';

const TwitterAuthCallbackContainer = ({ setUser, setError }) => {
  const queryParams = useLocation().search;
  const history = useHistory();
  useEffect(() => {
    fetch(`http://localhost:5000/auth/twitter/callback${queryParams}`, { credentials: 'include' }).then(() => fetch('http://localhost:5000/users/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .then(() => { history.push('/'); }));
  }, []);
  return (
    <div>Loading...</div>
  );
};

TwitterAuthCallbackContainer.propTypes = {
  setUser: func.isRequired,
  setError: func.isRequired,
};

export default TwitterAuthCallbackContainer;
