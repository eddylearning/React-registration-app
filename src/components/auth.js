import React, { createContext, useState } from "react";
import axios from "axios";
//used with react v5
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link, useNavigate } from "react-router-dom";// correct  import for react router v6


// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password, onSuccess) => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.accessToken;
      if (typeof token === "string") {
        setIsAuthenticated(true);
        sessionStorage.setItem("accessToken", token); // Save token
        onSuccess(); // Call success callback, like navigation
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed: An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = (navigate) => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("accessToken");
    navigate.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};