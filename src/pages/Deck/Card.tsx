import React from "react";
import { CardInfo } from "./CardInfo";

export const Card: React.FC<
  {
    cardId: string;
    defensive?: boolean;
  } & React.HtmlHTMLAttributes<HTMLDivElement>
> = ({ cardId, defensive, className, ...rest }) => {
  return (
    <div
      className={`card ${className} ${defensive ? "defensive" : ""}`}
      {...rest}
    >
      <CardInfo cardId={cardId} />
    </div>
  );
};
