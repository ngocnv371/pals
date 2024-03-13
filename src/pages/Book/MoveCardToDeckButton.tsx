import { IonButton, IonIcon } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { moveToDeck, selectBookItemById } from "./bookSlice";
import { useCallback } from "react";
import { add } from "ionicons/icons";
import { canAdd } from "../Deck/deckSlice";

const MoveCardToDeckButton: React.FC<{ bookId: string }> = ({ bookId }) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => selectBookItemById(state, bookId));
  const disabled = !useAppSelector(canAdd);

  const handleClick = useCallback(() => {
    dispatch(moveToDeck(item));
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <IonButton onClick={handleClick} fill="clear" disabled={disabled}>
      <IonIcon icon={add} /> To Deck
    </IonButton>
  );
};

export default MoveCardToDeckButton;
