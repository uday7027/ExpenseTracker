// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
  axios.defaults.baseURL = API_BASE;

  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // LOGIN
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.post("/auth/login", { email, password });
      const { token: t, id, name, email: e } = res.data;
      if (!t) throw new Error("No token received from server");

      setToken(t);
      localStorage.setItem("token", t);
      axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;

      const userData = { id, name, email: e };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));

      setLoading(false);
      return { success: true };
    } catch (err) {
      setLoading(false);
      const message =
        err.response?.data?.message || err.response?.data || err.message;
      setError(message);
      return { success: false, error: message };
    }
  };

  // SIGNUP
  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);

      await axios.post("/auth/signup", { name, email, password });
      const loginResult = await login(email, password); // auto-login
      setLoading(false);
      return loginResult;
    } catch (err) {
      setLoading(false);
      const message =
        err.response?.data?.message || err.response?.data || err.message;
      setError(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user, // contains { id, name, email }
        login,
        signup,
        logout,
        isAuthenticated: !!token,
        loading,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
