export type CheckTokenResponseTypes = {
  user: {
    sub: string;
    userName: string;
    iat: number;
    exp: number;
  };
  valid: boolean;
};
