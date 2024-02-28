import { IonIcon, IonFabButton } from "@ionic/react";
import React from "react";
import { chevronForward } from "ionicons/icons";

export const PlaceCardsButton: React.FC = () => {
  return (
    <IonFabButton>
      <IonIcon icon={chevronForward} />
    </IonFabButton>
  );
};
