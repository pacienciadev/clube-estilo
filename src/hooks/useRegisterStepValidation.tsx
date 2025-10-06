import { useEffect, useState } from "react";

export const useRegisterStepValidation = () => {
  const [isValidName, setIsValidName] = useState<boolean>();
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [isValidPassword, setIsValidPassword] = useState<boolean>();
  const [isValidConfirmPassword, setIsValidConfirmPassword] =
    useState<boolean>();
  const [isValidCPF, setIsValidCPF] = useState<boolean>();
  const [isValidPhone, setIsValidPhone] = useState<boolean>();
  const [isValidBirthDate, setIsValidBirthDate] = useState<boolean>();
  const [isValidGender, setIsValidGender] = useState<boolean>();

  const [isNextStepDisabled, setIsNextStepDisabled] = useState(true);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (
      isValidName &&
      isValidEmail &&
      isValidPassword &&
      isValidConfirmPassword
    ) {
      setIsNextStepDisabled(false);
    } else {
      setIsNextStepDisabled(true);
    }

    if (isValidCPF && isValidPhone && isValidBirthDate && isValidGender) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [
    isValidName,
    isValidEmail,
    isValidPassword,
    isValidConfirmPassword,
    isValidCPF,
    isValidPhone,
    isValidBirthDate,
    isValidGender,
  ]);

  return {
    isValidName,
    setIsValidName,
    isValidEmail,
    setIsValidEmail,
    isValidPassword,
    setIsValidPassword,
    isValidConfirmPassword,
    setIsValidConfirmPassword,
    isValidCPF,
    setIsValidCPF,
    isValidPhone,
    setIsValidPhone,
    isValidBirthDate,
    setIsValidBirthDate,
    isValidGender,
    setIsValidGender,
    isNextStepDisabled,
    isSaveDisabled,
  };
};
