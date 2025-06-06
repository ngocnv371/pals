import ItemIcon from "../../components/ItemIcon";
import { useInventoryItemQuantity } from "./useInventoryItemQuantity";

type Props = {
  id: string;
  quantity: number;
};
export default function PriceItem({ id, quantity }: Props) {
  const stock = useInventoryItemQuantity(id);
  return <ItemIcon type={id} quantity={`${quantity}/${stock}`} />;
}
