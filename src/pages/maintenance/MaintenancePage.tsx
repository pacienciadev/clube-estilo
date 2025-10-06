import {
  IonCol,
  IonContent,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import "./MaintenancePage.css";

export const MaintenancePage: React.FC<{
  title?: string;
  description?: string;
}> = ({ title = "Página em manutenção", description = "Em breve." }) => {
  return (
    <IonPage
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IonContent>
        <IonRow className="ion-padding ion-margin">
          <IonCol size="12" className="ion-text-center">
            <IonText class="ion-text-center">
              <h4>{title}</h4>
            </IonText>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol size="12" className="ion-padding">
            <IonImg
              class="welcome-pending-status"
              src="images/clube-estilo-maintenance.png"
              alt="Ilustração prestadores de serviço"
            ></IonImg>
          </IonCol>
        </IonRow>

        <IonRow className="ion-padding ion-margin">
          <IonCol size="12" className="ion-text-center">
            <IonText>
              {description}
            </IonText>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};
