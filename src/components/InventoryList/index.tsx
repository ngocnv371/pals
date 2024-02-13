import { useAppSelector } from "../../store/hooks";
import { selectAllItems } from "../../store/inventorySlice";
import ItemIcon from "../ItemIcon";
import "./styles.css";

const InventoryList: React.FC<{ onSelect?: (id: string) => void }> = ({
  onSelect,
}) => {
  const items = useAppSelector((state) => selectAllItems(state.inventory));

  if (items.length == 0) {
    return <p className="ion-padding">No item</p>;
  }

  return (
    <div className="inventory-list">
      {items.map((i) => (
        <ItemIcon
          key={i.id}
          item={i}
          onClick={() => onSelect && onSelect(i.id)}
        />
      ))}
    </div>
  );
};

export default InventoryList;
