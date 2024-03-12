import { IonCard, IonImg } from "@ionic/react";
import React, { useMemo } from "react";
import { getPalMetadataById } from "../../data/palMetadata";
import "./CardInfo.css";

export const CardInfo: React.FC<{
  cardId: string;
  defensive?: boolean;
  hidden?: boolean;
}> = ({ cardId, defensive, hidden }) => {
  const card = useMemo(() => getPalMetadataById(cardId), [cardId]);

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

  const longTitle = card.title.length > 10;

  return (
    <IonCard className={`card-info ${defensive ? "defensive" : ""}`}>
      <IonImg src={`/pals/${card.image}`}></IonImg>
      <p className={`title ${longTitle ? "long" : ""}`}>{card.title}</p>
      <p className="power">
        <span className="atk">{card.attack}</span>/
        <span className="def">{card.defense}</span>
      </p>
    </IonCard>
  );
};
