import { KeyboardEvent, useEffect, useState } from "react";

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

import "./UserUpdateAddressPage.css";

import { locationOutline } from "ionicons/icons";
import {
  updateUserAddress,
  getUserAddress,
} from "../../../services/user/address.service";

import { AddressTypes } from "../../../types";

import { useParams } from "react-router-dom";

type RouteParams = {
  id: string;
};

export const UserUpdateAddressPage: React.FC = () => {
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  // const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [inUse, setInUse] = useState(false);

  const params = useParams<RouteParams>();

  useEffect(() => {
    const fetchUserAddress = (id: string) => {
      getUserAddress(id).then((address: AddressTypes) => {
        setDescription(address.description || "");
        setStreet(address.street || "");
        setNumber(address.number || "");
        setComplement(address.complement || "");
        setCity(address.city || "");
        setState(address.state || "");
        setZipCode(address.zipCode || "");
        setInUse(address.inUse || false);
      });
    };

    fetchUserAddress(params.id);
  }, [params.id]);

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

  const handleSaveEditAddress = async () => {
    setIsSaving(true);

    const payload = {
      description,
      street,
      number,
      complement,
      city,
      state,
      zipCode,
      country: "Brasil",
      inUse,
    };

    try {
      await updateUserAddress(params.id, payload);

      alert("Endereço editado e salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao editar endereço:", error);
    } finally {
      setIsSaving(false);
    }
  };

  type SetStateFn = (value: string) => void;

  const handleKeyUp = (
    event: KeyboardEvent<HTMLIonInputElement>,
    setState: SetStateFn
  ) => {
    const input = event.target as HTMLInputElement;

    setState(input.value);
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

          <IonTitle>Editar Endereço</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonRow>
          <IonCol size="12" sizeMd="12">
            <IonText color="medium">
              <p>Utilize os campos abaixo para editar o endereço.</p>
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
              onKeyUp={(e) => handleKeyUp(e, setDescription)}
              placeholder="Casa, Trabalho, etc."
            >
              <div slot="label">Descrição</div>
            </IonInput>
          </IonCol>

          <IonCol size="12" sizeMd="6">
            <IonInput
              labelPlacement="floating"
              value={zipCode}
              onKeyUp={(e) => handleKeyUp(e, setZipCode)}
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
              onKeyUp={(e) => handleKeyUp(e, setStreet)}
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
              onKeyUp={(e) => handleKeyUp(e, setNumber)}
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
              onKeyUp={(e) => handleKeyUp(e, setComplement)}
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
              onKeyUp={(e) => handleKeyUp(e, setCity)}
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
              onKeyUp={(e) => handleKeyUp(e, setState)}
              placeholder="UF"
            >
              <div slot="label">
                Estado <IonText color="danger">*</IonText>
              </div>
            </IonInput>
          </IonCol>

          <IonCol size="12" sizeMd="6" className="ion-margin-top">
            <IonButton
              onClick={handleSaveEditAddress}
              expand="block"
              disabled={enableSaveButton || isSaving}
            >
              {isSaving ? "Salvando..." : "Salvar endereço"}
              <IonIcon slot="end" icon={locationOutline}></IonIcon>
            </IonButton>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};
