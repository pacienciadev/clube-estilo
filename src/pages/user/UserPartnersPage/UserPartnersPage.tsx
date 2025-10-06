import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./UserPartnersPage.css";
import { MaintenancePage } from "../../maintenance/MaintenancePage";

export const UserPartnersPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader id="header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/partners"></IonBackButton>
          </IonButtons>

          <IonTitle>Seja um Parceiro</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <MaintenancePage
          title="Seja um Parceiro encontra-se em manutenção"
          description="Voltaremos o mais breve possível."
        />
      </IonContent>
    </IonPage>
  );
};
