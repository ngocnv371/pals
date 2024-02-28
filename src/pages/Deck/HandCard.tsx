import { IonCard, IonImg, IonBadge } from "@ionic/react";
import React, { useMemo } from "react";
import { getPalMetadataById } from "../../data/palMetadata";

export const HandCard: React.FC<{
  cardId: string;
  selected?: boolean;
  index?: number;
  onClick?: () => void;
}> = ({ cardId, selected, index, onClick }) => {
  const card = useMemo(() => getPalMetadataById(cardId), [cardId]);

  if (!card) {
    return null;
  }

  return (
    <div
      className={`card hand-card ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      {selected && <IonBadge>{index}</IonBadge>}
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
