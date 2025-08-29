export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: {
    sub: string;
    userName: string;
    iat: number;
    exp: number;
  };
  login: (params: {
    email: string;
    password: string;
    isRememberMeChecked: boolean;
  }) => Promise<void>;
  logout: () => void;
}
