import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // Show spinner while checking auth
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    // Pass the attempted URL to login page for redirect after login
    return <Navigate
      to="/login"
      replace
      state={{ from: location.pathname }}
    />;
  }

  return children;
};

export default PrivateRoute;
