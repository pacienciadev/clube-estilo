import { useEffect, useState } from "react";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import { enterOutline, personCircle } from "ionicons/icons";

import { AuthLogoComponent } from "../components/auth-logo";

import { validateEmail, validatePassword } from "../../../utils";
import { ToastComponent } from "../../../components/toast";
import { authService } from "../../../services/auth/auth.service";

import "./LoginWithPassword.css";

const LoginWithPasswordPage: React.FC = () => {
  const [isToastOpened, setIsToastOpened] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"alert" | "success">("alert");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);

  const [isValidEmail, setIsValidEmail] = useState<boolean>();
  const [isValidPassword, setIsValidPassword] = useState<boolean>();

  const [isRememberMeChecked, setIsRememberMeChecked] = useState<boolean>();

  const [isDisabled, setIsDisabled] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isValidEmail && isValidPassword) return setIsDisabled(false);

    setIsDisabled(true);
  }, [isValidEmail, isValidPassword]);

  const validateEmailHandler = (event: Event) => {
    setIsValidEmail(validateEmail(event));

    if (isValidEmail) {
      const value = (event.target as HTMLInputElement).value;

      setEmail(value);
    }
  };

  const validatePasswordHandler = (event: Event) => {
    setIsValidPassword(validatePassword(event));

    if (isValidPassword) {
      const value = (event.target as HTMLInputElement).value;

      setPassword(value);
    }
  };

  const router = useIonRouter();

  const loginHandler = () => {
    setIsLoading(true);

    authService
      .login({ email, password })
      .then((res) => {
        const { access_token: accessToken } = res;

        if (isRememberMeChecked) {
          localStorage.setItem("access_token", accessToken);
        } else {
          sessionStorage.setItem("access_token", accessToken);
        }

        router.push("/home", "root", "replace");
      })
      .catch((error) => {
        const { message } = error.response?.data || error;

        setToastMessage(message);
        setToastType("alert");
        setIsToastOpened(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <IonPage>
      <IonHeader id="header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>Login com senha</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid className="login-title">
          <AuthLogoComponent />

          <IonRow>
            <h1>Preencha abaixo</h1>
          </IonRow>
        </IonGrid>

        <IonGrid>
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
            onIonInput={(event) => validateEmailHandler(event)}
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
            onIonInput={(event) => validatePasswordHandler(event)}
            onIonBlur={() => setIsPasswordTouched(true)}
          >
            <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
          </IonInput>
        </IonGrid>

        <IonGrid className="ion-padding-vertical">
          <IonRow class="ion-justify-content-between">
            <IonCol>
              <IonCheckbox
                labelPlacement="end"
                checked={isRememberMeChecked}
                onIonChange={(e) => setIsRememberMeChecked(e.detail.checked)}
              >
                Lembre de mim - {isRememberMeChecked ? "Ativado" : "Desativado"}
              </IonCheckbox>
            </IonCol>
          </IonRow>
        </IonGrid>

        {!isLoading ? (
          <IonButton
            expand="block"
            disabled={isDisabled}
            onClick={loginHandler}
          >
            Login
            <IonIcon slot="end" icon={enterOutline}></IonIcon>
          </IonButton>
        ) : (
          <IonButton expand="block" disabled={true}>
            <IonSpinner name="dots"></IonSpinner>
          </IonButton>
        )}

        <IonCol class="ion-padding"></IonCol>

        <IonButton fill="clear" expand="block" routerLink="/forgot-password">
          <IonText>Esqueceu a senha?</IonText>
        </IonButton>

        <IonCol class="ion-padding"></IonCol>

        <IonButton fill="clear" expand="block" routerLink="/register">
          <IonIcon
            slot="start"
            icon={personCircle}
            className="ion-align-self-start"
          ></IonIcon>

          <IonText>Criar nova conta</IonText>
        </IonButton>

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

export default LoginWithPasswordPage;
