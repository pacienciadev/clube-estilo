import { useHistory } from "react-router";
import { useState } from "react";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonSpinner,
} from "@ionic/react";

import { close, logOutOutline } from "ionicons/icons";

import { useAuth } from "../../contexts/useAuth";

export const SideMenu = () => {
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

  return (
    <IonMenu
      side="end"
      type="reveal"
      menuId="side-menu"
      contentId="main-content"
    >
      <IonContent>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "8px 8px 0",
          }}
        >
          <IonMenuToggle>
            <IonButton fill="clear">
              Fechar
              <IonIcon slot="end" icon={close}></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </div>

        <div>
          <IonList lines="full">
            {/* <IonItem>
                <IonLabel>Item exemplo</IonLabel>
                <IonIcon slot="end" icon={star}></IonIcon>
              </IonItem> */}

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
  );
};
