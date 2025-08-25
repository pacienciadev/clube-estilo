import { useAxios } from "../config";

import { CheckTokenResponseTypes } from "./types";

const token =
  localStorage.getItem("@ACCESS_TOKEN") ||
  sessionStorage.getItem("@ACCESS_TOKEN");

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await useAxios.post<{ access_token: string }>(
      "/auth/login",
      credentials
    );

    return response.data;
  },

  checkToken: async () => {
    const response = await useAxios.get<CheckTokenResponseTypes>(
      "/auth/check-token",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  },
};
