import "./DeckGrid.css";
import { useAppSelector } from "../../store/hooks";
import { selectAllDeckItems } from "./deckSlice";
import { DeckItem } from "./model";
import { GridItem } from "../../components/Grid/GridItem";

const DeckGrid: React.FC<{
  selected?: DeckItem;
  onSelect?: (item: DeckItem) => void;
}> = ({ onSelect, selected }) => {
  const deck = useAppSelector(selectAllDeckItems);

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
    </div>
  );
};

export default DeckGrid;
