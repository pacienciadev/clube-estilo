import { useEffect, useState } from "react";

import {
  IonAvatar,
  IonBackButton,
  IonBadge,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNavLink,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./UserListPage.css";

import { caretForwardOutline } from "ionicons/icons";

import { getUserList } from "../../../services/auth/auth.service";

import { UserTypes } from "../../../types";

import { UserPage } from "../UserPage";
import { UserStatusEnum } from "../../../enums";

export const UserListPage: React.FC = () => {
  const [userList, setUserList] = useState<UserTypes[]>([]);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const { users } = await getUserList();

        setUserList(users);
      } catch (error) {
        console.error("Erro ao buscar usuários: ", error);
      }
    };

    fetchAddress();
  }, []);

  return (
    <IonPage>
      <IonHeader id="header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/partners"></IonBackButton>
          </IonButtons>

          <IonTitle>Lista de Usuários</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSearchbar showClearButton="focus"></IonSearchbar>

        {userList.length ? (
          <IonList lines="full">
            {userList.map((user) => (
              <div key={user.id}>
                <IonNavLink
                  routerDirection="forward"
                  component={() => <UserPage user={user} />}
                >
                  <IonItem button={true}>
                    <IonAvatar aria-hidden="true" slot="start">
                      <img
                        alt=""
                        src="https://ionicframework.com/docs/img/demos/avatar.svg"
                      />
                    </IonAvatar>

                    <IonLabel class="username-ellipsis">{user.name.toUpperCase()}</IonLabel>

                    {user.status === UserStatusEnum.ACTIVE && (
                      <IonBadge color="success" slot="end">
                        Ativo
                      </IonBadge>
                    )}

                    {user.status === UserStatusEnum.PENDING && (
                      <IonBadge color="warning" slot="end">
                        Pendente
                      </IonBadge>
                    )}

                    {user.status === UserStatusEnum.INACTIVE && (
                      <IonBadge color="medium" slot="end">
                        Inativo
                      </IonBadge>
                    )}

                    {user.status === UserStatusEnum.SUSPENDED && (
                      <IonBadge color="danger" slot="end">
                        Suspenso
                      </IonBadge>
                    )}

                    {user.affiliation === "SUPER_ADMIN" && (
                      <IonBadge color="primary">SPA</IonBadge>
                    )}

                    {user.affiliation === "USER" && null}

                    <IonIcon slot="end" icon={caretForwardOutline}></IonIcon>
                  </IonItem>
                </IonNavLink>
              </div>
            ))}
          </IonList>
        ) : (
          <IonList lines="full" className="ion-padding">
            <IonLabel>Não há usuários cadastrados.</IonLabel>
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};
