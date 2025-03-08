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
} from "@ionic/react";

import { arrowBackOutline, personAddOutline } from "ionicons/icons";

import "./Register.css";

import { auth } from "../../../services/fb.config";

import { createUserWithEmailAndPassword } from "firebase/auth";

const RegisterPage: React.FC = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const createUserHandle = (user: string, password: string) =>
    createUserWithEmailAndPassword(auth, user, password)
      .then((userCredential) => {
        console.log(
          "%c | .then | userCredential.user:",
          "background: black; color: lime",
          userCredential.user
        );
      })
      .catch((error) => {
        console.log(
          "%c | useEffect | error.code:",
          "background: black; color: lime",
          error.code
        );
        console.log(
          "%c | useEffect | error.message:",
          "background: black; color: lime",
          error.message
        );
      });

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid className="login-title">
          <IonRow>
            <h1>Vamos criar seu registro...</h1>
          </IonRow>

          <IonRow>
            <p>Você está a um passo de ser o mais novo membro do clube 😎</p>
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

          <IonItem>
            <IonInput
              type="password"
              label="Confirmar Senha"
              placeholder="confirme sua senha"
              clearInput={true}
              onIonChange={(e) => setConfirmPassword(e.detail.value!)}
            >
              <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
            </IonInput>
          </IonItem>
        </IonList>

        <IonGrid className="ion-padding-vertical"></IonGrid>

        <IonButton
          expand="block"
          onClick={() => createUserHandle(user, password)}
        >
          Criar conta
          <IonIcon slot="end" icon={personAddOutline}></IonIcon>
        </IonButton>

        <IonCol class="ion-padding"></IonCol>

        <IonButton fill="clear" expand="block" routerLink="/">
          <IonIcon slot="start" icon={arrowBackOutline}></IonIcon>
          Voltar
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
