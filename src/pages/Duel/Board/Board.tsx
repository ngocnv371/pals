import React from "react";
import {
  myStanceChangedToDefensive,
  myOffensiveCardSelected,
  myTargetCardSelected,
  myDeploymentTargetSelected,
} from "../store/duelSlice";
import {
  selectTheirDeployed,
  selectMyDeployed,
  selectTheirSupports,
  selectMySupports,
  selectStage,
} from "../store/selectors";
import { myFuseAndPlace, myBattle } from "../store/thunk-actions";
import { withFormationSelector } from "./withFormationSelector";
import "./Board.css";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { FormationLine } from "./FormationLine";
import { AttackingFormationLine } from "./AttackingFormationLine";
import { TargettingFormationLine } from "./TargettingFormationLine";
import { CardStance, DuelStage } from "../model";
import { MyTargettingFormationLineContainer } from "./MyTargettingFormationLine";

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
  const dispatch = useAppDispatch();

  return (
    <div className="board-container">
      <div className={`board ${stage}`}>
        <div className="row their-row">
          <TheirSupportsFormation />
        </div>
        <div className="row their-row">
          {stage == DuelStage.MyTargetting ? (
            <TheirTargettingFormation
              onSelected={(index) => {
                dispatch(myTargetCardSelected({ index }));
                dispatch(myBattle());
              }}
            />
          ) : (
            <TheirDeployedFormation />
          )}
        </div>
        <div className="row empty"></div>
        <div className="row">
          {stage == DuelStage.MyAttack ? (
            <MyAttackingDeployedFormation
              onStanceChanged={(index, stance) => {
                if (stance == CardStance.Defensive) {
                  dispatch(myStanceChangedToDefensive({ index }));
                } else {
                  dispatch(myOffensiveCardSelected({ index }));
                }
              }}
            />
          ) : stage == DuelStage.TheirTargetting ? (
            <MyTargettingFormationLineContainer />
          ) : (
            <MyDeployedFormation
              canSelect={stage == DuelStage.MyPlacing}
              onSelect={(idx) => {
                dispatch(myDeploymentTargetSelected(idx));
                dispatch(myFuseAndPlace());
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
