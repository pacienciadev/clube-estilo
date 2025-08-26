import { useState } from "react";

import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { menuController } from "@ionic/core/components";

import { close, logOutOutline, star } from "ionicons/icons";

import { HomeNav } from "../../../components/home-nav";
import { useAuth } from "../../../contexts/AuthContext";

import "./HomeTab.css";

export const HomeTab = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { logOut } = useAuth();

  const logoutHandler = () => {
    setIsLoading(true);

    setTimeout(() => {
      logOut();

      setIsLoading(false);
    }, 2000); // Simulate a network request
  };

  const openSideMenu = async () => {
    await menuController.open("side-menu");
  };

  return (
    <>
      <IonMenu
        side="end"
        type="reveal"
        menuId="side-menu"
        contentId="main-content"
      >
        <IonContent>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <IonMenuToggle>
              <IonButton fill="clear" size="large">
                Fechar
                <IonIcon slot="end" icon={close}></IonIcon>
              </IonButton>
            </IonMenuToggle>
          </div>

          <div>
            <IonList lines="full">
              <IonItem>
                <IonLabel>Item exemplo</IonLabel>
                <IonIcon slot="end" icon={star}></IonIcon>
              </IonItem>

              <IonItem color="danger" onClick={() => logoutHandler()}>
                <IonLabel>Finalizar sessão</IonLabel>

                {isLoading ? (
                  <IonSpinner slot="end" />
                ) : (
                  <IonIcon slot="end" icon={logOutOutline}></IonIcon>
                )}
              </IonItem>
            </IonList>
          </div>
        </IonContent>
      </IonMenu>

      <IonPage id="main-content">
        <IonContent fullscreen>
          <HomeNav onMenuBtnClick={openSideMenu} />

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
    </>
  );
};
