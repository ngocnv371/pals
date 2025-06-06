import ItemIcon from "../../components/ItemIcon";
import { useInventoryItem } from "./useInventoryItemQuantity";

type Props = {
  id: string;
};
export default function InventoryItem({ id }: Props) {
  const item = useInventoryItem(id);
  if (!item) {
    return null;
  }

  const isStackable = typeof item === "number";
  if (isStackable) {
    return <ItemIcon type={id} quantity={item} />;
  }

  return <ItemIcon type={item.type} quantity={item.quantity} />;
}
