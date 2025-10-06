import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonNavLink,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import "./Login.css";

import { lockClosed, personCircle } from "ionicons/icons";

import { AuthLogoComponent } from "../../components/AuthLogo";

import { LoginWithPasswordPage } from "./LoginWithPassword";
import { RegisterPage } from "./Register";

export const LoginPage: React.FC = () => {
  return (
    <IonPage
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IonContent className="ion-padding login-wrapper">
        <IonGrid className="login-title">
          <AuthLogoComponent />

          <IonRow className="ion-justify-content-center">
            <h1>Quem bom te ter por aqui!</h1>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <p>Acesse sua conta para usar o app.</p>
          </IonRow>
        </IonGrid>

        <IonCol class="ion-padding"></IonCol>

        <IonNavLink
          routerDirection="forward"
          component={() => <LoginWithPasswordPage />}
        >
          <IonButton expand="block">
            <IonIcon
              slot="start"
              icon={lockClosed}
              className="ion-align-self-start"
            ></IonIcon>

            <IonText>Entrar com o E-mail e Senha</IonText>
          </IonButton>
        </IonNavLink>

        <IonCol class="ion-padding"></IonCol>

        <IonNavLink
          routerDirection="forward"
          component={() => <RegisterPage />}
        >
          <IonButton fill="clear" expand="block">
            <IonIcon
              slot="start"
              icon={personCircle}
              className="ion-align-self-start"
            ></IonIcon>

            <IonText>Criar nova conta</IonText>
          </IonButton>
        </IonNavLink>
      </IonContent>
    </IonPage>
  );
};
