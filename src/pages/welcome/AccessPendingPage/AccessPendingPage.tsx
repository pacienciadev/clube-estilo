import {
  IonButton,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonNavLink,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import "./AccessPendingPage.css";
import { AuthLogoComponent } from "../../../components/AuthLogo";
import { LoginPage } from "../../auth/Login";
import { arrowBackOutline } from "ionicons/icons";
import { useAuth } from "../../../contexts/useAuth";

export const AccessPendingPage: React.FC = () => {
  const { logout } = useAuth();

  return (
    <IonPage
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IonHeader id="header" className="ion-padding">
        <AuthLogoComponent />
      </IonHeader>

      <IonContent>
        <IonRow
          className="ion-padding ion-margin"
          style={{ lineHeight: "8px" }}
        >
          <IonCol size="12" className="ion-text-center">
            <IonText class="ion-text-center ion-padding ion-margin">
              Seu cadastro está em análise,
            </IonText>
          </IonCol>

          <IonCol size="12" className="ion-text-center">
            <IonText class="ion-text-center ion-padding ion-margin">
              ele será aprovado em breve.
            </IonText>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonImg
            class="welcome-pending-status"
            src="images/welcome/clube-estilo-pending.png"
            alt="Ilustração prestadores de serviço"
          ></IonImg>
        </IonRow>

        <IonRow
          className="ion-padding ion-margin"
          style={{ lineHeight: "8px" }}
        >
          <IonCol size="12" className="ion-text-center">
            <IonNavLink routerDirection="root" component={() => <LoginPage />}>
              <IonButton expand="block" fill="clear" onClick={logout}>
                <IonIcon slot="start" icon={arrowBackOutline} />
                Voltar para o Login
              </IonButton>
            </IonNavLink>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};
