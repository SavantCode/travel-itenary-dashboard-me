// src/components/ProtectedRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: Array<'ADMIN' | 'AGENT'>;
}

export const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    
    // If logged in but role is not allowed, redirect to an unauthorized page or home
    return <Navigate to="/unauthorized" />;
    
    
    
  }
  
  // If authenticated and authorized, render the child component
  return <Outlet />;
};