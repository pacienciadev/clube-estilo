import {
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";

import "./Welcome.css";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation } from "swiper/modules";

import { AuthLogoComponent } from "../../components/AuthLogo";
import { arrowForwardOutline } from "ionicons/icons";

export const WelcomePage: React.FC = () => {
  return (
    <IonPage
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AuthLogoComponent />

      <Swiper
        // Swiper configuration options as props
        spaceBetween={50}
        slidesPerView={1}
        pagination={{
          type: "fraction",
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <IonGrid>
            <IonRow>
              <IonCol size="12" className="ion-text-center">
                <h1>Bem-vindo ao Clube!</h1>
              </IonCol>

              <IonCol size="12" className="ion-text-center">
                <IonImg
                  class="welcome-images"
                  src="images/welcome/clube-estilo-welcome-01.png"
                  alt="Ilustração prestadores de serviço"
                ></IonImg>
              </IonCol>

              <IonCol size="12" className="ion-text-center">
                <IonText>
                  Clube Estilo é um aplicativo onde você consegue atendimentos{" "}
                  <strong>on-demand</strong> ou <strong>agendados</strong>,
                  dependendo da disponibilidade do profissional desejado.
                </IonText>
              </IonCol>
            </IonRow>
          </IonGrid>
        </SwiperSlide>

        <SwiperSlide>
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <h1>Prático, fácil e rápido!</h1>
            </IonCol>

            <IonCol size="12" className="ion-text-center">
              <IonImg
                class="welcome-images"
                src="images/welcome/clube-estilo-welcome-02.png"
                alt="Logo Clube Estilo"
              ></IonImg>
            </IonCol>

            <IonCol size="12" className="ion-text-center">
              <IonText>
                Ache profissionais de diversas áreas, como cabeleireiros,
                manicures, massagistas, tatuadores e muito mais.
              </IonText>
            </IonCol>
          </IonRow>
        </SwiperSlide>

        <SwiperSlide>
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <h1>Fácil de achar, depois é só aproveitar e relaxar!</h1>
            </IonCol>

            <IonCol size="12" className="ion-text-center">
              <IonImg
                class="welcome-images"
                src="images/welcome/clube-estilo-welcome-03.png"
                alt="Logo Clube Estilo"
              ></IonImg>
            </IonCol>

            <IonCol size="12" className="ion-text-center">
              <IonText>
                Localize por distância, categoria, preço, avaliações, etc.
              </IonText>
            </IonCol>

            <IonCol size="12" className="ion-text-center ion-margin-top">
              <IonButton routerLink="/welcome/address" expand="block">
                Começar
                <IonIcon slot="end" icon={arrowForwardOutline} />
              </IonButton>
            </IonCol>
          </IonRow>
        </SwiperSlide>
      </Swiper>
    </IonPage>
  );
};
