import React from "react";
import { Stance, Formation } from "../v2/model";
import { DuelingCard } from "../Card/DuelingCard";
import StanceSwitcher from "../stages/attacking/StanceSwitcher";

export interface AttackingFormationLineProps {
  formation: Formation;
  onStanceChanged?: (index: number, stance: Stance) => void;
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
          defensive={d.stance == Stance.Defensive}
          onClick={() => onCardClick && onCardClick(d.cardId)}
        />
      )}
      {d && !d.acted && (
        <StanceSwitcher
          onClick={(stance) => onStanceChanged && onStanceChanged(idx, stance)}
          disabledDefense={d.stance == Stance.Defensive}
          disabledAttack={disabledAttack}
        />
      )}
    </div>
  ));
};
