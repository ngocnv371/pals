import { selectMyAttack } from "../../store/duelSlice";
import { useAppSelector } from "../../store/hooks";
import "./BattleVisualizer.css";
import { Card } from "./Card";

const BattleVisualizer: React.FC<{ card1: string; card2: string }> = ({
  card1,
  card2,
}) => {
  return (
    <div className="battle-visualizer">
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
