// src/contexts/AuthContext.tsx
import React, { useState, useEffect } from "react";

import { authService } from "../../services/auth/auth.service";
import { AuthContext } from "./AuthContext";

import dayjs from "dayjs";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("@USER_DATA") || "{}");

    const expirationDate = dayjs.unix(user.exp);

    const dateNow = dayjs();

    if (dateNow.isAfter(expirationDate)) {
      checkAuth(); // verifica no backend a validade do token
    } else {
      checkLocalToken(); // verifica o token armazenado localmente
    }
  }, []);

  const checkAuth = async () => {
    try {
      const response = await authService.checkToken();

      sessionStorage.setItem("@USER_DATA", JSON.stringify(response.user));

      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erro ao verificar o token:", error);

      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const checkLocalToken = () => {
    const user = JSON.parse(sessionStorage.getItem("@USER_DATA") || "{}");

    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
