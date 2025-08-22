import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedAuth = localStorage.getItem("isLoggedIn");
    const savedUser = localStorage.getItem("currentUser");

    if (savedAuth === "true" && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (email, password, remember = false) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const userData = {
      email,
      name: email.split("@")[0],
      id: Date.now(),
    };

    setIsAuthenticated(true);
    setUser(userData);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(userData));

    if (remember) {
      localStorage.setItem("rememberLogin", "true");
    }

    return userData;
  };

  const register = async (fullname, email, password) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const userData = {
      email,
      name: fullname,
      id: Date.now(),
    };

    setIsAuthenticated(true);
    setUser(userData);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("currentUser", JSON.stringify(userData));

    return userData;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberLogin");
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
