import { useAxios } from "../config";

import {
  CheckTokenResponseTypes,
  CreateUserBodyTypes,
  CreateUserResponseTypes,
  UserCredentialsTypes,
} from "./types";

export const authService = {
  login: async (credentials: UserCredentialsTypes) => {
    const response = await useAxios.post<{ access_token: string }>(
      "/auth/login",
      credentials
    );

    return response.data;
  },

  checkToken: async () => {
    const response = await useAxios.get<CheckTokenResponseTypes>(
      "/auth/check-token"
    );

    return response.data;
  },

  createAccount: async (body: CreateUserBodyTypes) => {
    const response = await useAxios.post<CreateUserResponseTypes>(
      "/users",
      body
    );

    return response.data;
  },
};
