import { useAppSelector } from "../../store/hooks";
import { selectAllItems } from "../../store/inventorySlice";
import ItemIcon from "../ItemIcon";
import "./styles.css";

const InventoryList: React.FC = () => {
  const items = useAppSelector((state) => selectAllItems(state.inventory));

  if (items.length == 0) {
    return <p className="ion-padding">No item</p>;
  }

  return (
    <div className="inventory-list">
      {items.map((i) => (
        <ItemIcon key={i.id} item={i} />
      ))}
    </div>
  );
};

export default InventoryList;
