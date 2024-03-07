import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../store/hooks";
import { useClassSequence } from "../utils/useClassSequence";
import "./FusionVisualizer.css";
import { CardInfo } from "../../../components/Card/CardInfo";
import SparkEffect from "../Effects/SparkEffect";

const segments = [
  { className: "fusion-visualizer--intro", duration: 1000 },
  { className: "fusion-visualizer--fusing", duration: 2000 },
  { className: "fusion-visualizer--result", duration: 1000 },
  { className: "fusion-visualizer--done", duration: 10 },
];

const _FusionVisualizer: React.FC<{
  card1: string;
  card2: string;
  card3: string;
  onCompleted?: () => void;
}> = ({ card1, card2, card3, onCompleted }) => {
  const ref = useRef<HTMLDivElement>();
  useClassSequence(ref, segments, onCompleted);
  const [showEffect, setShowEffect] = useState(false);

  // schedule effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEffect(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fusion-visualizer" ref={ref as any}>
      <CardInfo cardId={card1} />
      <CardInfo cardId={card2} />
      <CardInfo cardId={card3} />
      {showEffect && (
        <div className="effect">
          <SparkEffect />
        </div>
      )}
    </div>
  );
};

const FusionVisualizer: React.FC = () => {
  const data = useAppSelector((state) => state.duel.fusion);

  if (!data) {
    return null;
  }

  const { card1, card2, result } = data;

  return <_FusionVisualizer card1={card1} card2={card2} card3={result} />;
};

export default FusionVisualizer;
