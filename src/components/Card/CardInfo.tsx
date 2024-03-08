import { IonCard, IonImg } from "@ionic/react";
import React, { useMemo } from "react";
import { getPalMetadataById } from "../../data/palMetadata";
import "./CardInfo.css";

export const CardInfo: React.FC<{ cardId: string }> = ({ cardId }) => {
  const card = useMemo(() => getPalMetadataById(cardId), [cardId]);

  if (!card) {
    return null;
  }

  const longTitle = card.title.length > 10;

  return (
    <IonCard className="card-info">
      <IonImg src={`/pals/${card.content.image}`}></IonImg>
      <p className={`title ${longTitle ? "long" : ""}`}>{card.title}</p>
      <p className="power">
        <span className="atk">{card.content.baseAttack}</span>/
        <span className="def">{card.content.defense}</span>
      </p>
    </IonCard>
  );
};
