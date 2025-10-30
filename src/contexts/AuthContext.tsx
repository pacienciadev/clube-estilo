import React, { createContext, useState, useEffect } from "react";

import { jwtDecode } from "jwt-decode";

import { AuthContextType } from "./types";
import { getUserAddresses } from "../services/user/address.service";
import { AddressTypes } from "../types";

// Crie o contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Crie o provedor para envolver a aplicação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthContextType["user"]>();
  const [addresses, setAddresses] = useState<AddressTypes[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const storagedToken =
      localStorage.getItem("@ACCESS_TOKEN") ||
      sessionStorage.getItem("@ACCESS_TOKEN");

    if (storagedToken) {
      setUser(jwtDecode(storagedToken));
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    fetchAddress();
  }, [isAuthenticated]);

  const fetchAddress = async () => {
    try {
      const addresses = await getUserAddresses();

      setAddresses(addresses);
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  const userCreated = (jwt: string) => {
    sessionStorage.setItem("@ACCESS_TOKEN", jwt);

    setUser(jwtDecode(jwt));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();

    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    user,
    setUser,
    addresses,
    userCreated,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
