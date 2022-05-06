import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthentication } from './AuthenticationProvider';

export const RequireAuth = ({ children }) => {
  const { authData } = useAuthentication();
  const location = useLocation();

  console.log("Require Auth says hello ", authData.name)
  if (!authData.name) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children;
}
