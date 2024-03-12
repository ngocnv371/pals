import { IonToolbar, IonButtons } from "@ionic/react";
import MoveCardToDeckButton from "./MoveCardToDeckButton";
import MoveCardToBookButton from "./MoveCardToBookButton";

const CardToolbar: React.FC<{ cardId: string }> = ({ cardId }) => {
  return (
    <IonToolbar>
      <IonButtons slot="end">
        <MoveCardToBookButton cardId={cardId} key="move-1" />
        <MoveCardToDeckButton cardId={cardId} key="move-2" />
      </IonButtons>
    </IonToolbar>
  );
};

export default CardToolbar;
