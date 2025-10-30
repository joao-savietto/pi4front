import React from 'react';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RedirectIfAuthenticated: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authContext = useContext(AuthContext);
  
  // If user is authenticated, redirect to home page
  if (authContext?.user) {
    return <Navigate to="/" replace />;
  }
  
  // Otherwise, render the children (login page)
  return <>{children}</>;
};

export default RedirectIfAuthenticated;
