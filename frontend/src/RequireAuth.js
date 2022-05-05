import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthentication } from './AuthenticationProvider';

export const RequireAuth = ({ children }) => {
  const { authData } = useAuthentication();
  const location = useLocation();

  console.log("Require Auth says hello ", authData.name)
  if (!authData.name) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
}
