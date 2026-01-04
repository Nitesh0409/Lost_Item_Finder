import React, { createContext, useContext, useState, useEffect } from "react";
import { isLoggedIn as checkLoggedIn } from "../utils/Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate reading token from localStorage
    const logged = checkLoggedIn();
    setIsLoggedIn(logged);
    setIsLoading(false);
  }, []);

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
