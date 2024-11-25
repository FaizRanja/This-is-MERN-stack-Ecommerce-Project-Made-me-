import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading) {
    // You can add a loading screen or indicator here while checking authentication status
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoute;

