import ItemIcon from "../../components/ItemIcon";
import { useInventoryItemQuantity } from "./useInventoryItemQuantity";

type Props = {
  id: string;
};
export default function InventoryItem({ id }: Props) {
  const quantity = useInventoryItemQuantity(id);
  return <ItemIcon id={id} quantity={quantity} />;
}
