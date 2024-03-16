import React from "react";
import { CardStance, Formation } from "../model";
import { DuelingCard } from "../Card/DuelingCard";
import StanceSwitcher from "../stages/attacking/StanceSwitcher";

export interface AttackingFormationLineProps {
  formation: Formation;
  onStanceChanged?: (index: number, stance: CardStance) => void;
  onCardClick?: (id: string) => void;
  disabledAttack?: boolean;
}

export const AttackingFormationLine: React.FC<AttackingFormationLineProps> = ({
  formation,
  disabledAttack,
  onStanceChanged,
  onCardClick,
}) => {
  return formation.map((d, idx) => (
    <div className="cell" key={idx}>
      {d && (
        <DuelingCard
          cardId={d.cardId}
          defensive={d.stance == CardStance.Defensive}
          onClick={() => onCardClick && onCardClick(d.cardId)}
        />
      )}
      {d && !d.acted && (
        <StanceSwitcher
          onClick={(stance) => onStanceChanged && onStanceChanged(idx, stance)}
          disabledDefense={d.stance == CardStance.Defensive}
          disabledAttack={disabledAttack}
        />
      )}
    </div>
  ));
};
