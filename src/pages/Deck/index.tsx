import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from "@ionic/react";
import React from "react";
import "./styles.css";
import DuelContainer from "./DuelContainer";

const DeckPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <DuelContainer />
      </IonContent>
    </IonPage>
  );
};

export default DeckPage;
