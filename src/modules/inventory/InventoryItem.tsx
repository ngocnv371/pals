import ItemIcon from "../../components/ItemIcon";
import { useInventoryItem } from "./useInventory";

type Props = {
  id: string;
};
export default function InventoryItem({ id }: Props) {
  const quantity = useInventoryItem(id);
  return <ItemIcon id={id} quantity={quantity} />;
}
