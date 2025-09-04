import { useState } from "react";
import { useHistory } from "react-router";

import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonSpinner,
  IonText,
  IonToggle,
} from "@ionic/react";

import { useAuth } from "../../../contexts/useAuth";
import { InitialsAvatar } from "../../../components/InitialsAvatar/InitialsAvatar";

import {
  cardOutline,
  chatbubbleEllipsesOutline,
  createOutline,
  documentTextOutline,
  eyeOffOutline,
  heart,
  locationOutline,
  logOutOutline,
  star,
} from "ionicons/icons";

import "./ProfileTab.css";

export const ProfileTab: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkModeChecked, setIsDarkModeChecked] = useState(false);

  const history = useHistory();

  const { user, logout } = useAuth();

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
    <IonPage>
      <IonContent fullscreen>
        <IonCard style={{ padding: "4px" }}>
          <IonRow>
            <IonCol
              size="2"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InitialsAvatar userName={user?.userName || "N a"} />
            </IonCol>

            <IonCol
              size="6"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <IonText
                color="dark"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                {user?.userName}
              </IonText>

              <IonText style={{ color: "#777777ff" }}>
                {/* {user?.email || "N/a"} */}
                user@email.com
              </IonText>
            </IonCol>

            <IonCol
              size="4"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IonButton size="small" shape="round">
                Editar
                <IonIcon slot="end" icon={createOutline}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonCard>

        <IonList lines="full">
          <IonListHeader>
            <IonLabel>Configurações</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={chatbubbleEllipsesOutline}
              slot="end"
            ></IonIcon>
            <IonLabel>Minhas Conversas</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon aria-hidden="true" icon={heart} slot="end"></IonIcon>
            <IonLabel>Favoritos</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={locationOutline}
              slot="end"
            ></IonIcon>
            <IonLabel>Endereço</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon aria-hidden="true" icon={cardOutline} slot="end"></IonIcon>
            <IonLabel>Formas de pagamento</IonLabel>
          </IonItem>

          <IonItem>
            <IonToggle
              checked={isDarkModeChecked}
              onIonChange={(event) =>
                setIsDarkModeChecked(event.detail.checked)
              }
            >
              Modo Escuro
            </IonToggle>
          </IonItem>

          <IonListHeader>
            <IonLabel>Sobre o App</IonLabel>
          </IonListHeader>

          <IonItem>
            <IonIcon aria-hidden="true" icon={star} slot="end"></IonIcon>
            <IonLabel>Quero ser um parceiro</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={documentTextOutline}
              slot="end"
            ></IonIcon>
            <IonLabel>Termos e Condições</IonLabel>
          </IonItem>

          <IonItem>
            <IonIcon
              aria-hidden="true"
              icon={eyeOffOutline}
              slot="end"
            ></IonIcon>
            <IonLabel>Políticas de Privacidade</IonLabel>
          </IonItem>

          <IonItem color="danger" onClick={() => logoutHandler()}>
            <IonLabel>Desconectar conta</IonLabel>

            {isLoading ? (
              <IonSpinner slot="end" />
            ) : (
              <IonIcon slot="end" icon={logOutOutline}></IonIcon>
            )}
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};
