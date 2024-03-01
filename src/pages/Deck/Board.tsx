import React from "react";
import { Row } from "./Row";
import { EmptyRow } from "./EmptyRow";
import {
  selectTheirDeployed,
  selectMyDeployed,
  selectTheirSupports,
  selectMySupports,
  selectStage,
  DuelStage,
  mySpotSelected,
  myFuseAndPlace,
  CardStance,
  myStanceChangedToDefensive,
} from "../../store/duelSlice";
import {
  withAttackingFormationSelector,
  withFormationSelector,
} from "./withFormationSelector";
import "./Board.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const TheirDeployedFormation = withFormationSelector(
  selectTheirDeployed,
  "TheirDeployedFormation"
);
const MyDeployedFormation = withFormationSelector(
  selectMyDeployed,
  "MyDeployedFormation"
);
const MyAttackingDeployedFormation = withAttackingFormationSelector(
  selectMyDeployed,
  "MyAttackingDeployedFormation"
);
const TheirSupportsFormation = withFormationSelector(
  selectTheirSupports,
  "TheirSupportsFormation"
);
const MySupportsFormation = withFormationSelector(
  selectMySupports,
  "MySupportsFormation"
);

export const Board: React.FC = () => {
  const stage = useAppSelector(selectStage);
  const dispatch = useAppDispatch();

  return (
    <div className="board-container">
      <div className={`board ${stage}`}>
        <Row>
          <TheirSupportsFormation />
        </Row>
        <Row>
          <TheirDeployedFormation />
        </Row>
        <EmptyRow></EmptyRow>
        <Row>
          {stage == DuelStage.MyAttack ? (
            <MyAttackingDeployedFormation
              showStance
              onStanceChanged={(idx, stance) => {
                if (stance == CardStance.Defensive) {
                  dispatch(myStanceChangedToDefensive({ index: idx }));
                }
              }}
            />
          ) : (
            <MyDeployedFormation
              canSelect={stage == DuelStage.MyPlacing}
              onSelect={(idx) => {
                dispatch(mySpotSelected(idx));
                dispatch(myFuseAndPlace());
              }}
            />
          )}
        </Row>
        <Row>
          <MySupportsFormation />
        </Row>
      </div>
    </div>
  );
};
