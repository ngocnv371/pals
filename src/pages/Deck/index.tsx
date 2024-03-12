import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonTitle,
  IonContent,
  IonFooter,
  IonRouterLink,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useCallback, useState } from "react";
import "./styles.css";
import DeckGrid from "./DeckGrid";
import { DECK_SIZE, DeckItem } from "./model";
import CardFlavor from "../../components/Card/CardFlavor";
import CardToolbar from "./CardToolbar";
import { useAppSelector } from "../../store/hooks";
import { selectTotal } from "./deckSlice";
import { arrowForward } from "ionicons/icons";

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
          <IonTitle>
            Deck ({total}/{DECK_SIZE})
          </IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/book">
              Collection
              <IonIcon icon={arrowForward} slot="end" />
            </IonButton>
          </IonButtons>
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
