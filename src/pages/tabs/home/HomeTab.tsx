import { useEffect, useState } from "react";

import {
  IonButton,
  IonContent,
  IonIcon,
  IonNavLink,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import "./HomeTab.css";

import { create, earth, location } from "ionicons/icons";

import { HomeNav } from "../../../components/HomeNav";
import { SideMenu } from "../../../components/SideMenu";
import { CategoryBox } from "../../../components/CategoryBox";
import { NextYouList } from "../../../components/NextYouList";

import { useAuth } from "../../../contexts/useAuth";

import { getUserAddresses } from "../../../services/user/address.service";

import { AddressTypes } from "../../../types";
import { UserAddressPage } from "../../user/UserAddressPage";

export const HomeTab = () => {
  const [addresses, setAddresses] = useState<AddressTypes[]>([]);
  const [homeAddress, setHomeAddress] = useState<string>("");

  useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      const addresses = await getUserAddresses();

      setAddresses(addresses);

      const getInUseAddress = addresses.filter(
        (addr) => addr.inUse === true
      )[0];

      setHomeAddress(
        `${getInUseAddress?.street}, ${getInUseAddress?.number} - ${getInUseAddress?.city}`
      );
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  const { user } = useAuth();

  return (
    <>
      <SideMenu menuId="side-menu" contentId="main-content" />

      <IonPage id="main-content">
        <IonContent fullscreen>
          <HomeNav />

          <IonRow
            className="ion-align-items-center ion-justify-content-center ion-padding address-text"
            style={{ gap: "10px", backgroundColor: "#2C3E50" }}
          >
            {homeAddress ? (
              <>
                <IonIcon icon={earth} style={{ fontSize: "20px" }}></IonIcon>

                <IonText class="address-limit">{homeAddress}</IonText>

                <IonNavLink component={() => <UserAddressPage addresses={addresses} />}>
                  <IonButton shape="round" size="small" color="primary">
                    <IonIcon icon={location} slot="icon-only"></IonIcon>
                  </IonButton>
                </IonNavLink>
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

          <CategoryBox categories={[]} />

          <NextYouList partners={[]} />
        </IonContent>
      </IonPage>
    </>
  );
};
