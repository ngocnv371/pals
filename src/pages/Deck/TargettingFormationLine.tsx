import React from "react";
import { CardStance, Formation } from "../../store/duelSlice";
import { Cell } from "./Cell";
import { Card } from "./Card";
import TargetSign from "./TargetSign";

export interface TargettingFormationLineProps {
  formation: Formation;
  onSelected?: (index: number) => void;
}

export const TargettingFormationLine: React.FC<
  TargettingFormationLineProps
> = ({ formation, onSelected }) => {
  return formation.map((d, idx) => (
    <Cell key={idx}>
      {d && (
        <Card cardId={d.cardId} defensive={d.stance == CardStance.Defensive} />
      )}
      {d && <TargetSign onClick={() => onSelected && onSelected(idx)} />}
    </Cell>
  ));
};
