import { useEffect, useState } from "react";

import {
  IonAccordion,
  IonAccordionGroup,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./UserAddressPage.css";

import {
  addOutline,
  createOutline,
  trashOutline,
  locationOutline,
} from "ionicons/icons";

import {
  getUserAddresses,
  setDefaultAddress,
} from "../../../services/user/address.service";
import { AddressTypes } from "../../../types";

export const UserAddressPage: React.FC = () => {
  const [addressList, setAddressList] = useState<AddressTypes[]>([]);

  const setDefaultAddressHandler = async (id: string) => {
    try {
      await setDefaultAddress(id);

      alert("Endereço definido como padrão com sucesso!");
    } catch (error) {
      console.error("Erro ao definir endereço como padrão:", error);
    }
  };

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addresses = await getUserAddresses();

        setAddressList(addresses);
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
      }
    };

    fetchAddress();
  }, []);

  return (
    <IonPage
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IonHeader id="header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>

          <IonTitle>Gerenciar Endereços</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {!addressList.length ? (
          <div className="empty-address">
            <IonText
              class="ion-text-center"
              style={{
                fontSize: "16px",
                opacity: 0.7,
              }}
            >
              Parece que você ainda{" "}
              <strong>não possui um endereço cadastrado</strong>.
            </IonText>

            <div className="img__wrapper">
              <IonImg src="images/address.png" alt="Logo Clube Estilo"></IonImg>
            </div>
          </div>
        ) : (
          <IonAccordionGroup expand="inset">
            {addressList.map((address, index) => (
              <IonAccordion key={address.id} value={address.id}>
                <IonItem slot="header" color="light">
                  <IonLabel>
                    {!address.description
                      ? `Endereço ${index + 1}`
                      : address.description}{" "}
                    {address.inUse && (
                      <small>
                        <strong>
                          <IonText color="primary">(Em uso)</IonText>
                        </strong>
                      </small>
                    )}
                  </IonLabel>
                </IonItem>

                <div className="ion-padding" slot="content">
                  <small>
                    <strong>
                      <IonText color="dark">Endereço</IonText>
                    </strong>
                  </small>

                  <br />
                  <br />

                  <IonText>
                    {address.street}, {address.number}{" "}
                    {!address.complement ? "" : `- ${address.complement}`}
                  </IonText>

                  <br />

                  <IonText>CEP: {address.zipCode}</IonText>

                  <br />

                  <IonText>
                    {address.city}/{address.state}
                  </IonText>

                  <br />

                  <IonText>{address.country}</IonText>

                  <IonRow className="ion-margin-top">
                    <IonCol>
                      <IonButton
                        onClick={() => alert(`id: ${address.id}`)}
                        expand="block"
                        disabled={address.inUse}
                        color={address.inUse ? "dark" : "danger"}
                      >
                        Apagar
                        <IonIcon slot="end" icon={trashOutline}></IonIcon>
                      </IonButton>
                    </IonCol>

                    <IonCol>
                      <IonButton
                        href={`/user/address/update/${address.id}`}
                        expand="block"
                        color="warning"
                      >
                        Editar
                        <IonIcon slot="end" icon={createOutline}></IonIcon>
                      </IonButton>
                    </IonCol>

                    <IonCol>
                      <IonButton
                        expand="block"
                        fill="clear"
                        disabled={address.inUse}
                        color={address.inUse ? "dark" : "primary"}
                        onClick={() => setDefaultAddressHandler(address.id)}
                      >
                        {address.inUse
                          ? "Definido como padrão"
                          : "Usar este endereço"}

                        <IonIcon slot="end" icon={locationOutline}></IonIcon>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </div>
              </IonAccordion>
            ))}
          </IonAccordionGroup>
        )}

        <IonButton href="/user/address/new" expand="block">
          Cadastrar endereço
          <IonIcon slot="end" icon={addOutline}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
