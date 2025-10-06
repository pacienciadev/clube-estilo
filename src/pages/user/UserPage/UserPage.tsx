import {
  IonBackButton,
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonHeader,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./UserPage.css";

import { UserTypes } from "../../../types";

export const UserPage = ({ user }: { user: UserTypes }) => {
  const { id, name, email, createdAt, updatedAt, affiliation, ...userData } =
    user;

  console.log("%c | id removed:", "background: #000; color: #fff", id);

  return (
    <IonPage>
      <IonHeader id="header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/partners"></IonBackButton>
          </IonButtons>

          <IonTitle>Detalhes do Usuário</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <img
            alt="Silhouette of mountains"
            src="https://ionicframework.com/docs/img/demos/card-media.png"
          />

          <IonCardHeader>
            <IonCardTitle>{name}</IonCardTitle>
            <IonCardSubtitle>{email}</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonRow className="ion-align-items-center ion-justify-content-between">
              <IonCol size="8">
                <IonText color="primary">
                  <h2>Informações</h2>
                </IonText>
              </IonCol>

              <IonCol size="4">
                <IonButton expand="full" color="primary">
                  Editar
                </IonButton>
              </IonCol>

              <IonCol size="12">
                {affiliation === "SUPER_ADMIN" && (
                  <IonBadge color="warning">SP Admin</IonBadge>
                )}

                {affiliation === "USER" && null}
              </IonCol>
            </IonRow>

            <IonRow>
              {Object.entries(userData).map(([key, value]) => (
                <IonCol
                  size="12"
                  style={{ margin: "8px 0", background: "#00000030" }}
                  key={key}
                >
                  <IonText color="primary">
                    <p>
                      <strong>{key}: </strong>
                    </p>
                  </IonText>

                  <IonText>
                    <p>{value || <IonText color="warning">N/a</IonText>}</p>
                  </IonText>
                </IonCol>
              ))}
            </IonRow>

            <IonRow>
              <IonCol size="12" style={{ marginTop: "16px" }}>
                <IonText color="medium">
                  <p>
                    <strong>Atualizado em: </strong>
                    {updatedAt || <IonText color="warning">N/a</IonText>}
                  </p>
                  <p>
                    <strong>Criado em: </strong>
                    {createdAt || <IonText color="warning">N/a</IonText>}
                  </p>
                </IonText>
              </IonCol>
            </IonRow>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
