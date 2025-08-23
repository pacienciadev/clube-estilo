// src/contexts/AuthContext.tsx
import React, { useState, useEffect } from "react";

import { authService } from "../../services/auth/auth.service";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem("@ACCESS_TOKEN");

    if (token) {
      try {
        const response = await authService.checkToken();

        setIsAuthenticated(response.valid);
      } catch (error) {
        console.error("Erro ao verificar o token:", error);

        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const login = (token: string) => {
    localStorage.setItem("@ACCESS_TOKEN", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("@ACCESS_TOKEN");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
