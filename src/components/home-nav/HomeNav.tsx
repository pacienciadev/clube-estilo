import { IonButton, IonIcon } from "@ionic/react";

import { menu } from "ionicons/icons";

import "./HomeNav.css";
import { LogoComponent } from "../logo";

export const HomeNav = ({ onMenuBtnClick }: { onMenuBtnClick: () => void }) => {
  return (
    <>
      <div className="home-nav ion-padding">
        <LogoComponent size="100px" />

        <IonButton fill="clear" size="large" onClick={onMenuBtnClick}>
          Menu
          <IonIcon slot="end" icon={menu}></IonIcon>
        </IonButton>
      </div>
    </>
  );
};
