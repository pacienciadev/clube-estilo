import { UserGenderEnum, UserStatusEnum } from "../enums";

export type AddressTypes = {
  id: string;
  description?: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  inUse: boolean;
};

export type UserTypes = {
  id: string;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  gender: UserGenderEnum;
  affiliation: string;
  status: UserStatusEnum;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};
