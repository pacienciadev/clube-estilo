import {
  IonButton,
  IonCard,
  IonCol,
  IonIcon,
  IonRow,
  IonText,
} from "@ionic/react";

import "./NextYouList.css";

import { menuController } from "@ionic/core/components";
import {
  heart,
  options,
  people,
  star,
  storefrontOutline,
} from "ionicons/icons";

export const NextYouList = ({ partners }: { partners: string[] }) => {
  const openSideMenu = async () => {
    await menuController.open("side-menu");
  };

  return partners.length ? (
    <>
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
    </>
  ) : (
    <>
      <IonRow className="empty-partners-list ion-align-items-center ion-justify-content-center ion-padding-vertical">
        <IonCol className="ion-text-center-icon" size="12">
          <IonIcon icon={storefrontOutline}></IonIcon>
        </IonCol>

        <IonCol className="ion-text-center" size="12">
          <IonText>Nenhum parceiro encontrado</IonText>
        </IonCol>
      </IonRow>
    </>
  );
};
