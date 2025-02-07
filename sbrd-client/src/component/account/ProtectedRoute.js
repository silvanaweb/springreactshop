import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  console.log('silvana user', isAdmin())
  if (isAdmin()) {
    return children
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;