import { IonBadge } from "@ionic/react";
import React from "react";
import { CardInfo } from "./CardInfo";

export const HandCard: React.FC<{
  cardId: string;
  selected?: boolean;
  index?: number;
  onClick?: () => void;
}> = ({ cardId, selected, index, onClick }) => {
  return (
    <div
      className={`card hand-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {selected && <IonBadge>{index}</IonBadge>}
      <CardInfo cardId={cardId} />
    </div>
  );
};
