import { useEffect, useState } from "react";
import { IonImg, IonRow } from "@ionic/react";

import "./AuthLogo.css";

const AuthLogoComponent: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsDarkMode(isDarkMode);
  }, []);

  return (
    <IonRow className="logo-height-wrapper ion-justify-content-center ion-padding">
      {isDarkMode ? (
        <IonImg
          src="images/clube-estilo-dark-logo.png"
          alt="Logo Clube Estilo"
        ></IonImg>
      ) : (
        <IonImg
          src="images/clube-estilo-light-logo.png"
          alt="Logo Clube Estilo"
        ></IonImg>
      )}
    </IonRow>
  );
};

export default AuthLogoComponent;
