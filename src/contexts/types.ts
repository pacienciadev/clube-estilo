export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: {
    sub: string;
    userName: string;
    affiliation: string;
    updatedAt: string;
    iat: number;
    exp: number;
  };
  userCreated: (jwt: string) => void;
  loginHandle: (params: {
    email: string;
    password: string;
    isRememberMeChecked: boolean;
  }) => Promise<void>;
  logout: () => void;
}
