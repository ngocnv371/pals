import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFooter,
} from "@ionic/react";
import { useCallback, useState } from "react";
import "./styles.css";
import DeckGrid from "./DeckGrid";
import { DeckItem } from "./model";
import CardFlavor from "../../components/Card/CardFlavor";
import CardToolbar from "./CardToolbar";
import { useAppSelector } from "../../store/hooks";
import { selectTotal } from "./deckSlice";

const DeckPage: React.FC = () => {
  const [selected, setSelected] = useState<DeckItem>();
  const total = useAppSelector(selectTotal);

  const toggle = useCallback(
    (value: DeckItem) =>
      setSelected((old) => (old?.id == value.id ? undefined : value)),
    []
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Deck ({total}/40)</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <DeckGrid selected={selected} onSelect={toggle} />
      </IonContent>

      {Boolean(selected) && (
        <IonFooter>
          <CardToolbar cardId={selected!.id} />
          <CardFlavor cardId={selected!.type} />
        </IonFooter>
      )}
    </IonPage>
  );
};

export default DeckPage;
