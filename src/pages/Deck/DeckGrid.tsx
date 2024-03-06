import "./DeckGrid.css";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { checkmarkCircle } from "ionicons/icons";
import { useAppSelector } from "../../store/hooks";
import { selectAllDeckItems, selectDeckItemById } from "./deckSlice";
import { CardInfo } from "../../components/Card/CardInfo";
import { DeckItem } from "./model";

const DeckGrid: React.FC<{
  selected?: string;
  onSelect?: (item: DeckItem) => void;
}> = ({ onSelect, selected }) => {
  const filtered = useAppSelector(selectAllDeckItems);

  if (filtered.length == 0) {
    return <p>No result</p>;
  }

  return (
    <div className="deck-grid">
      {filtered.map((p, idx) => (
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
  );
};

export default DeckGrid;
