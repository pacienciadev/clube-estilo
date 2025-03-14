import { IonImg, IonRow } from "@ionic/react";

import "./AuthLogo.css";

const AuthLogoComponent: React.FC = () => {
  return (
    <IonRow className="logo-height-wrapper ion-justify-content-center ion-padding">
      <IonImg
        src="src/assets/images/clube-estilo-ligth-logo.png"
        alt="Logo Clube Estilo"
      ></IonImg>
    </IonRow>
  );
};

export default AuthLogoComponent;