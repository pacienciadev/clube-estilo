import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { Redirect, Route } from "react-router";

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
      <IonRouterOutlet>
        <Route exact path="/tabs/home">
          <HomeTab />
        </Route>

        <Route exact path="/tabs/map">
          <Tab2 />
        </Route>

        <Route exact path="/tabs/schedule">
          <Tab3 />
        </Route>

        <Route exact path="/tabs/profile">
          <ProfileTab />
        </Route>

        <Route exact path="/tabs">
          <Redirect to="/tabs/home" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home-tab" href="/tabs/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="map-tab" href="/tabs/map">
          <IonIcon icon={locationOutline} />
          <IonLabel>Mapa</IonLabel>
        </IonTabButton>

        <IonTabButton tab="schedule-tab" href="/tabs/schedule">
          <IonIcon icon={bookOutline} />
          <IonLabel>Agenda</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profile-tab" href="/tabs/profile">
          <IonIcon icon={personCircleOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
