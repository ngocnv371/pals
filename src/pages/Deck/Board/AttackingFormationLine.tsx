import React from "react";
import { CardStance, Formation } from "../model";
import { Card } from "../Card/Card";
import StanceSwitcher from "../stages/attacking/StanceSwitcher";

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
    <div className="cell" key={idx}>
      {d && (
        <Card
          cardId={d.cardId}
          defensive={d.stance == CardStance.Defensive}
          onClick={() => onCardClick && onCardClick(d.cardId)}
        />
      )}
      {d && !d.acted && (
        <StanceSwitcher
          onClick={(stance) => onStanceChanged && onStanceChanged(idx, stance)}
        />
      )}
    </div>
  ));
};
