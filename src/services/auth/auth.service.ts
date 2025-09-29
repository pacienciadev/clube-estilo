import { useAxios } from "../config";

import {
  CheckTokenResponseTypes,
  CreateUserBodyTypes,
  CreateUserResponseTypes,
  UserCredentialsTypes,
} from "./types";

export const login = async (credentials: UserCredentialsTypes) => {
  const response = await useAxios.post<{ access_token: string }>(
    "/auth/login",
    credentials
  );

  return response.data;
};

export const checkToken = async () => {
  const response = await useAxios.get<CheckTokenResponseTypes>(
    "/auth/check-token"
  );

  return response.data;
};

export const getUserList = async () => {
  const response = await useAxios.get("/users");

  return response.data;
};

export const createAccount = async (body: CreateUserBodyTypes) => {
  const response = await useAxios.post<CreateUserResponseTypes>("/users", body);

  return response.data;
};
