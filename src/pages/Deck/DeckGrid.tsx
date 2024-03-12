import "./DeckGrid.css";
import { IonIcon, IonNote, IonTitle, IonToolbar } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { moveToBook, selectAllDeckItems } from "./deckSlice";
import { CardInfo } from "../../components/Card/CardInfo";
import { DeckItem } from "./model";
import { moveToDeck, selectAllBookItems } from "./bookSlice";
import { useCallback } from "react";

const GridItem: React.FC<{
  onClick: () => void;
  item: DeckItem;
  selected: boolean;
}> = ({ item: p, selected, onClick }) => {
  return (
    <div
      itemType="deck-item"
      itemID={p.id.toString()}
      key={p.id}
      onClick={onClick}
    >
      <CardInfo cardId={p.type} />
      {selected && (
        <IonIcon icon={checkmarkCircle} size="large" color="primary" />
      )}
    </div>
  );
};

const DeckGrid: React.FC<{
  selected?: DeckItem;
  onSelect?: (item: DeckItem) => void;
}> = ({ onSelect, selected }) => {
  const deck = useAppSelector(selectAllDeckItems);
  const book = useAppSelector(selectAllBookItems);

  return (
    <div>
      <div className="deck-grid deck">
        {deck.map((p) => (
          <GridItem
            key={p.id}
            item={p}
            selected={selected?.id == p.id}
            onClick={() => onSelect && onSelect(p)}
          />
        ))}
      </div>

      <IonNote color="medium" class="ion-margin-horizontal">
        {deck.length}/40 in deck
      </IonNote>

      <IonToolbar>
        <IonTitle>Collection ({book.length})</IonTitle>
      </IonToolbar>

      <div className="deck-grid book">
        {book.map((p) => (
          <GridItem
            key={p.id}
            item={p}
            selected={selected?.id == p.id}
            onClick={() => onSelect && onSelect(p)}
          />
        ))}
      </div>
    </div>
  );
};

export default DeckGrid;
