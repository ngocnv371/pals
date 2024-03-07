import { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import "./BattleVisualizer.css";
import { useClassSequence } from "../utils/useClassSequence";
import { simulateBattle } from "../service";
import { CardStance } from "../model";
import { CardInfo } from "../../../components/Card/CardInfo";
import SlashEffect from "../Effects/SlashEffect";

const winSequence = [
  { className: "battle-visualizer--intro", duration: 1000 },
  { className: "battle-visualizer--damage2", duration: 1000 },
  { className: "battle-visualizer--dead2", duration: 1000 },
  { className: "battle-visualizer--end", duration: 10 },
];
const looseSequence = [
  { className: "battle-visualizer--intro", duration: 1000 },
  { className: "battle-visualizer--damage1", duration: 1000 },
  { className: "battle-visualizer--dead1", duration: 1000 },
  { className: "battle-visualizer--end", duration: 10 },
];
const tieSequence = [
  { className: "battle-visualizer--intro", duration: 1000 },
  { className: "battle-visualizer--damage-both", duration: 1000 },
  { className: "battle-visualizer--dead-both", duration: 1000 },
  { className: "battle-visualizer--end", duration: 10 },
];

const defensiveWinSequence = [
  { className: "battle-visualizer--intro", duration: 1000 },
  { className: "battle-visualizer--damage2", duration: 1000 },
  { className: "battle-visualizer--end", duration: 10 },
];
const defensiveLooseSequence = [
  { className: "battle-visualizer--intro", duration: 1000 },
  { className: "battle-visualizer--damage1", duration: 1000 },
  { className: "battle-visualizer--end", duration: 10 },
];
const defensiveTieSequence = [
  { className: "battle-visualizer--intro", duration: 1000 },
  { className: "battle-visualizer--damage-both", duration: 1000 },
  { className: "battle-visualizer--end", duration: 10 },
];

function getSequence(result: number, defensive: boolean) {
  const win = result > 0;
  const tie = result == 0;

  const sequence = tie ? tieSequence : win ? winSequence : looseSequence;
  const defensiveSequence = tie
    ? defensiveTieSequence
    : win
    ? defensiveWinSequence
    : defensiveLooseSequence;
  return defensive ? defensiveSequence : sequence;
}

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
  const defensive = card2Stance == CardStance.Defensive;
  const sequence = useMemo(
    () => getSequence(result, defensive),
    [result, defensive]
  );

  useClassSequence(ref, sequence);
  const [showEffect, setShowEffect] = useState(false);
  // schedule effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEffect(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`battle-visualizer ${defensive ? "defensive" : ""}`}
      ref={ref as any}
    >
      <CardInfo cardId={card1} />
      <CardInfo cardId={card2} />
      {showEffect && (
        <div className="effect">
          <SlashEffect />
        </div>
      )}
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
