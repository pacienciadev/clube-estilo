import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import { menuController } from "@ionic/core/components";

import {
  create,
  earth,
  heart,
  star,
  people,
  options,
  location,
} from "ionicons/icons";

import { HomeNav } from "../../components/HomeNav";
import { SideMenu } from "../../components/SideMenu";
import { CategoryBox } from "../../components/CategoryBox";

import { useAuth } from "../../contexts/useAuth";

import "./HomeTab.css";
import { useEffect, useState } from "react";
import { getUserAddress } from "../../services/user/address.service";

export const HomeTab = () => {
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const addresses = await getUserAddress();
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

  const openSideMenu = async () => {
    await menuController.open("side-menu");
  };

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

          <CategoryBox />

          <IonRow
            className="ion-padding-horizontal ion-align-items-center ion-justify-content-between"
            style={{
              marginTop: "12px",
            }}
          >
            <IonCol>
              <IonText
                style={{
                  fontSize: "16px",
                }}
              >
                Próximos até <strong style={{ color: "#E67E22" }}>5km</strong>
              </IonText>
            </IonCol>

            <IonCol className="ion-text-end">
              <IonButton fill="outline" color="primary" onClick={openSideMenu}>
                Filtros
                <IonIcon slot="end" icon={options}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>

          <IonCard>
            <div className="card-wrapper">
              <div className="card-image"></div>

              <div className="card-content">
                <div className="title">Old School Barbers</div>

                <div className="details">
                  <div className="rating">
                    <IonIcon icon={star}></IonIcon>
                    4.8
                  </div>

                  <div>|</div>

                  <div className="category">Barbearia</div>

                  <div>|</div>

                  <div className="distance">2.5 km</div>
                </div>

                <div className="online-available">
                  <IonIcon icon={people}></IonIcon> 4 Profissionais disponíveis
                </div>
              </div>

              <div className="card-rating">
                <IonButton shape="round" fill="clear" color="danger">
                  <IonIcon slot="icon-only" icon={heart}></IonIcon>
                </IonButton>
              </div>
            </div>
          </IonCard>

          <IonCard>
            <div className="card-wrapper">
              <div className="card-image"></div>

              <div className="card-content">
                <div className="title">Old School Barbers</div>

                <div className="details">
                  <div className="rating">
                    <IonIcon icon={star}></IonIcon>
                    4.8
                  </div>

                  <div>|</div>

                  <div className="category">Barbearia</div>

                  <div>|</div>

                  <div className="distance">2.5 km</div>
                </div>

                <div className="online-available">
                  <IonIcon icon={people}></IonIcon> 4 Profissionais disponíveis
                </div>
              </div>

              <div className="card-rating">
                <IonButton shape="round" fill="clear" color="danger">
                  <IonIcon slot="icon-only" icon={heart}></IonIcon>
                </IonButton>
              </div>
            </div>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};
