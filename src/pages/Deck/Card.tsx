import { IonCard, IonImg } from "@ionic/react";
import React, { useMemo } from "react";
import { getPalMetadataById } from "../../data/palMetadata";

export const Card: React.FC<{ cardId: string; defensive?: boolean }> = ({
  cardId,
  defensive,
}) => {
  const card = useMemo(() => getPalMetadataById(cardId), [cardId]);

  if (!card) {
    return null;
  }

  return (
    <div className={`card ${defensive ? "defensive" : ""}`}>
      <IonCard>
        <IonImg src={`/pals/${card.content.image}`}></IonImg>
        <p>
          <span className="atk">{card.content.baseAttack}</span>/
          <span className="def">{card.content.defense}</span>
        </p>
      </IonCard>
    </div>
  );
};
