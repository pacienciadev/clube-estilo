import { IonCol, IonIcon, IonRow, IonText } from "@ionic/react";

import { grid } from "ionicons/icons";

import "./CategoryBox.css";

export const CategoryBox = ({ categories }: { categories: string[] }) => {
  return (
    <IonRow
      className="ion-align-items-center ion-justify-content-center ion-padding"
      style={{ backgroundColor: "#2C3E50" }}
    >
      {categories.length ? (
        <>
          {categories.map((category, index) => (
            <IonCol key={index} size="3" className="category-box">
              <div
                className="link-box"
                style={{ backgroundColor: "#ccc" }}
              ></div>

              <IonText className="title-box">{category}</IonText>
            </IonCol>
          ))}

          <IonCol size="3" className="category-box">
            <div className="link-box" style={{ backgroundColor: "#233240" }}>
              <IonIcon
                icon={grid}
                size="large"
                style={{ color: "#E67E22" }}
              ></IonIcon>
            </div>

            <IonText className="title-box">Outras Categorias</IonText>
          </IonCol>
        </>
      ) : (
        <IonCol size="12" className="category-box-empty">
          <IonText className="empty-title-box">
            Nenhuma Categoria Disponível
          </IonText>
        </IonCol>
      )}
    </IonRow>
  );
};
