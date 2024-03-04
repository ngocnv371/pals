import { useRef } from "react";
import { Card } from "../Card/Card";
import "./CardFusion.css";
import { useClassSequence } from "../utils/useClassSequence";

const segments = [
  { className: "presentingBoth", duration: 1000 },
  { className: "playing", duration: 2000 },
  { className: "presentingResult", duration: 1000 },
  { className: "gone", duration: 10 },
];

const CardFusion: React.FC<{
  card1: string;
  card2: string;
  card3: string;
  onCompleted?: () => void;
}> = ({ card1, card2, card3, onCompleted }) => {
  const ref = useRef<HTMLDivElement>();
  useClassSequence(ref, segments, onCompleted);

  return (
    <div className="card-fusion" ref={ref as any}>
      <Card cardId={card1} />
      <Card cardId={card2} />
      <Card cardId={card3} />
    </div>
  );
};

export default CardFusion;