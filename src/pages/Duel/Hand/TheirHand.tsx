import React, { useMemo } from "react";
import { HandCard } from "./HandCard";
import { useAppSelector } from "../../../store/hooks";
import "./Hand.css";
import { selectTheirHand } from "../store/selectors";
import { getPalById } from "../../pals/service";

export const TheirHand: React.FC = () => {
  const hand = useAppSelector(selectTheirHand);
  const cards = useMemo(() => hand.map(getPalById), [hand]);
  const selectedCards =
    useAppSelector(
      (state) => state.duel.their.deploymentPlan?.selectedReservesIndices
    ) || [];

  return (
    <div className="their-hand hand">
      {cards.map((c, cidx) => {
        const idx = selectedCards.indexOf(cidx);
        const selected = idx >= 0;
        const index = selected ? idx + 1 : undefined;
        return (
          <HandCard
            key={cidx}
            cardId={c.id}
            selected={selected}
            index={index}
            hidden
            className={`animate__animated animate__slideInRight6 animate__faster animate__delay-${cidx}`}
          />
        );
      })}
    </div>
  );
};
