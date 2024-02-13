import { IonButton } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectItemById } from "../../store/inventorySlice";
import useNewPalNotification from "../../components/NewPalNotification";
import { useCallback } from "react";
import { hatch } from "../../store/palsSlice";

const HatchButton: React.FC<{ itemId: string }> = ({ itemId }) => {
  const { present, dismiss } = useNewPalNotification();
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) =>
    selectItemById(state.inventory, itemId)
  );

  if (item.quantity <= 0) {
    return null;
  }

  const handleClick = useCallback(async () => {
    const pal = dispatch(hatch(itemId));
    if (!pal) {
      return;
    }

    await dismiss();
    await present(pal);
  }, [itemId]);

  return (
    <IonButton fill="clear" size="large" onClick={handleClick}>
      Hatch
    </IonButton>
  );
};

export default HatchButton;
