import { IonCard, IonImg } from "@ionic/react";
import React, { useMemo } from "react";
import "./CardInfo.css";
import { getPalById } from "../../pages/pals/service";

export const CardInfo: React.FC<{
  cardId: string;
  defensive?: boolean;
  hidden?: boolean;
}> = ({ cardId, defensive, hidden }) => {
  const card = useMemo(() => getPalById(cardId), [cardId]);

  if (!card) {
    return null;
  }

  if (hidden) {
    return (
      <IonCard className={`card-info ${defensive ? "defensive" : ""}`}>
        <IonImg src={`/icons/question-mark-80.png`}></IonImg>
      </IonCard>
    );
  }

  const longTitle = card.name.length > 10;

  return (
    <IonCard className={`card-info ${defensive ? "defensive" : ""}`}>
      <IonImg src={`/pals/${card.image}`}></IonImg>
      <p className={`title ${longTitle ? "long" : ""}`}>{card.name}</p>
      <p className="power">
        <span className="atk">{card.attack}</span>/
        <span className="def">{card.defense}</span>
      </p>
    </IonCard>
  );
};
