import { IonButton, IonIcon } from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useCallback } from "react";
import { moveToBook, selectDeckItemById } from "./deckSlice";
import { remove } from "ionicons/icons";

const MoveCardToBookButton: React.FC<{ bookId: string }> = ({ bookId }) => {
  const dispatch = useAppDispatch();
  const item = useAppSelector((state) => selectDeckItemById(state, bookId));

  const handleClick = useCallback(() => {
    dispatch(moveToBook(item));
  }, [item]);

  if (!item) {
    return null;
  }

  return (
    <IonButton onClick={handleClick} fill="clear">
      <IonIcon icon={remove} />
      From Deck
    </IonButton>
  );
};

export default MoveCardToBookButton;
