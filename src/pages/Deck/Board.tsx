import React from "react";
import { Row } from "./Row";
import { EmptyRow } from "./EmptyRow";
import {
  selectTheirDeployed,
  selectMyDeployed,
  selectTheirSupports,
  selectMySupports,
} from "../../store/duelSlice";
import { withFormationSelector } from "./withFormationSelector";

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
          <MyDeployedFormation />
        </Row>
        <Row>
          <MySupportsFormation />
        </Row>
      </div>
    </div>
  );
};
