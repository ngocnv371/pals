import { IonButton, IonIcon } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback } from "react";
import { moveToBook, selectDeckItemById } from "./deckSlice";
import { arrowDown } from "ionicons/icons";

const MoveCardToBookButton: React.FC<{ cardId: string }> = ({ cardId }) => {
  const dispatch = useAppDispatch();
  const card = useAppSelector((state) => selectDeckItemById(state, cardId));

  const handleClick = useCallback(() => {
    dispatch(moveToBook(card));
  }, [card]);

  if (!card) {
    return null;
  }

  return (
    <IonButton onClick={handleClick} fill="clear">
      <IonIcon icon={arrowDown} />
      To Collection
    </IonButton>
  );
};

export default MoveCardToBookButton;
