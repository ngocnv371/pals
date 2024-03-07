import { useEffect, useMemo, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import "./BattleVisualizer.css";
import { useClassSequence } from "../utils/useClassSequence";
import { calculateBattleAnimationSequence, simulateBattle } from "../service";
import { CardStance } from "../model";
import { CardInfo } from "../../../components/Card/CardInfo";
import SlashEffect from "../Effects/SlashEffect";

export const _BattleVisualizer: React.FC<{
  card1: string;
  card2: string;
  card2Stance: CardStance;
}> = ({ card1, card2, card2Stance }) => {
  const ref = useRef<HTMLDivElement>();
  const result = useMemo(
    () => simulateBattle(card1, card2, card2Stance),
    [card1, card2, card2Stance]
  );
  console.debug("visualize", card1, card2, card2Stance);
  const defensive = card2Stance == CardStance.Defensive;
  const sequence = useMemo(
    () => calculateBattleAnimationSequence(result, defensive),
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
