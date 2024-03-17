import React from "react";

import {
  selectTheirDeployed,
  selectMyDeployed,
  selectStage,
  selectTurn,
  selectTheirSupports,
  selectMySupports,
  selectIsMyTurn,
} from "../v2/selectors";
import { withFormationSelector } from "./withFormationSelector";
import "./Board.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { FormationLine } from "./FormationLine";
import { AttackingFormationLine } from "./AttackingFormationLine";
import { TargettingFormationLine } from "./TargettingFormationLine";
import { MyTargettingFormationLineContainer } from "./MyTargettingFormationLine";
import { Stage, Stance } from "../v2/model";
import { actions } from "../v2/slice";

const TheirDeployedFormation = withFormationSelector(
  FormationLine,
  selectTheirDeployed,
  "TheirDeployedFormation"
);
const MyDeployedFormation = withFormationSelector(
  FormationLine,
  selectMyDeployed,
  "MyDeployedFormation"
);
const MyAttackingDeployedFormation = withFormationSelector(
  AttackingFormationLine,
  selectMyDeployed,
  "MyAttackingDeployedFormation"
);
const TheirSupportsFormation = withFormationSelector(
  FormationLine,
  selectTheirSupports,
  "TheirSupportsFormation"
);
const MySupportsFormation = withFormationSelector(
  FormationLine,
  selectMySupports,
  "MySupportsFormation"
);
const TheirTargettingFormation = withFormationSelector(
  TargettingFormationLine,
  selectTheirDeployed,
  "TheirTargettingFormation"
);

export const Board: React.FC = () => {
  const stage = useAppSelector(selectStage);
  const turn = useAppSelector(selectTurn);
  const isMyTurn = useAppSelector(selectIsMyTurn);
  const disabledAttack = turn == 1;
  const dispatch = useAppDispatch();

  return (
    <div className="board-container">
      <div className={`board ${stage}`}>
        <div className="row their-row">
          <TheirSupportsFormation />
        </div>
        <div className="row their-row">
          <TheirDeployedFormation />
        </div>
        <div className="row empty"></div>
        <div className="row">
          {stage == Stage.Battle && isMyTurn ? (
            <MyAttackingDeployedFormation
              onStanceChanged={(index, stance) => {
                if (stance == Stance.Defensive) {
                  dispatch(actions.switchUnitToDefensive({ index }));
                } else {
                  dispatch(actions.selectUnitForBattle({ index }));
                }
              }}
              disabledAttack={disabledAttack}
            />
          ) : stage == Stage.PresentingTargets && !isMyTurn ? (
            <MyTargettingFormationLineContainer />
          ) : (
            <MyDeployedFormation
              canSelect={stage == Stage.PresentingDeploymentFormation}
              onSelect={(index) => {
                dispatch(actions.selectTargetDeploymentPosition({ index }));
                // dispatch(myFuseAndPlace());
              }}
            />
          )}
        </div>
        <div className="row">
          <MySupportsFormation />
        </div>
      </div>
    </div>
  );
};
