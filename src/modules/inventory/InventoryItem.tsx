import ItemIcon from "../../components/ItemIcon";
import { useInventoryItem } from "./useInventoryItemQuantity";

type Props = {
  id: string;
  onClick?: () => void;
};
export default function InventoryItem({ id, onClick }: Props) {
  const item = useInventoryItem(id);
  if (!item) {
    return null;
  }

  const isStackable = typeof item === "number";
  if (isStackable) {
    return <ItemIcon type={id} quantity={item} onClick={onClick} />;
  }

  return (
    <ItemIcon type={item.type} quantity={item.quantity} onClick={onClick} />
  );
}
