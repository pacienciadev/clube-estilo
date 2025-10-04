import dayjs from "dayjs";

export const validateRegexEmail = (email: string) => {
  return email.match(
    /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );
};

export const validateEmail = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  if (validateRegexEmail(value) !== null) return true;

  return false;
};

export const validatePassword = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;

  if (value.length >= 6) return true;

  return false;
};

export const calculateAge = (birthDate: string): number => {
  const today = dayjs();

  const dob = dayjs(birthDate);

  if (!dob.isValid()) return 0;

  return today.diff(dob, "year");
};

export const isAdult = (birthDate: string): boolean => {
  return calculateAge(birthDate) >= 18;
};
