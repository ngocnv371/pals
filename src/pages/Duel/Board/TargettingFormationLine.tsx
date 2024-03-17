import React from "react";
import { Stance, Formation } from "../v2/model";
import { DuelingCard } from "../Card/DuelingCard";
import TargetSign from "../stages/attacking/TargetSign";

export interface TargettingFormationLineProps {
  formation: Formation;
  onSelected?: (index: number) => void;
}

export const TargettingFormationLine: React.FC<
  TargettingFormationLineProps
> = ({ formation, onSelected }) => {
  const directAttackAvailable = !formation.some(Boolean);

  return formation.map((d, idx) => (
    <div className="cell" key={idx}>
      {d && (
        <DuelingCard
          cardId={d.cardId}
          defensive={d.stance == Stance.Defensive}
        />
      )}
      {d && <TargetSign onClick={() => onSelected && onSelected(idx)} />}
      {directAttackAvailable && idx == 0 && (
        <TargetSign onClick={() => onSelected && onSelected(-1)} />
      )}
    </div>
  ));
};
