import React, { createContext, useState, useEffect } from "react";

import { authService } from "../services/auth/auth.service";

import { AuthContextType } from "./types";

// Crie o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crie o provedor para envolver a aplicação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("@ACCESS_TOKEN") ||
      sessionStorage.getItem("@ACCESS_TOKEN");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async ({
    email,
    password,
    isRememberMeChecked,
  }: {
    email: string;
    password: string;
    isRememberMeChecked: boolean;
  }) => {
    await authService
      .login({ email, password })
      .then((res) => {
        const { access_token: accessToken } = res;

        if (isRememberMeChecked) {
          localStorage.setItem("@ACCESS_TOKEN", accessToken);
        } else {
          sessionStorage.setItem("@ACCESS_TOKEN", accessToken);
        }

        setIsAuthenticated(true);
      })
      .catch((error) => {
        const { message } = error.response?.data || error;

        return Promise.reject(message);
      });
  };

  const logout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("@ACCESS_TOKEN");
    sessionStorage.removeItem("@ACCESS_TOKEN");

    setIsAuthenticated(false);
  };

  const value = { isAuthenticated, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
