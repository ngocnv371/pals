import React from "react";
import { CardStance, Formation } from "./model";
import { Cell } from "./Cell";
import { Card } from "./Card";
import Spot from "./Spot";

export interface FormationLineProps {
  formation: Formation;
  canSelect?: boolean;
  onSelect?: (index: number) => void;
  onCardClick?: (id: string) => void;
}

export const FormationLine: React.FC<FormationLineProps> = ({
  formation,
  canSelect,
  onSelect,
  onCardClick,
}) => {
  function handleClick(idx: number) {
    if (!canSelect) {
      return;
    }

    onSelect && onSelect(idx);
  }

  return formation.map((d, idx) => (
    <Cell key={idx} onClick={() => handleClick(idx)}>
      {d && (
        <Card
          cardId={d.cardId}
          defensive={d.stance == CardStance.Defensive}
          onClick={() => onCardClick && onCardClick(d.cardId)}
        />
      )}
      {canSelect && <Spot />}
    </Cell>
  ));
};
