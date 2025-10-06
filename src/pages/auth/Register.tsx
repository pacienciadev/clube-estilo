import { useState } from "react";

import { useHistory } from "react-router";

import { cpf } from "cpf-cnpj-validator";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonDatetimeButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonModal,
  IonNavLink,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { InputChangeEventDetail, IonInputCustomEvent } from "@ionic/core";

import "./Register.css";

import { isAdult, validateRegexEmail } from "../../utils";

import { ToastComponent } from "../../components/Toast";
import { AuthLogoComponent } from "../../components/AuthLogo";

import { createAccount } from "../../services/auth/auth.service";

import { useAuth } from "../../contexts/useAuth";

import { LoginWithPasswordPage } from "./LoginWithPassword";
import { arrowBackOutline, arrowForwardOutline } from "ionicons/icons";
import { LoginPage } from "./Login";
import { useRegisterStepValidation } from "../../hooks/useRegisterStepValidation";

import dayjs from "dayjs";

export const RegisterPage: React.FC = () => {
  const [isToastOpened, setIsToastOpened] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"alert" | "success">("alert");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpfValue, setCpfValue] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);
  const [isCPFTouched, setIsCPFTouched] = useState(false);
  const [isPhoneTouched, setIsPhoneTouched] = useState(false);

  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState("");
  const [phoneErrorText, setPhoneErrorText] = useState("");
  const [cpfErrorText, setCpfErrorText] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [registerStep, setRegisterStep] = useState(0);

  const {
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
    setIsValidBirthDate,
    setIsValidGender,
    isNextStepDisabled,
    isSaveDisabled,
  } = useRegisterStepValidation();

  const validateName = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+\s[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;

    setIsValidName(undefined);

    if (value === "") return;

    if (nameRegex.test(value)) {
      setIsValidName(true);
      setName(value);

      return;
    }

    setIsValidName(false);
  };

  const validateEmail = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    setIsValidEmail(undefined);

    if (value === "") return;

    if (validateRegexEmail(value) !== null) {
      setIsValidEmail(true);
      setEmail(value);

      return;
    }

    setIsValidEmail(false);
  };

  const validatePassword = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    setIsValidPassword(undefined);

    if (value === "") return;

    if (value.length >= 6) {
      setPassword(value);
      setIsValidPassword(true);

      return;
    }

    setIsValidPassword(false);
  };

  const validateConfirmPassword = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    setIsValidConfirmPassword(undefined);

    if (value === "" && !isConfirmPasswordTouched) return;

    if (value === "" && isConfirmPasswordTouched)
      return setConfirmPasswordErrorText(
        "O campo de confirmação de senha não pode estar vazio"
      );

    if (value === password) {
      setIsValidConfirmPassword(true);

      return;
    }

    setConfirmPasswordErrorText("As senhas não coincidem");

    setIsValidConfirmPassword(false);
  };

  const validatePhone = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    setIsValidPhone(undefined);

    if (value === "" && !isPhoneTouched) return;

    if (value === "" && isPhoneTouched)
      return setPhoneErrorText("O campo de Telefone não pode estar vazio");

    const phoneRegex = /^\(?\d{2}\)?[\s-]?[\s9]?\d{4}-?\d{4}$/;
    if (phoneRegex.test(value)) {
      setIsValidPhone(true);
      setPhone(value);
      return;
    }
    setPhoneErrorText("O Telefone é inválido");

    setIsValidPhone(false);
  };

  const handleCpfInput = (e: IonInputCustomEvent<InputChangeEventDetail>) => {
    const getCpf = e.target.value ? String(e.target.value) : "";

    const rawCpf = getCpf.replace(/\D/g, "");

    const isValidCpf = cpf.isValid(rawCpf);

    setIsValidCPF(isValidCpf);

    if (!isValidCpf) {
      setCpfErrorText("O CPF é inválido");
    }

    if (isValidCpf) setCpfValue(rawCpf);
  };

  const { userCreated } = useAuth();
  const history = useHistory();

  const createUserHandler = async () => {
    setIsLoading(true);

    try {
      const data = await createAccount({
        name,
        email,
        password,
        cpfValue,
        phone,
        birthDate,
        gender,
      });

      userCreated(data.access_token);

      history.push("/welcome");
    } catch (err) {
      setToastType("alert");
      setToastMessage("Erro ao criar usuário.");
      setIsToastOpened(true);

      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const setBirthDateHandler = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;

    const isAdultValidator = isAdult(value);

    if (isAdultValidator) {
      setIsValidBirthDate(true);

      const formattedBirthDate = dayjs(value).format("YYYY-MM-DD");

      setBirthDate(formattedBirthDate);
    } else {
      setIsValidBirthDate(false);
    }
  };

  const setGenderHandler = (event: Event) => {
    const value = (event.target as HTMLSelectElement).value;

    setIsValidGender(true);
    setGender(value);
  };

  return (
    <IonPage>
      <IonHeader id="header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>

          <IonTitle slot="start">Nova conta </IonTitle>
          <IonTitle slot="end">{registerStep + 1}/2</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid className="login-title">
          <AuthLogoComponent />

          <IonCol class="ion-padding"></IonCol>

          <IonRow>
            {registerStep === 0 && <h1>Vamos criar seu registro...</h1>}
          </IonRow>

          <IonRow>
            {registerStep === 1 && (
              <p>Você está a um passo de ser o mais novo membro do clube 😎</p>
            )}
          </IonRow>
        </IonGrid>

        {/* Step 0 */}
        {registerStep === 0 && (
          <IonGrid>
            <IonInput
              className={`
                ${isValidName && "ion-valid"} 
                ${!isValidName && "ion-invalid"} 
                ${isNameTouched && "ion-touched"}
              `}
              type="text"
              label="Nome completo"
              placeholder="Seu Nome"
              errorText="O nome é inválido"
              clearInput={true}
              onIonInput={(event) => validateName(event)}
              onIonBlur={() => setIsNameTouched(true)}
            ></IonInput>

            <IonInput
              className={`
                ${isValidEmail && "ion-valid"} 
                ${!isValidEmail && "ion-invalid"} 
                ${isEmailTouched && "ion-touched"}
              `}
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              errorText="O email é inválido"
              clearInput={true}
              onIonInput={(event) => validateEmail(event)}
              onIonBlur={() => setIsEmailTouched(true)}
            ></IonInput>

            <IonInput
              className={`
                ${isValidPassword && "ion-valid"} 
                ${!isValidPassword && "ion-invalid"} 
                ${isPasswordTouched && "ion-touched"}
              `}
              type="password"
              label="Senha"
              placeholder="digite sua senha"
              errorText="A senha é inválida"
              clearInput={true}
              onIonInput={(event) => validatePassword(event)}
              onIonBlur={() => setIsPasswordTouched(true)}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>

            <IonInput
              className={`
                ${isValidConfirmPassword && "ion-valid"} 
                ${!isValidConfirmPassword && "ion-invalid"} 
                ${isConfirmPasswordTouched && "ion-touched"}
              `}
              type="password"
              label="Confirmar Senha"
              placeholder="confirme sua senha"
              errorText={confirmPasswordErrorText}
              clearInput={true}
              onIonInput={(event) => validateConfirmPassword(event)}
              onIonBlur={() => setIsConfirmPasswordTouched(true)}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
          </IonGrid>
        )}

        {registerStep === 1 && (
          <IonGrid>
            {/* Seu CPF */}
            <IonInput
              className={`
                ${isValidCPF && "ion-valid"} 
                ${!isValidCPF && "ion-invalid"} 
                ${isCPFTouched && "ion-touched"}
              `}
              type="text"
              label="CPF"
              placeholder="Seu CPF"
              errorText={cpfErrorText}
              clearInput={true}
              onIonBlur={() => setIsCPFTouched(true)}
              onIonInput={handleCpfInput}
            ></IonInput>

            {/* Seu Telefone */}
            <IonInput
              className={`
                ${isValidPhone && "ion-valid"} 
                ${!isValidPhone && "ion-invalid"} 
                ${isPhoneTouched && "ion-touched"}
              `}
              type="text"
              label="Telefone"
              placeholder="Seu Telefone"
              errorText={phoneErrorText}
              clearInput={true}
              onIonInput={(event) => validatePhone(event)}
              onIonBlur={() => setIsPhoneTouched(true)}
            ></IonInput>

            <IonRow>
              <IonCol size="4">Data Nascimento</IonCol>

              <IonCol size="8">
                <IonDatetimeButton datetime="datetime"></IonDatetimeButton>

                <IonModal keepContentsMounted={true}>
                  <IonDatetime
                    id="datetime"
                    presentation="date"
                    formatOptions={{
                      date: {
                        weekday: "short",
                        month: "long",
                        day: "2-digit",
                      },
                    }}
                    onIonChange={setBirthDateHandler}
                  ></IonDatetime>
                </IonModal>
              </IonCol>
            </IonRow>

            <IonSelect
              label="Gênero"
              placeholder="Escolha um gênero"
              onIonChange={setGenderHandler}
            >
              <IonSelectOption value="MALE">Masculino</IonSelectOption>
              <IonSelectOption value="FEMALE">Feminino</IonSelectOption>
              <IonSelectOption value="OTHER">Outro</IonSelectOption>
            </IonSelect>
          </IonGrid>
        )}

        <IonCol class="ion-padding"></IonCol>

        {!isLoading ? (
          registerStep === 1 ? (
            <>
              <IonButton
                expand="block"
                disabled={isSaveDisabled}
                onClick={createUserHandler}
              >
                Criar conta
              </IonButton>

              <IonCol size="12" className="ion-text-center">
                <IonButton
                  expand="block"
                  fill="clear"
                  onClick={() => setRegisterStep(0)}
                >
                  <IonIcon slot="start" icon={arrowBackOutline} />
                  Voltar
                </IonButton>
              </IonCol>
            </>
          ) : (
            <IonRow>
              <IonCol size="12" className="ion-text-left">
                <IonButton
                  expand="block"
                  onClick={() => setRegisterStep(1)}
                  className="ion-text-left ion-align-self-center"
                  disabled={isNextStepDisabled}
                >
                  Próximo
                  <IonIcon slot="end" icon={arrowForwardOutline} />
                </IonButton>
              </IonCol>

              <IonCol size="12" className="ion-text-center">
                <IonNavLink
                  routerDirection="forward"
                  component={() => <LoginWithPasswordPage />}
                >
                  <IonButton expand="block" fill="clear">
                    <span
                      style={{
                        marginRight: "8px",
                      }}
                    >
                      Já possui uma conta?
                    </span>{" "}
                    <strong> Entrar</strong>
                  </IonButton>
                </IonNavLink>
              </IonCol>

              <IonCol class="ion-padding"></IonCol>

              <IonCol size="12" className="ion-text-center">
                <IonNavLink
                  routerDirection="back"
                  component={() => <LoginPage />}
                >
                  <IonButton expand="block" fill="clear">
                    <IonIcon slot="start" icon={arrowBackOutline} />
                    Voltar
                  </IonButton>
                </IonNavLink>
              </IonCol>
            </IonRow>
          )
        ) : (
          <IonButton expand="block" disabled={true}>
            <IonSpinner name="dots"></IonSpinner>
          </IonButton>
        )}

        <ToastComponent
          isOpen={isToastOpened}
          onClose={setIsToastOpened}
          message={toastMessage}
          type={toastType}
        />
      </IonContent>
    </IonPage>
  );
};
