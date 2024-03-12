import { GridItem } from "../../components/Grid/GridItem";
import { DeckItem } from "../Deck/model";

const BookGrid: React.FC<{
  items: DeckItem[];
  selected?: DeckItem;
  onSelect: (item: DeckItem) => void;
}> = ({ items, selected, onSelect }) => {
  return (
    <div className="deck-grid book">
      {items.map((p) => (
        <GridItem
          key={p.id}
          item={p}
          selected={selected?.id == p.id}
          onClick={() => onSelect(p)}
        />
      ))}
    </div>
  );
};

export default BookGrid;
