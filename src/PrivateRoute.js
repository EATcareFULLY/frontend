import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from './services/AuthService';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateRoute;
