import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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

  const login = async (email, password_hash, remember = false) => {
    try {
      const res = await axios.post("http://localhost:8080/api/login", {
        email,
        password_hash,
      });
      const userData = res.data.user; // hoặc res.data tuỳ backend trả về
      const token = res.data.token;

      setIsAuthenticated(true);
      setUser(userData);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(userData));
      localStorage.setItem("token", token);

      if (remember) {
        localStorage.setItem("rememberLogin", "true");
      }

      return userData;
    } catch (err) {
      throw new Error(
        err.response?.data?.message || "Đăng nhập thất bại, vui lòng thử lại!"
      );
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/api/register", {
        username,
        email,
        password_hash: password,
      });
      const userData = res.data.user;
      const token = res.data.token;

      setIsAuthenticated(true);
      setUser(userData);

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(userData));
      localStorage.setItem("token", token);

      return userData;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Đăng ký thất bại!");
    }
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
