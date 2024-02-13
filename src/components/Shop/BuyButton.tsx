import { IonButton } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectGold } from "../../store/inventorySlice";
import { buy } from "../../store/shopSlice";
import { useCallback } from "react";

const BuyButton: React.FC<{ itemId: string; price: number }> = ({
  itemId,
  price,
}) => {
  const dispatch = useAppDispatch();
  const gold = useAppSelector((state) => selectGold(state));
  const disabled = price > gold;

  const handleClick = useCallback(() => {
    dispatch(buy(itemId));
  }, [itemId]);

  return (
    <IonButton
      fill="clear"
      size="large"
      disabled={disabled}
      onClick={handleClick}
    >
      Buy {price}G
    </IonButton>
  );
};

export default BuyButton;
