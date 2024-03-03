import { useMemo, useRef } from "react";
import {
  CardStance,
  selectMyAttack,
  simulateBattle,
} from "../../store/duelSlice";
import { useAppSelector } from "../../store/hooks";
import "./BattleVisualizer.css";
import { Card } from "./Card";
import { useClassSequence } from "./useClassSequence";

export const BattleVisualizer: React.FC<{ card1: string; card2: string }> = ({
  card1,
  card2,
}) => {
  const ref = useRef<HTMLDivElement>();
  const result = useMemo(
    () => simulateBattle(card1, card2, CardStance.Offensive),
    [card1, card2]
  );
  const winSequence = [
    { className: "presenting", duration: 1000 },
    { className: "damage2", duration: 1000 },
    { className: "dead2", duration: 1000 },
  ];
  const looseSequence = [
    { className: "presenting", duration: 1000 },
    { className: "damage1", duration: 1000 },
    { className: "dead1", duration: 1000 },
  ];
  const tieSequence = [
    { className: "presenting", duration: 1000 },
    { className: "damage1", duration: 1000 },
    { className: "damage2", duration: 1000 },
    { className: "dead1", duration: 1000 },
    { className: "dead2", duration: 1000 },
  ];
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

export const MyBattleVisualizer: React.FC = () => {
  const data = useAppSelector(selectMyAttack);
  if (!data) {
    return null;
  }

  const [card1, card2] = data;
  return <BattleVisualizer card1={card1} card2={card2} />;
};
