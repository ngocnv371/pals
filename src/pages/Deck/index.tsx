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
import CardModal from "../../components/Card/CardModal";
import { DeckItem } from "./model";

const DeckPage: React.FC = () => {
  const [selected, setSelected] = useState<DeckItem>();

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
        <DeckGrid selected={selected?.id} onSelect={setSelected} />
        {Boolean(selected) && <CardModal cardId={selected!.type} />}
      </IonContent>
    </IonPage>
  );
};

export default DeckPage;
