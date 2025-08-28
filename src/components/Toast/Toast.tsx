import { IonToast } from "@ionic/react";

import "./Toast.css";

function ToastComponent({
  isOpen,
  message,
  type,
  onClose,
}: {
  isOpen: boolean;
  message: string;
  type: "alert" | "success";
  onClose: (arg: boolean) => void;
}) {
  return (
    <>
      <IonToast
        isOpen={isOpen}
        onDidDismiss={() => onClose(false)}
        duration={5000}
        message={message}
        className={`custom-toast ${type}`}
        swipeGesture="vertical"
        position="top"
        positionAnchor="header"
      ></IonToast>
    </>
  );
}
export default ToastComponent;
