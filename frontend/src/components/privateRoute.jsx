// src/components/PrivateRoute.jsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../utils/Auth";
import { useToaster } from "./ui/Toaster";

const PrivateRoute = ({ children }) => {
  const toast = useToaster();
  const loggedIn = isLoggedIn();

  useEffect(() => {
    if (!loggedIn) {
      toast("You are not logged in. Please log in first.", "warning");
    }
  }, [loggedIn, toast]);

  return loggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
