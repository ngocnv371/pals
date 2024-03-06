import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
} from "@ionic/react";
import { useState } from "react";
import "./styles.css";
import DeckGrid from "./DeckGrid";

const DeckPage: React.FC = () => {
  const [selected, setSelected] = useState("");

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
        <DeckGrid selected={selected} onSelect={setSelected} />
      </IonContent>
    </IonPage>
  );
};

export default DeckPage;
