import { useState } from "react";

import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import { enterOutline, logoGoogle } from "ionicons/icons";

import "./Login.css";

const LoginPage: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid className="login-title">
          <IonRow>
            <h1>Quem bom te ter por aqui!</h1>
          </IonRow>

          <IonRow>
            <p>Acesse sua conta para usar o app.</p>
          </IonRow>
        </IonGrid>

        <IonList className="login-form">
          <IonButton expand="block" color="danger">
            <IonIcon
              slot="start"
              icon={logoGoogle}
              className="ion-padding-horizontal"
            ></IonIcon>

            <IonText>Entrar com o Google</IonText>
          </IonButton>
        </IonList>

        <IonGrid>
          <IonRow className="ion-padding ion-justify-content-center">
            <h5>Ou se preferir...</h5>
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

        <IonButton fill="clear" expand="block" routerLink="/register">
          Criar nova conta
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
