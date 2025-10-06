import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonNavLink,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { peopleCircleOutline } from "ionicons/icons";
import { UserListPage } from "../../../user/UserListPage";

export const PartnersSideMenu = () => {
  return (
    <IonMenu side="end" menuId="partners-menu" contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonList lines="full">
          <IonListHeader>
            <IonLabel>Administração</IonLabel>
          </IonListHeader>

          <IonNavLink
            routerDirection="forward"
            component={() => <UserListPage />}
          >
            <IonItem button={true}>
              <IonIcon
                aria-hidden="true"
                icon={peopleCircleOutline}
                slot="end"
              ></IonIcon>

              <IonLabel>Usuários</IonLabel>
            </IonItem>
          </IonNavLink>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
