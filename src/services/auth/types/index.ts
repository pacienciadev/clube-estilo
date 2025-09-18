export type CheckTokenResponseTypes = {
  user: {
    sub: string;
    userName: string;
    iat: number;
    exp: number;
  };
  valid: boolean;
};

export type UserCredentialsTypes = {
  email: string;
  password: string;
};

export type CreateUserBodyTypes = {
  name: string;
  email: string;
  password: string;
};

export type CreateUserResponseTypes = {
  message: string;
  user: {
    id: string;
    name: string;
  };
  access_token: string;
};