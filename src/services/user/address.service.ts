import { useAxios } from "../config";

import { AddressTypes } from "../../types";

export const getUserAddress = async () => {
  const response = await useAxios.get<AddressTypes[]>("/user/address");

  return response.data;
};

export const createUserAddress = async (address: Omit<AddressTypes, "id">) => {
  const response = await useAxios.post<AddressTypes>("/user/address", address);

  return response.data;
};
