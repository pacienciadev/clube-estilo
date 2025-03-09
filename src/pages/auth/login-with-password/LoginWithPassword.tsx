import { useState } from "react";

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
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { enterOutline } from "ionicons/icons";

import "./LoginWithPassword.css";

const LoginWithPasswordPage: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>

          <IonTitle>Login com senha</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonGrid className="login-title">
          <IonRow>
            <h1>Preencha abaixo</h1>
          </IonRow>
        </IonGrid>

        <IonList>
          <IonItem>
            <IonInput
              type="email"
              label="E-mail"
              placeholder="seu@email.com"
              clearInput={true}
              onIonChange={(e) => setUser(e.detail.value!)}
            ></IonInput>
          </IonItem>

          <IonItem>
            <IonInput
              type="password"
              label="Senha"
              placeholder="digite sua senha"
              clearInput={true}
              onIonChange={(e) => setPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
          </IonItem>
        </IonList>

        <IonGrid className="ion-padding-vertical">
          <IonRow class="ion-justify-content-between">
            <IonCol>
              <IonCheckbox labelPlacement="end">Lembre de mim</IonCheckbox>
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonButton expand="block" routerLink="/home/tab1">
          Login
          <IonIcon slot="end" icon={enterOutline}></IonIcon>
        </IonButton>

        <IonCol class="ion-padding"></IonCol>

        <IonButton fill="clear" expand="block" routerLink="/forgot-password">
          Esqueceu a senha?
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginWithPasswordPage;
