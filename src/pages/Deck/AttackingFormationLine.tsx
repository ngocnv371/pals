import React from "react";
import { CardStance, Formation } from "../../store/duelSlice";
import { Cell } from "./Cell";
import { Card } from "./Card";
import StanceSwitcher from "./StanceSwitcher";

export interface AttackingFormationLineProps {
  formation: Formation;
  onStanceChanged?: (index: number, stance: CardStance) => void;
  onCardClick?: (id: string) => void;
}

export const AttackingFormationLine: React.FC<AttackingFormationLineProps> = ({
  formation,
  onStanceChanged,
  onCardClick,
}) => {
  return formation.map((d, idx) => (
    <Cell key={idx}>
      {d && (
        <Card
          cardId={d.cardId}
          defensive={d.stance == CardStance.Defensive}
          onClick={() => onCardClick && onCardClick(d.cardId)}
        />
      )}
      {d && !d.attacked && (
        <StanceSwitcher
          onClick={(stance) => onStanceChanged && onStanceChanged(idx, stance)}
        />
      )}
    </Cell>
  ));
};
