// src/contexts/AuthContext.tsx

import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { AuthContext };
