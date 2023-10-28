import React, { createContext, useState } from "react";

// Create the authentication context
export const AuthContext = createContext();

// Create the authentication provider component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Function to set the authentication token
  const setAuthToken = (newToken) => {
    setToken(newToken);
  };

  // Function to clear the authentication token
  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setAuthToken, logout }}>{children}</AuthContext.Provider>
  );
};
