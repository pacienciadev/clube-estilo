import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { Redirect, Route } from "react-router";

import { ellipse, square, homeOutline } from "ionicons/icons";

import { HomeTab } from "./home";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";

export const TabsPage: React.FC<object> = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tabs/home">
          <HomeTab />
        </Route>

        <Route exact path="/tabs/tab2">
          <Tab2 />
        </Route>

        <Route exact path="/tabs/tab3">
          <Tab3 />
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

        <IonTabButton tab="tab2" href="/tabs/tab2">
          <IonIcon icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab3" href="/tabs/tab3">
          <IonIcon icon={square} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
