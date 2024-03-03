import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CardFusion from "./CardFusion";

const FusionVisualizer: React.FC = () => {
  const data = useAppSelector((state) => state.duel.fusion);
  const dispatch = useAppDispatch();

  if (!data) {
    return null;
  }

  const { card1, card2, result } = data;

  return <CardFusion card1={card1} card2={card2} card3={result} />;
};

export default FusionVisualizer;
