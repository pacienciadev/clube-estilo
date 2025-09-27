import { useEffect, useState } from "react";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import "./HomeTab.css";


import {
  create,
  earth,
  location,
} from "ionicons/icons";

import { HomeNav } from "../../../components/HomeNav";
import { SideMenu } from "../../../components/SideMenu";
import { CategoryBox } from "../../../components/CategoryBox";
import { NextYouList } from "../../../components/NextYouList";

import { useAuth } from "../../../contexts/useAuth";

import { getUserAddresses } from "../../../services/user/address.service";

export const HomeTab = () => {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addresses = await getUserAddresses();
        const getInUseAddress = addresses.filter(
          (addr) => addr.inUse === true
        )[0];

        setAddress(
          `${getInUseAddress.street}, ${getInUseAddress.number} - ${getInUseAddress.city}`
        );

        console.log("Endereço em uso:", address);
      } catch (error) {
        console.error("Erro ao buscar o endereço:", error);
      }
    };

    fetchAddress();
  }, []);

  const { user } = useAuth();

 

  return (
    <>
      <SideMenu />

      <IonPage id="main-content">
        <IonContent fullscreen>
          <HomeNav />

          <IonRow
            className="ion-align-items-center ion-justify-content-center ion-padding address-text"
            style={{ gap: "10px", backgroundColor: "#2C3E50" }}
          >
            {address ? (
              <>
                <IonIcon icon={earth} style={{ fontSize: "20px" }}></IonIcon>

                <IonText class="address-limit">{address}</IonText>

                <IonButton
                  shape="round"
                  size="small"
                  color="primary"
                  href="/user/address"
                >
                  <IonIcon icon={location} slot="icon-only"></IonIcon>
                </IonButton>
              </>
            ) : (
              <>
                <IonIcon icon={earth} style={{ fontSize: "22px" }}></IonIcon>

                <IonText>
                  <strong>Endereço não cadastrado</strong>
                </IonText>

                <IonButton href="/user/address">
                  cadastrar
                  <IonIcon slot="end" icon={create}></IonIcon>
                </IonButton>
              </>
            )}
          </IonRow>

          <IonRow className="ion-padding-horizontal">
            <IonText
              style={{
                paddingTop: "22px",
                paddingBottom: "22px",
                lineHeight: 2,
              }}
            >
              <h4 className="hello-wrapper">
                Olá <strong>{user?.userName || "N/a"}</strong>,
              </h4>

              <p
                style={{
                  margin: 0,
                }}
              >
                Preparado para o seu próximo agendamento?
              </p>
            </IonText>
          </IonRow>

          <CategoryBox
            // categories={["Barbearia", "Cabeleireiro", "Manicure", "Estética"]}
            categories={[]}
          />

          <NextYouList partners={[]} />
        </IonContent>
      </IonPage>
    </>
  );
};
