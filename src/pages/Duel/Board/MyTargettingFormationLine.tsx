import React from "react";
import { CardStance, Formation } from "../model";
import { DuelingCard } from "../Card/DuelingCard";
import TargetSign from "../stages/attacking/TargetSign";
import { useAppSelector } from "../../../store/hooks";
import { selectMyDeployed } from "../store/selectors";

export interface TargettingFormationLineProps {
  formation: Formation;
  considerIndex?: number;
}

export const MyTargettingFormationLine: React.FC<
  TargettingFormationLineProps
> = ({ formation, considerIndex }) => {
  return formation.map((d, idx) => (
    <div className="cell" key={idx}>
      {d && (
        <DuelingCard
          cardId={d.cardId}
          defensive={d.stance == CardStance.Defensive}
        />
      )}
      {idx == considerIndex && <TargetSign />}
    </div>
  ));
};

export const MyTargettingFormationLineContainer: React.FC = () => {
  const formation = useAppSelector(selectMyDeployed);
  const index = useAppSelector((state) => state.duel.consideredTargetIndex);

  return (
    <MyTargettingFormationLine formation={formation} considerIndex={index} />
  );
};
