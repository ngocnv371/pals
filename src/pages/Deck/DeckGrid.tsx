import "./DeckGrid.css";
import {
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { arrowDown, arrowUp, checkmarkCircle } from "ionicons/icons";
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
  const dispatch = useAppDispatch();
  const deck = useAppSelector(selectAllDeckItems);
  const book = useAppSelector(selectAllBookItems);

  const moveUp = useCallback(() => dispatch(moveToDeck(selected!)), [selected]);
  const moveDown = useCallback(
    () => dispatch(moveToBook(selected!)),
    [selected]
  );
  const canMoveUp = Boolean(selected) && book.some((b) => b.id == selected?.id);
  const canMoveDown =
    Boolean(selected) && deck.some((b) => b.id == selected?.id);

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
        <IonButtons slot="start">
          <IonButton onClick={moveUp} disabled={!canMoveUp}>
            <IonIcon icon={arrowUp}></IonIcon>Up
          </IonButton>
        </IonButtons>
        <IonTitle>Collections</IonTitle>
        <IonButtons slot="end">
          <IonButton onClick={moveDown} disabled={!canMoveDown}>
            <IonIcon icon={arrowDown}></IonIcon>Down
          </IonButton>
        </IonButtons>
      </IonToolbar>

      <IonNote color="medium" class="ion-margin-horizontal ion-margin-top">
        {book.length} cards in collections
      </IonNote>

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
