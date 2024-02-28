import React from "react";
import { CardStance, Formation } from "../../store/duelSlice";
import { Cell } from "./Cell";
import { Card } from "./Card";

export const FormationLine: React.FC<{ formation: Formation }> = ({
  formation,
}) => {
  return formation.map((d, idx) => (
    <Cell key={idx}>
      {d && (
        <Card cardId={d.cardId} defensive={d.stance == CardStance.Defensive} />
      )}
    </Cell>
  ));
};
