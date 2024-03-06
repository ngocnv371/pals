import React from "react";
import { CardStance, Formation } from "../model";
import { DuelingCard } from "../Card/DuelingCard";
import TargetSign from "../stages/attacking/TargetSign";

export interface TargettingFormationLineProps {
  formation: Formation;
  onSelected?: (index: number) => void;
}

export const TargettingFormationLine: React.FC<
  TargettingFormationLineProps
> = ({ formation, onSelected }) => {
  return formation.map((d, idx) => (
    <div className="cell" key={idx}>
      {d && (
        <DuelingCard
          cardId={d.cardId}
          defensive={d.stance == CardStance.Defensive}
        />
      )}
      {d && <TargetSign onClick={() => onSelected && onSelected(idx)} />}
    </div>
  ));
};