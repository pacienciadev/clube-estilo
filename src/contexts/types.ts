import { UserStatusEnum } from "../enums";

import { AddressTypes } from "../types";

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: {
    sub: string;
    userName: string;
    status: UserStatusEnum;
    affiliation: string;
    updatedAt: string;
    iat: number;
    exp: number;
  };
  userCreated: (jwt: string) => void;
  addresses: AddressTypes[];
  setUser: React.Dispatch<React.SetStateAction<AuthContextType["user"]>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}
