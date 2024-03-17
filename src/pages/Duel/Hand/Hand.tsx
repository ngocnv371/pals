import React, { useCallback, useMemo, useState } from "react";
import { HandCard } from "./HandCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./Hand.css";
import { getPalById } from "../../pals/service";
import { selectMyHand, selectMyHandSelectedIndices } from "../v2/selectors";
import { selectCardsForDeployment } from "../v2/actions";

export const Hand: React.FC = () => {
  const hand = useAppSelector(selectMyHand);
  const dispatch = useAppDispatch();
  const cards = useMemo(() => hand.map(getPalById), [hand]);
  const selectedCards = useAppSelector(selectMyHandSelectedIndices);
  const setSelectedCards = (indices: number[]) =>
    dispatch(selectCardsForDeployment(indices));

  const handleSelectCard = useCallback(
    (index: number) => {
      if (!selectedCards) {
        setSelectedCards([index]);
      } else if (selectedCards.includes(index)) {
        // unselect
        setSelectedCards(selectedCards.filter((i) => i != index));
      } else {
        // add select
        setSelectedCards(selectedCards.concat(index));
      }
    },
    [selectedCards]
  );

  return (
    <div className="hand">
      {cards.map((c, cidx) => {
        const idx = !selectedCards ? -1 : selectedCards.indexOf(cidx);
        const selected = idx >= 0;
        const index = selected ? idx + 1 : undefined;
        return (
          <HandCard
            key={cidx}
            cardId={c.id}
            selected={selected}
            index={index}
            onClick={() => handleSelectCard(cidx)}
            className={`animate__animated animate__slideInRight6 animate__faster animate__delay-${cidx}`}
          />
        );
      })}
    </div>
  );
};
