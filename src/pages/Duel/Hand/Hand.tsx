import React, { useCallback, useMemo, useState } from "react";
import { HandCard } from "./HandCard";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import "./Hand.css";
import { myReservesSelected } from "../store/duelSlice";
import {
  selectMyHand,
  selectSelectedReservesIndices,
} from "../store/selectors";
import { getPalById } from "../../pals/service";

export const Hand: React.FC = () => {
  const hand = useAppSelector(selectMyHand);
  const dispatch = useAppDispatch();
  const cards = useMemo(() => hand.map(getPalById), [hand]);
  const selectedCards = useAppSelector(selectSelectedReservesIndices) || [];
  const setSelectedCards = (ids: number[]) => dispatch(myReservesSelected(ids));

  const handleSelectCard = useCallback(
    (index: number) => {
      if (selectedCards.includes(index)) {
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
        const idx = selectedCards.indexOf(cidx);
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
