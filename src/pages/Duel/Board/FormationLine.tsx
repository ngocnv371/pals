import React from "react";
import { Stance, Formation } from "../v2/model";
import { DuelingCard } from "../Card/DuelingCard";
import Spot from "../stages/placing/Spot";

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
    <div className="cell" key={idx} onClick={() => handleClick(idx)}>
      {d && (
        <DuelingCard
          cardId={d.cardId}
          defensive={d.stance == Stance.Defensive}
          onClick={() => onCardClick && onCardClick(d.cardId)}
        />
      )}
      {canSelect && <Spot />}
    </div>
  ));
};
