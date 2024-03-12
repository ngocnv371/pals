import { useMemo, useRef } from "react";
import { useAppSelector } from "../../../store/hooks";
import { useClassSequence } from "../utils/useClassSequence";
import "./FusionVisualizer.css";
import { CardInfo } from "../../../components/Card/CardInfo";
import { calculateFusionAnimationSequence } from "../service";
import { Fusion } from "../model";

export const FusionVisualizer: React.FC<
  Fusion & {
    onCompleted?: () => void;
  }
> = ({ card1, card2, result, onCompleted }) => {
  const ref = useRef<HTMLDivElement>();
  const failed = !result;
  const sequences = useMemo(
    () => calculateFusionAnimationSequence({ card1, card2, result }),
    [card1, card2, result]
  );
  useClassSequence(ref, sequences, onCompleted);

  return (
    <div className="fusion-visualizer" ref={ref as any}>
      <CardInfo cardId={card1} />
      <CardInfo cardId={card2} />
      <CardInfo cardId={result} />
      <div className="effect spark-effect"></div>
    </div>
  );
};

export const FusionVisualizerContainer: React.FC = () => {
  const data = useAppSelector((state) => state.duel.fusion);

  if (!data) {
    return null;
  }

  const { card1, card2, result } = data;

  return <FusionVisualizer card1={card1} card2={card2} result={result} />;
};
