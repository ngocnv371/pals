import React from "react";
import { CardInfo } from "./CardInfo";

export const Card: React.FC<{ cardId: string; defensive?: boolean }> = ({
  cardId,
  defensive,
}) => {
  return (
    <div className={`card ${defensive ? "defensive" : ""}`}>
      <CardInfo cardId={cardId} />
    </div>
  );
};
