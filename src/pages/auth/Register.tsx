import { useEffect, useState } from "react";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonRow,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { validateRegexEmail } from "../../utils";

import { ToastComponent } from "../../components/Toast";
import { AuthLogoComponent } from "../../components/AuthLogo";

import "./Register.css";
import { authService } from "../../services/auth/auth.service";
import { useAuth } from "../../contexts/useAuth";
import { useHistory } from "react-router";

export const RegisterPage: React.FC = () => {
  const [isToastOpened, setIsToastOpened] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"alert" | "success">("alert");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isNameTouched, setIsNameTouched] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] =
    useState(false);

  const [isValidName, setIsValidName] = useState<boolean>();
  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [isValidPassword, setIsValidPassword] = useState<boolean>();
  const [isValidConfirmPassword, setIsValidConfirmPassword] =
    useState<boolean>();

  const [confirmPasswordErrorText, setConfirmPasswordErrorText] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (
      isValidName &&
      isValidEmail &&
      isValidPassword &&
      isValidConfirmPassword
    )
      return setIsDisabled(false);

    setIsDisabled(true);
  }, [isValidName, isValidEmail, isValidPassword, isValidConfirmPassword]);

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

  const { userCreated } = useAuth();
  const history = useHistory();

  const createUserHandler = async () => {
    setIsLoading(true);

    try {
      const data = await authService.createAccount({
        name,
        email,
        password
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

  return (
    <IonPage>
      <IonHeader id="header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>

          <IonTitle>Nova conta</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid className="login-title">
          <AuthLogoComponent />

          <IonRow>
            <h1>Vamos criar seu registro...</h1>
          </IonRow>

          <IonRow>
            <p>Você está a um passo de ser o mais novo membro do clube 😎</p>
          </IonRow>
        </IonGrid>

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

        <IonGrid className="ion-padding-vertical"></IonGrid>

        {!isLoading ? (
          <IonButton
            expand="block"
            disabled={isDisabled}
            onClick={createUserHandler}
          >
            Criar conta
          </IonButton>
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
