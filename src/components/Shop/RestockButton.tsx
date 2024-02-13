import { IonButton } from "@ionic/react";
import { useAppDispatch } from "../../store/hooks";
import { refreshShop } from "../../store/shopSlice";

const RestockButton: React.FC = () => {
  const dispatch = useAppDispatch();

  function handleClick() {
    dispatch(refreshShop());
  }

  return <IonButton onClick={handleClick}>Restock</IonButton>;
};

export default RestockButton;
