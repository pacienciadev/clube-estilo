import { useEffect, useState } from "react";
import { useHistory } from "react-router";

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
} from "@ionic/react";

import { enterOutline, personCircle } from "ionicons/icons";

import { validateEmail, validatePassword } from "../../../utils";

import { AuthLogoComponent } from "../../../components/auth-logo";
import { ToastComponent } from "../../../components/toast";

import { useAuth } from "../../../contexts/useAuth";

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

  const [isRememberMeChecked, setIsRememberMeChecked] = useState<boolean>(false);

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

  const history = useHistory();

  const { login } = useAuth();

  const loginHandler = () => {
    setIsLoading(true);

    login({ email, password, isRememberMeChecked })
      .then(() => {
        history.push("/tabs/home");
      })
      .catch((error: string) => {
        setToastMessage(error);
        setToastType("alert");
        setIsToastOpened(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <IonPage
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IonHeader id="header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>

          <IonTitle>Login com senha</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding login-wrapper">
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
                Lembre de mim
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
      </IonContent>

      <ToastComponent
        isOpen={isToastOpened}
        onClose={setIsToastOpened}
        message={toastMessage}
        type={toastType}
      />
    </IonPage>
  );
};

export default LoginWithPasswordPage;
