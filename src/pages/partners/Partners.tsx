import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
} from "@ionic/react";

import { menuController } from "@ionic/core/components";

import "./Partners.css";

import { menu } from "ionicons/icons";

import { LogoComponent } from "../../components/Logo";
import { PartnersSideMenu } from "./components/PartnersSideMenu";

export const PartnersPage: React.FC = () => {
  async function openPartnersMenu() {
    await menuController.open("partners-menu");
  }

  return (
    <>
      <PartnersSideMenu />

      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonRow
              className="ion-padding-horizontal"
              style={{ alignItems: "center" }}
            >
              <IonButton fill="clear" routerLink="/">
                <LogoComponent size="64px" />
              </IonButton>
            </IonRow>

            <IonButtons slot="end">
              <IonButton onClick={openPartnersMenu}>
                menu
                <IonIcon slot="end" icon={menu}></IonIcon>
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonText color="primary">
            <h4>Painel do parceiro Clube Estilo!</h4>
          </IonText>

          <IonText>
            <p>Bem-vindo(a)! Use o menu ao lado para navegar entre as opções.</p>
          </IonText>
        </IonContent>
      </IonPage>
    </>
  );
};
