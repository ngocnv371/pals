import { IonBadge } from "@ionic/react";
import React from "react";
import { CardInfo } from "../../../components/Card/CardInfo";
import "./HandCard.css";

export const HandCard: React.FC<{
  cardId: string;
  selected?: boolean;
  hidden?: boolean;
  index?: number;
  onClick?: () => void;
  className?: string;
}> = ({ cardId, selected, index, onClick, className, hidden }) => {
  return (
    <div
      className={`dueling-card hand-card ${className} ${
        selected ? "selected" : ""
      } ${hidden ? "hidden" : ""}`}
      onClick={onClick}
    >
      {selected && <IonBadge>{index}</IonBadge>}
      <CardInfo cardId={cardId} />
    </div>
  );
};