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

import { create, earth, heart, star, people, options } from "ionicons/icons";

import { HomeNav } from "../../../components/HomeNav";
import { SideMenu } from "../../../components/SideMenu";
import { CategoryBox } from "../../../components/CategoryBox";

import { useAuth } from "../../../contexts/useAuth";

import "./HomeTab.css";

export const HomeTab = () => {
  const { user } = useAuth();

  const openSideMenu = async () => {
    await menuController.open("side-menu");
  };

  return (
    <>
      <SideMenu />

      <IonPage id="main-content">
        <IonContent fullscreen>
          <HomeNav onMenuBtnClick={openSideMenu} />

          <IonRow
            className="ion-align-items-center ion-justify-content-center ion-padding address-text"
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

          <IonRow className="ion-padding-horizontal">
            <IonText
              style={{
                paddingTop: "22px",
                paddingBottom: "22px",
              }}
            >
              <h2 className="hello-wrapper">
                Olá <strong>{user?.userName || "N/a"}</strong>,
              </h2>
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

          <IonRow className="ion-padding-horizontal ion-align-items-center ion-justify-content-between">
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
              <IonButton fill="outline" color="primary">
                Filtros
                <IonIcon slot="end" icon={options}></IonIcon>
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding-horizontal">
            <IonCol>
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
                      <IonIcon icon={people}></IonIcon> 4 Profissionais
                      disponíveis
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
                      <IonIcon icon={people}></IonIcon> 4 Profissionais
                      disponíveis
                    </div>
                  </div>

                  <div className="card-rating">
                    <IonButton shape="round" fill="clear" color="danger">
                      <IonIcon slot="icon-only" icon={heart}></IonIcon>
                    </IonButton>
                  </div>
                </div>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonContent>
      </IonPage>
    </>
  );
};
