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
} from "../../store/duelSlice";
import { withFormationSelector } from "./withFormationSelector";
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
          <MyDeployedFormation
            canSelect={stage == DuelStage.MyPlacing}
            onSelect={(idx) => {
              dispatch(mySpotSelected(idx));
              dispatch(myFuseAndPlace());
            }}
          />
        </Row>
        <Row>
          <MySupportsFormation />
        </Row>
      </div>
    </div>
  );
};
