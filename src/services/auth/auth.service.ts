import { useAxios } from "../config";

import { CheckTokenResponseTypes } from "./types";

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
      "/auth/check-token", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("@ACCESS_TOKEN")}`,
        },
      }
    );

    return response.data;
  }
};

