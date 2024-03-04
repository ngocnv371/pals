import { useMemo, useRef } from "react";
import { useAppSelector } from "../../../store/hooks";
import "./BattleVisualizer.css";
import { Card } from "../Card/Card";
import { useClassSequence } from "../utils/useClassSequence";
import { simulateBattle } from "../service";
import { CardStance } from "../model";

const winSequence = [
  { className: "battle-visualizer--intro", duration: 1000 },
  { className: "battle-visualizer--damage2", duration: 1000 },
  { className: "battle-visualizer--dead2", duration: 1000 },
];
const looseSequence = [
  { className: "battle-visualizer--intro", duration: 1000 },
  { className: "battle-visualizer--damage1", duration: 1000 },
  { className: "battle-visualizer--dead1", duration: 1000 },
];
const tieSequence = [
  { className: "battle-visualizer--intro", duration: 1000 },
  { className: "battle-visualizer--damage-both", duration: 1000 },
  { className: "battle-visualizer--dead-both", duration: 1000 },
];

const _BattleVisualizer: React.FC<{
  card1: string;
  card2: string;
  card2Stance: CardStance;
}> = ({ card1, card2, card2Stance }) => {
  const ref = useRef<HTMLDivElement>();
  const result = useMemo(
    () => simulateBattle(card1, card2, card2Stance),
    [card1, card2, card2Stance]
  );

  const sequence =
    result == 0 ? tieSequence : result > 0 ? winSequence : looseSequence;

  useClassSequence(ref, sequence);

  return (
    <div className="battle-visualizer" ref={ref as any}>
      <Card cardId={card1} />
      <Card cardId={card2} />
    </div>
  );
};

export const BattleVisualizer: React.FC = () => {
  const data = useAppSelector((state) => state.duel.battle);
  if (!data) {
    return null;
  }

  const { card1, card2, card2Stance } = data;
  return (
    <_BattleVisualizer card1={card1} card2={card2} card2Stance={card2Stance} />
  );
};
