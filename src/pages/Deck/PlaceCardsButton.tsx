import { IonIcon, IonFabButton } from "@ionic/react";
import React from "react";
import { chevronForward } from "ionicons/icons";
import { useAppDispatch } from "../../store/hooks";
import { myHandCardsSelected } from "../../store/duelSlice";

export const PlaceCardsButton: React.FC<{ cardIds: string[] }> = ({
  cardIds,
}) => {
  const dispatch = useAppDispatch();
  function handleClick() {
    dispatch(myHandCardsSelected(cardIds));
  }

  return (
    <IonFabButton onClick={handleClick}>
      <IonIcon icon={chevronForward} />
    </IonFabButton>
  );
};
