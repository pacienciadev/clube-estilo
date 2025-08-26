import { useEffect, useState } from "react";
import { IonImg } from "@ionic/react";

import "./Logo.css";

export const LogoComponent = ({ size = "128px" }: { size?: string }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setIsDarkMode(isDarkMode);
  }, []);

  return (
    <div className="logo-container" style={{ width: size }}>
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
    </div>
  );
};
