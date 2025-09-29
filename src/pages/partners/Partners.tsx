import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
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
              <LogoComponent size="64px" />
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
          Tap the button in the toolbar to open the menu.
        </IonContent>
      </IonPage>
    </>
  );
};
