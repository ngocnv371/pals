import React from "react";
import { CardStance, Formation } from "../../store/duelSlice";
import { Cell } from "./Cell";
import { Card } from "./Card";
import StanceSwitcher from "./StanceSwitcher";

export interface AttackingFormationLineProps {
  formation: Formation;
  showStance?: boolean;
  onStanceChanged?: (index: number, stance: CardStance) => void;
  onCardClick?: (id: string) => void;
}

export const AttackingFormationLine: React.FC<AttackingFormationLineProps> = ({
  formation,
  showStance,
  onStanceChanged,
  onCardClick,
}) => {
  function handleClick(idx: number, stance: CardStance) {
    if (!showStance) {
      return;
    }

    onStanceChanged && onStanceChanged(idx, stance);
  }

  return formation.map((d, idx) => (
    <Cell key={idx}>
      {d && (
        <Card
          cardId={d.cardId}
          defensive={d.stance == CardStance.Defensive}
          onClick={() => onCardClick && onCardClick(d.cardId)}
        />
      )}
      {showStance && d && (
        <StanceSwitcher onClick={(stance) => handleClick(idx, stance)} />
      )}
    </Cell>
  ));
};
