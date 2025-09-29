import React, { createContext, useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";

import { login } from "../services/auth/auth.service";

import { AuthContextType } from "./types";

// Crie o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crie o provedor para envolver a aplicação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextType["user"]>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const token =
      localStorage.getItem("@ACCESS_TOKEN") ||
      sessionStorage.getItem("@ACCESS_TOKEN");

    if (token) {
      setUser(jwtDecode(token));
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const userCreated = (jwt: string) => {
    sessionStorage.setItem("@ACCESS_TOKEN", jwt);

    setUser(jwtDecode(jwt));
    setIsAuthenticated(true);
  };

  const loginHandle = async ({
    email,
    password,
    isRememberMeChecked,
  }: {
    email: string;
    password: string;
    isRememberMeChecked: boolean;
  }) => {
    setIsLoading(true);

    await login({ email, password })
      .then((res) => {
        const { access_token: accessToken } = res;

        if (isRememberMeChecked) {
          localStorage.setItem("@ACCESS_TOKEN", accessToken);
        } else {
          sessionStorage.setItem("@ACCESS_TOKEN", accessToken);
        }

        setUser(jwtDecode(accessToken));
        setIsAuthenticated(true);
      })
      .catch((error) => {
        const { message } = error.response?.data || error;

        return Promise.reject(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    // Remove o token do localStorage
    localStorage.removeItem("@ACCESS_TOKEN");
    sessionStorage.removeItem("@ACCESS_TOKEN");

    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    userCreated,
    loginHandle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
