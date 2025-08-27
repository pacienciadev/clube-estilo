export interface AuthContextType {
  isAuthenticated: boolean;
  login: (params: {
    email: string;
    password: string;
    isRememberMeChecked: boolean;
  }) => Promise<void>;
  logout: () => void;
}
