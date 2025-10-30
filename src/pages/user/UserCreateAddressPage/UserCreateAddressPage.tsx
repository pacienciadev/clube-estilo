import { useEffect, useState } from "react";

import axios from "axios";

import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import "./UserCreateAddressPage.css";

import { locationOutline } from "ionicons/icons";
import { createUserAddress } from "../../../services/user/address.service";
import { ToastComponent } from "../../../components/Toast";

interface UserCreateAddressPageProps {
  onBack: (param: boolean) => void;
}

export const UserCreateAddressPage: React.FC<UserCreateAddressPageProps> = ({ onBack }) => {
  const [isToastOpened, setIsToastOpened] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"alert" | "success">("alert");

  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  // const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchAddressByZipCode = async () => {
      if (zipCode.length === 8 || zipCode.length === 9) {
        try {
          const { data } = await axios.get(
            `https://viacep.com.br/ws/${zipCode}/json/`
          );

          const { logradouro, localidade, uf, complemento } = data;

          setStreet(logradouro || "");
          setCity(localidade || "");
          setState(uf || "");
          // setNeighborhood(bairro || "");
          setComplement(complemento || "");
        } catch (error) {
          console.error("Erro ao buscar endereço:", error);
        }
      }
    };

    fetchAddressByZipCode();
  }, [zipCode]);

  const handleSaveAddress = async () => {
    setIsSaving(true);

    try {
      await createUserAddress({
        description,
        street,
        number,
        complement,
        city,
        state,
        zipCode,
        country: "Brasil",
        inUse: false,
      });

      // Limpar os campos após salvar
      resetAddressFields();

      successToast("Endereço salvo com sucesso!");

      onBack(true);
    } catch (error) {
      console.error(error);

      setToastType("alert");
      setToastMessage("Erro ao salvar o endereço. Tente novamente.");
      setIsToastOpened(true);
    } finally {
      setIsSaving(false);
    }

    function resetAddressFields() {
      setDescription("");
      setStreet("");
      setNumber("");
      setComplement("");
      setCity("");
      setState("");
      setZipCode("");
    }
  };

  const successToast = (message: string) => {
    setToastType("success");
    setToastMessage(message);
    setIsToastOpened(true);
  };

  const enableSaveButton = !(street && number && city && state && zipCode);

  return (
    <IonPage
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <IonHeader id="header">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/user/address"></IonBackButton>
          </IonButtons>

          <IonTitle>Novo Endereço</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRow>
          <IonCol size="12" sizeMd="12">
            <IonText color="medium">
              <p>Preencha os campos abaixo para adicionar um novo endereço.</p>
            </IonText>

            <IonText color="medium">
              <small>
                ( <IonText color="danger">*</IonText> ) campo obrigatório.
              </small>
            </IonText>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonInput
              labelPlacement="floating"
              value={description}
              onIonChange={(e) => setDescription(e.detail.value!)}
              placeholder="Casa, Trabalho, etc."
            >
              <div slot="label">Descrição</div>
            </IonInput>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonInput
              labelPlacement="floating"
              value={zipCode}
              onIonChange={(e) => setZipCode(e.detail.value!)}
              placeholder="00000000"
            >
              <div slot="label">
                CEP <IonText color="danger">*</IonText>
              </div>
            </IonInput>
          </IonCol>

          <IonCol size="8" sizeMd="8">
            <IonInput
              labelPlacement="floating"
              value={street}
              onIonChange={(e) => setStreet(e.detail.value!)}
              placeholder="Rua Gomes Freire"
            >
              <div slot="label">
                Endereço <IonText color="danger">*</IonText>
              </div>
            </IonInput>
          </IonCol>

          <IonCol size="4" sizeMd="4">
            <IonInput
              labelPlacement="floating"
              value={number}
              onIonChange={(e) => setNumber(e.detail.value!)}
              placeholder="123a"
            >
              <div slot="label">
                Número <IonText color="danger">*</IonText>
              </div>
            </IonInput>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonInput
              labelPlacement="floating"
              value={complement}
              onIonChange={(e) => setComplement(e.detail.value!)}
              placeholder="Apto 123"
            >
              <div slot="label">Complemento</div>
            </IonInput>
          </IonCol>

          <IonCol size="8" sizeMd="6">
            <IonInput
              labelPlacement="floating"
              value={city}
              onIonChange={(e) => setCity(e.detail.value!)}
              placeholder="Cidade"
            >
              <div slot="label">
                Cidade <IonText color="danger">*</IonText>
              </div>
            </IonInput>
          </IonCol>

          <IonCol size="4" sizeMd="6">
            <IonInput
              labelPlacement="floating"
              value={state}
              onIonChange={(e) => setState(e.detail.value!)}
              placeholder="UF"
            >
              <div slot="label">
                Estado <IonText color="danger">*</IonText>
              </div>
            </IonInput>
          </IonCol>

          <IonCol size="12" sizeMd="6" className="ion-margin-top">
            <IonButton
              onClick={handleSaveAddress}
              expand="block"
              disabled={enableSaveButton || isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar endereço"}
              <IonIcon slot="end" icon={locationOutline}></IonIcon>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>

      <ToastComponent
        isOpen={isToastOpened}
        onClose={setIsToastOpened}
        message={toastMessage}
        type={toastType}
      />
    </IonPage>
  );
};
