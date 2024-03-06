import "./DeckGrid.css";
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { useAppSelector } from "../../store/hooks";
import { selectAllDeckItems } from "./deckSlice";
import { CardInfo } from "../../components/Card/CardInfo";
import { DeckItem } from "./model";
import { selectAllBookItems } from "./bookSlice";

const DeckGrid: React.FC<{
  selected?: string;
  onSelect?: (item: DeckItem) => void;
}> = ({ onSelect, selected }) => {
  const deck = useAppSelector(selectAllDeckItems);
  const book = useAppSelector(selectAllBookItems);

  return (
    <div>
      <div className="deck-grid deck">
        {deck.map((p, idx) => (
          <div
            itemType="deck-item"
            itemID={p.id.toString()}
            key={p.id}
            onClick={() => onSelect && onSelect(p)}
            tabIndex={idx + 1}
          >
            <CardInfo cardId={p.type} />
            {p.id == selected && (
              <IonIcon icon={checkmarkCircle} size="large" color="primary" />
            )}
          </div>
        ))}
      </div>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton>Up</IonButton>
        </IonButtons>
        <IonTitle>Collections</IonTitle>
        <IonButtons slot="end">
          <IonButton>Down</IonButton>
        </IonButtons>
      </IonToolbar>
      <div className="deck-grid book">
        {book.map((p, idx) => (
          <div
            itemType="deck-item"
            itemID={p.id.toString()}
            key={p.id}
            onClick={() => onSelect && onSelect(p)}
            tabIndex={idx + 1}
          >
            <CardInfo cardId={p.type} />
            {p.id == selected && (
              <IonIcon icon={checkmarkCircle} size="large" color="primary" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckGrid;
