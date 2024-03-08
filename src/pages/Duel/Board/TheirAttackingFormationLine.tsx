import React from "react";
import { CardStance, Formation } from "../model";
import { DuelingCard } from "../Card/DuelingCard";
import StanceSwitcher from "../stages/attacking/StanceSwitcher";
import { useAppSelector } from "../../../store/hooks";
import { selectTheirDeployed } from "../store/selectors";

export interface AttackingFormationLineProps {
  formation: Formation;
  consideredIndex?: number;
}

export const TheirAttackingFormationLine: React.FC<
  AttackingFormationLineProps
> = ({ formation, consideredIndex }) => {
  return formation.map((d, idx) => (
    <div className="cell" key={idx}>
      {d && (
        <DuelingCard
          cardId={d.cardId}
          defensive={d.stance == CardStance.Defensive}
        />
      )}
      {consideredIndex == idx && <StanceSwitcher />}
    </div>
  ));
};

export const TheirAttackingFormationLineContainer: React.FC = () => {
  const formation = useAppSelector(selectTheirDeployed);
  const consideredIndex = useAppSelector(
    (state) => state.duel.their.offensivePlan?.unitIndex
  );

  return (
    <TheirAttackingFormationLine
      formation={formation}
      consideredIndex={consideredIndex}
    />
  );
};
