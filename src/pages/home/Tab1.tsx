import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { signOut } from "firebase/auth";

import { auth } from "../../services";

import "./Tab1.css";

const Tab1: React.FC = () => {
  const logoutHandler = () =>
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home screen</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 1</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton expand="block" onClick={logoutHandler}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
