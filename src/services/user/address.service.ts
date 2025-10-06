import { useAxios } from "../config";

import { AddressTypes } from "../../types";

export const getUserAddresses = async () => {
  const response = await useAxios.get<AddressTypes[]>("/user/address");

  return response.data;
};

export const createUserAddress = async (address: Omit<AddressTypes, "id">) => {
  const response = await useAxios.post<AddressTypes>("/user/address", address);

  return response.data;
};

export const getUserAddress = async (id: string) => {
  const response = await useAxios.get<AddressTypes>(`/user/address/${id}`);

  return response.data;
};

export const updateUserAddress = async (
  id: string,
  address: Omit<AddressTypes, "id">
) => {
  const response = await useAxios.put<AddressTypes>(
    `/user/address/${id}`,
    address
  );

  return response.data;
};

export const setDefaultAddress = async (id: string) => {
  const response = await useAxios.put<AddressTypes>(
    `/user/address/${id}/default`
  );

  return response.data;
};
