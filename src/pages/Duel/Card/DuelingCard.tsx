import React from "react";
import { CardInfo } from "../../../components/Card/CardInfo";
import "./DuelingCard.css";

export const DuelingCard: React.FC<
  {
    cardId: string;
    defensive?: boolean;
  } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ cardId, defensive, className, ...rest }) => {
  return (
    <div
      className={`dueling-card ${className} ${defensive ? "defensive" : ""}`}
      {...rest}
    >
      <CardInfo cardId={cardId} />
    </div>
  );
};
