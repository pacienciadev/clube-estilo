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

  const localUserData = () =>
    localStorage.getItem("@USER_DATA") || sessionStorage.getItem("@USER_DATA");

  const localTokenData = () =>
    localStorage.getItem("@ACCESS_TOKEN") ||
    sessionStorage.getItem("@ACCESS_TOKEN");

  useEffect(() => {
    const localUser = localUserData();
    const localToken = localTokenData();

    const user = localUser ? JSON.parse(localUser) : null;

    if (!user && localToken) {
      // verifica no backend a validade do token
      checkAuth();
      return;
    }

    if (user) {
      const expirationDate = dayjs.unix(user.exp);

      const dateNow = dayjs();

      if (dateNow.isAfter(expirationDate)) {
        // verifica no backend a validade do token
        checkAuth();
      } else {
        setIsAuthenticated(true);
      }
    }

    setIsLoading(false);
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

  const logOut = () => {
    sessionStorage.clear();
    localStorage.clear();

    setIsAuthenticated(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoading, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
