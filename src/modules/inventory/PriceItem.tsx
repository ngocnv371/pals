import ItemIcon from "../../components/ItemIcon";
import { useInventoryItem } from "./useInventory";

type Props = {
  id: string;
  quantity: number;
};
export default function PriceItem({ id, quantity }: Props) {
  const stock = useInventoryItem(id);
  return <ItemIcon id={id} quantity={`${quantity}/${stock}`} />;
}
