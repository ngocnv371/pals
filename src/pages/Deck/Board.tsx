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
} from "../../store/duelSlice";
import { withFormationSelector } from "./withFormationSelector";
import "./Board.css";
import { useAppSelector } from "../../store/hooks";

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

  return (
    <div className="board-container">
      <div className="board rest">
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
            onSelect={() => {
              console.log("sel");
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
