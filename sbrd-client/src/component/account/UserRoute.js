import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const UserRoute = ({ children }) => {
  const { isAutenticated } = useAuth();

  if (isAutenticated) {
    return children
  } else {
    return <Navigate to="/login" />;
  }
};

export default UserRoute;