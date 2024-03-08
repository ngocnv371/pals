import React from "react";
import { CardStance, Formation } from "../model";
import { DuelingCard } from "../Card/DuelingCard";
import TargetSign from "../stages/attacking/TargetSign";

export interface TargettingFormationLineProps {
  formation: Formation;
  considerIndex?: number;
  onSelected?: (index: number) => void;
}

export const TargettingFormationLine: React.FC<
  TargettingFormationLineProps
> = ({ formation, considerIndex, onSelected }) => {
  const directAttackAvailable = !formation.some(Boolean);

  return formation.map((d, idx) => (
    <div className="cell" key={idx}>
      {d && (
        <DuelingCard
          cardId={d.cardId}
          defensive={d.stance == CardStance.Defensive}
        />
      )}
      {d && <TargetSign onClick={() => onSelected && onSelected(idx)} />}
      {directAttackAvailable && idx == 0 && (
        <TargetSign onClick={() => onSelected && onSelected(-1)} />
      )}
      {idx == considerIndex && <TargetSign />}
    </div>
  ));
};
