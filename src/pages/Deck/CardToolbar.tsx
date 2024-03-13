import { IonToolbar, IonButtons } from "@ionic/react";
import MoveCardToDeckButton from "../Book/MoveCardToDeckButton";
import MoveCardToBookButton from "./MoveCardToBookButton";

const CardToolbar: React.FC<{ bookId: string }> = ({ bookId }) => {
  return (
    <IonToolbar>
      <IonButtons slot="end">
        <MoveCardToBookButton bookId={bookId} key="move-1" />
        <MoveCardToDeckButton bookId={bookId} key="move-2" />
      </IonButtons>
    </IonToolbar>
  );
};

export default CardToolbar;
