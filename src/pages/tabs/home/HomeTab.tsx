import { useState } from "react";
import { useHistory } from "react-router";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
} from "@ionic/react";

import { menuController } from "@ionic/core/components";

import { close, create, earth, logOutOutline, star } from "ionicons/icons";

import { HomeNav } from "../../../components/HomeNav";

import { useAuth } from "../../../contexts/useAuth";

import "./HomeTab.css";

export const HomeTab = () => {
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const { logout } = useAuth();

  const logoutHandler = () => {
    setIsLoading(true);

    setTimeout(() => {
      logout();

      // Redireciona para o login
      history.push("/login", { replace: true });

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

          <IonRow
            className="ion-align-items-center ion-justify-content-center ion-padding"
            style={{ gap: "10px", backgroundColor: "#2C3E50" }}
          >
            <IonIcon icon={earth} style={{ fontSize: "22px" }}></IonIcon>

            <IonText>
              <strong>Endereço não cadastrado</strong>
            </IonText>

            <IonButton>
              cadastrar
              <IonIcon slot="end" icon={create}></IonIcon>
            </IonButton>
          </IonRow>

          <IonRow className="ion-padding">
            <IonText
              style={{
                lineHeight: "0",
                paddingTop: "8px",
                paddingBottom: "22px",
              }}
            >
              <h2>Olá Usuário,</h2>
              <p>Preparado para o seu próximo agendamento?</p>
            </IonText>
          </IonRow>

          <IonRow
            className="ion-align-items-center ion-justify-content-center ion-padding"
            style={{ gap: "10px", backgroundColor: "#2C3E50" }}
          ></IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};
