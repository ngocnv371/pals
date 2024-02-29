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
import { Hand } from "./Hand";
import { Board } from "./Board";
import CardStack from "./CardStack";

const DeckPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Deck</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Deck</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Board />
        <Hand />
        <CardStack />
      </IonContent>
    </IonPage>
  );
};

export default DeckPage;
