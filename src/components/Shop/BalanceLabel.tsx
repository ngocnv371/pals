import { IonLabel } from "@ionic/react";
import { useAppSelector } from "../../store/hooks";
import { selectGold } from "../../store/inventorySlice";

const BalanceLabel: React.FC = () => {
  const gold = useAppSelector((state) => selectGold(state));
  return <IonLabel color="warning">{gold}G</IonLabel>;
};

export default BalanceLabel;
