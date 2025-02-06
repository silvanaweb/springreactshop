import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { getUserRole } = useAuth();

  console.log('silvana user', getUserRole())
  if (getUserRole() === "ADMIN") {
    return children
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;