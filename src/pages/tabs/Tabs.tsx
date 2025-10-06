import {
  IonIcon,
  IonLabel,
  IonTab,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { Tab2 } from "./Tab2";
import { Tab3 } from "./Tab3";

import {
  bookOutline,
  homeOutline,
  locationOutline,
  personCircleOutline,
} from "ionicons/icons";

import { HomeTab } from "./home/HomeTab";
import { ProfileTab } from "./profile/ProfileTab";

export const TabsPage: React.FC<object> = () => {
  return (
    <IonTabs>
      <IonTab tab="home-tab">
        <HomeTab />
      </IonTab>

      <IonTab tab="map-tab">
        <Tab2 />
      </IonTab>

      <IonTab tab="schedule-tab">
        <Tab3 />
      </IonTab>

      <IonTab tab="profile-tab">
        <ProfileTab />
      </IonTab>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home-tab">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="map-tab">
          <IonIcon icon={locationOutline} />
          <IonLabel>Mapa</IonLabel>
        </IonTabButton>

        <IonTabButton tab="schedule-tab">
          <IonIcon icon={bookOutline} />
          <IonLabel>Agenda</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile-tab">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
