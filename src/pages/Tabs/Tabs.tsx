import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";

import { Route } from "react-router";

import { HomeTab } from "./Home";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";

import { ellipse, square, homeOutline } from "ionicons/icons";

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
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="home-tab" href="/tabs/home">
          <IonIcon aria-hidden="true" icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab2" href="/tabs/tab2">
          <IonIcon aria-hidden="true" icon={ellipse} />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="tab3" href="/tabs/tab3">
          <IonIcon aria-hidden="true" icon={square} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};
