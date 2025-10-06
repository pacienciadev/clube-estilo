import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import { close, earth } from "ionicons/icons";

export const SideMenu = ({
  menuId,
  contentId,
}: {
  menuId: string;
  contentId: string;
}) => {
  return (
    <IonMenu side="end" type="reveal" menuId={menuId} contentId={contentId}>
      <IonContent>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "8px 8px 0",
          }}
        >
          <IonMenuToggle>
            <IonButton fill="clear">
              Fechar
              <IonIcon slot="end" icon={close}></IonIcon>
            </IonButton>
          </IonMenuToggle>
        </div>

        <div>
          <IonList lines="full">
            <IonItem>
              <IonIcon aria-hidden="true" icon={earth} slot="end"></IonIcon>
              <IonLabel>Termos e Condições</IonLabel>
            </IonItem>

            <IonItem>
              <IonIcon aria-hidden="true" icon={earth} slot="end"></IonIcon>
              <IonLabel>Políticas de Privacidade</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonMenu>
  );
};
