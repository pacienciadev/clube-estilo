import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./Tab3.css";
import { MaintenancePage } from "../maintenance/MaintenancePage";

export const Tab3: React.FC = () => {
  return (
    <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Agenda</IonTitle>
            </IonToolbar>
          </IonHeader>
          
          <IonContent fullscreen>
            <IonHeader collapse="condense">
              <IonToolbar>
                <IonTitle size="large">Agenda</IonTitle>
              </IonToolbar>
            </IonHeader>
    
            <MaintenancePage
              title="A Agenda encontra-se em construção"
              description="Em breve."
            />
          </IonContent>
        </IonPage>
  );
};