import { IonButton, IonIcon } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { moveToDeck, selectBookItemById } from "./bookSlice";
import { useCallback } from "react";
import { add } from "ionicons/icons";
import { canAdd } from "../Deck/deckSlice";

const MoveCardToDeckButton: React.FC<{ cardId: string }> = ({ cardId }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => selectBookItemById(state, cardId));
  const disabled = !useAppSelector(canAdd);

  const handleClick = useCallback(() => {
    dispatch(moveToDeck(card));
  }, [card]);

  if (!card) {
    console.debug("card not found", cardId);
    return null;
  }

  return (
    <IonButton onClick={handleClick} fill="clear" disabled={disabled}>
      <IonIcon icon={add} /> To Deck
    </IonButton>
  );
};

export default MoveCardToDeckButton;
