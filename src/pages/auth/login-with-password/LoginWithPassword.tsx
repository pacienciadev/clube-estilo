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
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";

import { enterOutline } from "ionicons/icons";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { ToastComponent } from "../../../components/toast";

import { AuthLogoComponent } from "../components/auth-logo";

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

  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (isValidEmail && isValidPassword) return setIsDisabled(false);

    setIsDisabled(true);
  }, [isValidEmail, isValidPassword]);

  const validateRegexEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
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

  const auth = getAuth();
  const router = useIonRouter();

  const loginHandler = () => {
    console.clear();
    console.log("Login com senha", email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(
          "%c | .then | userCredential.user:",
          "background: black; color: lime",
          userCredential.user
        );

        router.push("/home/tab1", "forward", "replace");
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(
          "%c | loginHandler | errorCode:",
          "background: black; color: lime",
          errorCode
        );

        setIsToastOpened(true);
        setToastMessage("Usuário ou senha inválidos");
        setToastType("alert");
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
        </IonGrid>

        <IonGrid className="ion-padding-vertical">
          <IonRow class="ion-justify-content-between">
            <IonCol>
              <IonCheckbox labelPlacement="end">Lembre de mim</IonCheckbox>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonButton expand="block" disabled={isDisabled} onClick={loginHandler}>
          Login
          <IonIcon slot="end" icon={enterOutline}></IonIcon>
        </IonButton>

        <IonCol class="ion-padding"></IonCol>

        <IonButton fill="clear" expand="block" routerLink="/forgot-password">
          Esqueceu a senha?
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
