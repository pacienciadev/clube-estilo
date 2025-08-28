import { IonButton, IonIcon } from "@ionic/react";

import { menu } from "ionicons/icons";

import { LogoComponent } from "../Logo";

import "./HomeNav.css";

export const HomeNav = ({ onMenuBtnClick }: { onMenuBtnClick: () => void }) => {
  return (
    <>
      <div className="home-nav ion-padding">
        <LogoComponent size="100px" />

        <IonButton fill="clear" onClick={onMenuBtnClick}>
          Menu
          <IonIcon slot="end" icon={menu}></IonIcon>
        </IonButton>
      </div>
    </>
  );
};
